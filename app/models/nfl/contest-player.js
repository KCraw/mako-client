import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.attr('string'),
  game: DS.attr('string'),
  rating: Ember.computed('site', 'proto.fdRating', 'proto.dkRating', function() {
    return (this.get('site') === 'fanduel' && (this.get('proto.fdRating') || 0)) || (this.get('site') === 'draftkings' && (this.get('proto.dkRating') || 0)) || 0;
  }),
  ratingMinus: Ember.computed('site', 'proto.fdRatingMinus', 'proto.dkRatingMinus', function() {
    return (this.get('site') === 'fanduel' && (this.get('proto.fdRatingMinus') || 0)) || (this.get('site') === 'draftkings' && (this.get('proto.dkRatingMinus') || 0)) || 0;
  }),
  ratingPlus: Ember.computed('site', 'proto.fdRatingPlus', 'proto.dkRatingPlus', function() {
    return (this.get('site') === 'fanduel' && (this.get('proto.fdRatingPlus') || 0)) || (this.get('site') === 'draftkings' && (this.get('proto.dkRatingPlus') || 0)) || 0;
  }),
  value: Ember.computed('rating', 'salary', function() {
    return Math.round(this.get('rating') / this.get('salary') * 10000)/10 || 0;
  }),
  valueMinus: Ember.computed('rating', 'salaryMinus', function() {
    return Math.round(this.get('ratingMinus') / this.get('salary') * 10000)/10 || 0;
  }),
  valuePlus: Ember.computed('rating', 'salaryPlus', function() {
    return Math.round(this.get('ratingPlus') / this.get('salary') * 10000)/10 || 0;
  }),
  position: DS.attr('string'),
  salary: DS.attr('number'),
  stats: Ember.computed.alias('proto.stats'),
  proto: DS.belongsTo('nfl/player')
});
