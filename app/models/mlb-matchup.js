import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  game: DS.attr('string'),
  startTime: DS.attr('date'),
  weather: DS.attr('string'),
  vegasOdds: DS.attr('string'),

  homeTeam: Ember.computed('game', function() {
    return this.get('game').substring(4);
  }),
  homePitcher: DS.belongsTo('mlb-pitcher', { async: true }),
  homeHitter1: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter2: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter3: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter4: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter5: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter6: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter7: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter8: DS.belongsTo('mlb-hitter', { async: true }),
  homeHitter9: DS.belongsTo('mlb-hitter', { async: true }),

  awayTeam: Ember.computed('game', function() {
    return this.get('game').substring(0,3);
  }),
  awayPitcher: DS.belongsTo('mlb-pitcher', { async: true }),
  awayHitter1: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter2: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter3: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter4: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter5: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter6: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter7: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter8: DS.belongsTo('mlb-hitter', { async: true }),
  awayHitter9: DS.belongsTo('mlb-hitter', { async: true }),

  park: Ember.computed.alias('home')
});
