import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  team: DS.attr('string'),
  type: DS.attr('string'),
  fdRating: DS.attr('number'),
  fdRatingMinus: DS.attr('number'),
  fdRatingPlus: DS.attr('number'),
  fdActual: DS.attr('number'),
  dkRating: DS.attr('number'),
  dkRatingMinus: DS.attr('number'),
  dkRatingPlus: DS.attr('number'),
  dkActual: DS.attr('number'),
  stats: DS.belongsTo('nfl/player-stats')
});
