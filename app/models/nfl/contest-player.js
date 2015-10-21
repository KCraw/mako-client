import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.attr('string'),
  game: DS.attr('string'),
  rating: DS.attr('number', { defaultValue: 0 }),
  ratingPlus: DS.attr('number', { defaultValue: 0 }),
  value: DS.attr('number', { defaultValue: 0 }),
  valuePlus: DS.attr('number', { defaultValue: 0 }),
  position: DS.attr('string'),
  salary: DS.attr('number'),
  stats: Ember.computed.alias('proto.stats'),
  proto: DS.belongsTo('nfl/player')
});
