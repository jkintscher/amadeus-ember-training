App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', function() {
  	this.route('new');
  });

  this.resource('post', { path: '/post/:post_id' }, function() {
    this.route('edit');
    this.resource('comments', function() {
      this.route('new');
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

var posts = [{
	id: '1',
	title: "Happy birthday Yaohua",
	author: "Amadeus",
	date: new Date('2014-10-13'),
	excerpt: "Say happy birthday to Yaohua Liang !",
	body: "Today is the birthday of our dear collegue Yaohua Liang, let's celebrate it !"
}, {
	id: '2',
	title: "Happy birthday Ali",
	author: "Amadeus",
	date: new Date('2014-11-11'),
	excerpt: "Say happy birthday to Ali !",
	body: "Today is the birthday of our dear collegue Ali, let's celebrate it !"
}, {
	id: '3',
	title: "Happy birthday Joschka",
	author: "Amadeus",
	date: new Date('2014-12-24'),
	excerpt: "Say happy birthday to Joschka !",
	body: "Today is the birthday of our dear collegue Joschka, let's celebrate it !"
}];