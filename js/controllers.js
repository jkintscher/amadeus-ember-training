App.PostsController = Ember.Controller.extend({
  sortedPosts: function () {
    return this.model.sortBy('date');
  }.property('model')
});

App.PostsNewController = Ember.Controller.extend({
  actions: {
    cancelAdd: function () {
      this.transitionToRoute('posts');
    }
  }
});

App.PostController = Ember.Controller.extend({
  //isEditing: false,
  actions: {
    /*deletePost: function () {
      if (confirm("Sure to delete this post?")) {
        this.store.find('post', this.model.id).then(function (post) {
          post.deleteRecord();
          post.get('isDeleted');
          post.save();
        });
        this.transitionToRoute('posts');
      } else {
          return;
      }
    },*/
    /*editPost: function () {
      this.set('isEditing', true);
    },
    cancelEdit: function () {
      this.set('isEditing', false);
    },*/
    /*updatePost: function (title, excerpt, body) {
      this.store.find('post', this.model.id).then(function (post) {
      	if(title != '' && title != null)
       		post.set('title', title);
       	if(excerpt != '' && excerpt != null)
        	post.set('excerpt', excerpt);
      	if(body != '' && body != null)
        	post.set('body', body);
        post.set('date', new Date());
      });
      this.set('isEditing', false);
      this.transitionToRoute('post', this.model.id);
    },*/
    addComment: function () {
      var msg = prompt("Your comment:", "Hi");
      if (!Em.isEmpty(msg)) {
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

App.PostEditController = Ember.Controller.extend({
  actions: {
    cancelEdit: function () {
      this.transitionToRoute('post', this.modelFor('post'));
    }
  }
});

App.PostDeleteController = Ember.Controller.extend({
  actions: {
    deletePost: function () {
      if (confirm("Sure to delete this post?")) {
        return true;
      }
    }
  }
});

/*App.PostCommentsController = Ember.Controller.extend({

});

App.PostCommentsNewController = Ember.Controller.extend({

});

App.PostCommentsDeleteController = Ember.Controller.extend({

});*/