import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  team: DS.attr('string'),
  type: DS.attr('string'),
  fdRating: DS.attr('string'),
  fdRatingPlus: DS.attr('string'),
  dkRating: DS.attr('string'),
  dkRatingPlus: DS.attr('string'),
  stats: DS.belongsTo('nfl/player-stats')
});
