import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.attr('string'),
  game: DS.attr('string'),
  rating: Ember.computed('proto.fdRating', 'proto.dkRating', 'site', function() {
    if (this.get('site') === 'fanduel') {
      return this.get('proto.fdRating') || 0;
    } else if (this.get('site') === 'draftkings') {
      return this.get('proto.dkRating') || 0;
    } else {
      return 0;
    }
  }),
  ratingPlus: Ember.computed('proto.fdRatingPlus', 'proto.dkRatingPlus', 'site', function() {
    if (this.get('site') === 'fanduel') {
      return this.get('proto.fdRatingPlus') || 0;
    } else if (this.get('site') === 'draftkings') {
      return this.get('proto.dkRatingPlus') || 0;
    } else {
      return 0;
    }
  }),
  position: DS.attr('string'),
  salary: DS.attr('number'),
  stats: Ember.computed.alias('proto.stats'),
  proto: DS.belongsTo('nfl/player')
});
