App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  },
  redirect: function () {
    if (this.modelFor('posts').get('length') >= 1) {
      this.transitionTo('post', this.modelFor('posts').get('firstObject'));
    }
  }
});

App.PostsNewRoute = Ember.Route.extend({
  actions: {
    addNewPost: function () {
      var post = this.modelFor('posts.new');
      var self = this;
      this.store.createRecord('post', post)
              .save()
              .then(function (record) {
                self.transitionTo('post', record);
              });
    }
  },
  model: function () {
    return {
      author: username,
      date: new Date(),
      comments: []
    };
  }
});

App.PostEditRoute = Ember.Route.extend({
  actions: {
    updatePost: function () {
      var self = this;
      this.modelFor('post').save().then(function () {
        self.transitionTo('post', self.modelFor('post'));
      });
    },
    cancelEdit: function () {
      this.modelFor('post').rollback();
      this.transitionTo('post', this.modelFor('post'));
    }
  }
});

App.PostDeleteRoute = Ember.Route.extend({
  actions: {
    deletePost: function () {
      var self = this,
              post = this.modelFor('post');
      post.deleteRecord();
      post.save().then(function () {
        self.transitionTo('posts');
      });
    }
  }
});

App.CommentAddRoute = Ember.Route.extend({
  model: function () {
    var comment = {
      visiter: username,
      comment: ''
    };
    return comment;
  },
  actions: {
    addComment: function () {
      var route = this;
      var post = this.modelFor('post');
      post.get('comments').pushObject(this.modelFor('comment.add'));
      post.save().then(function () {
        route.transitionTo('post', post);
      });
    },
    cancelAdd: function () {
      this.transitionTo('post');
    }
  }
});

App.CommentDeleteRoute = Ember.Route.extend({
  actions: {
    deleteComment: function () {
      var route = this;
      // this.modelFor('post') not work !!! post id undefined
      var post = this.modelFor('post.index');
      post.get('comments').removeObject(this.modelFor('comment.delete'));
      post.save().then(function () {
        route.transitionTo('post', post);
      });
    },
    cancelDelete: function () {
      var post = this.modelFor('post.index');
      this.transitionTo('post', post);
    }
  }
});
