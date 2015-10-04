import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  fdRating: DS.attr('number'),
  fdRatingPlus: DS.attr('number'),
  dkRating: DS.attr('number'),
  dkRatingPlus: DS.attr('number'),
  stats: DS.belongsTo('mlb-pitcher-stats', { async: true }),
  gamelogs: DS.hasMany('mlb-pitcher-gamelog', { async: true }),
  actual: DS.belongsTo('mlb-pitcher-gamelog', { async: true })
});
