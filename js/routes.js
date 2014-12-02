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
  actions: {
    updatePost: function (title, excerpt, body) {
      if (!Ember.isEmpty(title))
        this.set('title', title);

      if (!Ember.isEmpty(excerpt))
        this.set('excerpt', excerpt);

      if (!Ember.isEmpty(body))
        this.set('body', body);

      var self = this;
      this.modelFor('post').save().then(function () {
        self.transitionTo('post', self.modelFor('post'));
      });
    },
    deletePost: function () {
      var self = this;
      post.deleteRecord();
      this.modelFor('posts').save().then(function () {
        self.transitionTo('posts');
      });
    }
  }
});

App.PostEditRoute = Ember.Route.extend({
  actions: {
    cancelEdit: function () {
      this.transitionTo('post', this.modelFor('post'));
    }
  }
});

App.PostCommentsRoute = Ember.Route.extend({
  actions: {
    addComment: function () {
      var msg = prompt("Your comment:", "Hi");
      if (!Ember.isEmpty(msg)) {
        var comment = {visiter: username, comment: msg}; 
        this.get('model').pushObject(comment);
        this.modelFor('post').save();
      }
    },
    deleteComment: function (comment) {
      this.get('model').removeObject(comment);
      this.modelFor('post').save();
    }
  }
});