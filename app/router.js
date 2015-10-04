import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contests');
  this.route('date', { path: '/contests/:date' });
  this.route('mlb', { path: '/contests/mlb/:contest_id' });
  this.route('nfl', { path: '/contests/nfl/:contest_id' });
  this.route('nba', { path: '/contests/nba/:contest_id' });
});

export default Router;
