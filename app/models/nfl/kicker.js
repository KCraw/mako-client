import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  team: DS.attr('string'),
  fdRating: DS.attr('number'),
  fdRatingPlus: DS.attr('number'),
  dkRating: DS.attr('number'),
  dkRatingPlus: DS.attr('number'),
  stats: DS.belongsTo('nfl/kicker-stats')
});
