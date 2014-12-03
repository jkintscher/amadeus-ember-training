App.PostsController = Ember.Controller.extend({
  sortedPosts: function () {
    return this.model.sortBy('date');
  }.property('model.@each')
});

App.PostsNewController = Ember.Controller.extend({
  actions: {
    addNewPost: function () {
      if (this.validate()) {
        return true;
      } else {
        alert('Should not be empty');
      }
    },
    cancelAdd: function () {
      this.transitionToRoute('posts');
    }
  },
  validate: function() {
    if (Ember.isEmpty(this.get('model.title'))) return false;
    if (Ember.isEmpty(this.get('model.excerpt'))) return false;
    if (Ember.isEmpty(this.get('model.body'))) return false;
    return true;
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

/*
in controller, use this.model, transitionToRoute()
in route, use this.modelFor(), transitionTo()
model, model.@each, model.[]
*/
