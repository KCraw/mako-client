import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  team: DS.belongsTo('mlb-team'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  battingOrder: DS.attr('number'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  fdRating: DS.attr('number'),
  fdRatingPlus: DS.attr('number'),
  fdPosition: DS.attr('string'),
  fdSalary: DS.attr('number'),
  fdActual: DS.attr('number'),
  dkRating: DS.attr('number'),  // How to handle different for FD vs. DK?
  dkRatingPlus: DS.attr('number'),
  dkPosition: DS.attr('string'),
  dkSalary: DS.attr('number'),
  dkActual: DS.attr('number'),
  stats: DS.belongsTo('mlb-hitter-stats'),
  gamelogs: DS.hasMany('mlb-hitter-gamelog')
});
