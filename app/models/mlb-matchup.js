import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contests: DS.hasMany('mlb-contest'),
  game: DS.attr('string'),
  startTime: DS.attr('date'),
  weather: DS.attr('string'),
  vegasOdds: DS.attr('string'),

  home: Ember.computed('game', function() {
    return this.get('game').substring(4);
  }),

  away: Ember.computed('game', function() {
    return this.get('game').substring(0,3);
  }),

  park: Ember.computed.alias('home'),

  homeTeam: DS.belongsTo('mlb-team'),
  awayTeam: DS.belongsTo('mlb-team')
});
