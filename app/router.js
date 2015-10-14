import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contests');
  this.route('date', { path: '/contests/:date' });
  this.route('mlb', { path: '/contests/mlb/:id' });
  this.route('nfl', { path: '/contests/nfl/:id' });
  this.route('nba', { path: '/contests/nba/:id' });
});

export default Router;
