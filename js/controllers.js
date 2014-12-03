App.PostsController = Ember.Controller.extend({
  sortedPosts: function () {
    return this.model.sortBy('date');
  }.property('model.@each')
});

App.PostsNewController = Ember.Controller.extend({
  actions: {
    addNewPost: function (title, excerpt, body) {
      if (!Ember.isEmpty(title) && !Ember.isEmpty(excerpt) && !Ember.isEmpty(body)) {
        return true;
      } else {
        alert("Should not be empty");
      }
    },
    cancelAdd: function () {
      this.transitionToRoute('post', this.model.get('firstObject'));
    }
  }
});

App.PostController = Ember.Controller.extend({
  actions: {
    deletePost: function () {
      if (confirm("Sure to delete this post?")) {
        return true;
      }
    },
    deleteComment: function (comment) {
      if (confirm("Sure to delete this comment?")) {
        return true;
      }
    }
  }
});

/*
in controller, use this.model, transitionToRoute()
in route, use this.modelFor(), transitionTo()
model, model.@each, model.[]
*/