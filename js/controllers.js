App.PostsController = Ember.Controller.extend({
  sortedPosts: function () {
    return this.model.sortBy('date');
  }.property('model')
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
      this.transitionToRoute('posts');
    }
  }
});

App.PostController = Ember.Controller.extend({
  actions: {
    deletePost: function () {
      if (confirm("Sure to delete this post?")) {
        return true;
      }
    }
  }
});

