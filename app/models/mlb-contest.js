import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: DS.attr('date'),
  slotName: DS.attr('string'),
  meta: DS.belongsTo('contest-meta'),
  matchups: DS.hasMany('mlb-matchup'),

  sport: Ember.computed(function() {
    return 'mlb';
  })
});
