import DS from 'ember-data';

export default DS.Model.extend({
  matchup: DS.belongsTo('mlb-matchup'),
  name: DS.attr('string'),
  abbr: DS.attr('string'),
  mascot: DS.attr('string'),
  pitcher: DS.belongsTo('mlb-pitcher'),
  hitters: DS.hasMany('mlb-hitters')
});
