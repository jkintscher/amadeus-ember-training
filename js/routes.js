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
    if (this.get('model.length') >= 1) {
      this.transitionTo('post', this.get('model.firstObject'));
    }
  }
});

App.PostsNewRoute = Ember.Route.extend({
  actions: {
    addNewPost: function (title, excerpt, body) {
      var id = parseInt(this.modelFor('posts').sortBy('id').get('lastObject.id'), 10) + 1;
      var newPost = {
        id: id,
        title: title,
        author: username,
        date: new Date(),
        excerpt: excerpt,
        body: body,
        comments: []
      };
      var record = this.store.createRecord('post', newPost);
      record.save();
      this.transitionTo('post', record);
    }
  }
});

App.PostRoute = Ember.Route.extend({
  /*model: function (params) {
    return this.modelFor('posts').findBy('id', params.post_id);
  },*/
  actions: {
    updatePost: function (title, excerpt, body) {
      if(!Em.isEmpty(title))
        this.set('title', title);

      if(!Em.isEmpty(excerpt))
        this.set('excerpt', excerpt);

      if(!Em.isEmpty(body))
        this.set('body', body);

      var self = this;
      debugger;
      this.modelFor('post').save().then(function () {
        self.transitionTo('post', self.modelFor('post'));
      });
    },
    deletePost: function () {
      this.modelFor('post').deleteRecord();
      this.modelFor('post').save().then(function () {
        self.transitionToRoute('posts');
      });
    },
    addComment: function () {
      var comment = {visiter: username, comment: msg}; 
      this.modelFor('post').get('comments').pushObject(comment);
      this.modelFor('post').save();
    },
    deleteComment: function (comment) {
      this.modelFor('post').get('comments').removeObject(comment);
      this.modelFor('post').save();
    }
  }
});

App.PostEditRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('post');
  }
});

/*App.PostDeleteRoute = Ember.Route.extend({

});*/

/*App.PostCommentsRoute = Ember.Route.extend({

});

App.PostCommentsNewRoute = Ember.Route.extend({

});

App.PostCommentsDeleteRoute = Ember.Route.extend({

});*/
