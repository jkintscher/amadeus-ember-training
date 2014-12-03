App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  },
  redirect: function() {
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
          .then(function(record) {
            self.transitionTo('post', record);
          });
    }
  },

  model: function() {
    return {
      author: username,
      date: new Date(),
      comments: []
    };
  }
});

App.PostRoute = Ember.Route.extend({
  actions: {
    addComment: function () {
      var msg = prompt("Your comment:", "Hi");
      if (!Ember.isEmpty(msg)) {
        var post = this.modelFor('post'),
            comment = { visiter: username, comment: msg };
        post.get('comments').pushObject(comment);
        post.save();
      }
    },
    deleteComment: function (comment) {
      this.modelFor('post').get('comments').removeObject(comment);
      this.modelFor('post').save();
    }
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
