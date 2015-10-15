import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: DS.attr('date'),
  weather: DS.attr('string'),
  awayTeam: DS.attr('string'),
  homeTeam: DS.attr('string'),
  ou: DS.attr('string'),
  line: DS.attr('string'),
  ainactives: DS.attr(),
  aQB: DS.belongsTo('nfl/player'),
  aRB: DS.belongsTo('nfl/player'),
  aWR1: DS.belongsTo('nfl/player'),
  aWR2: DS.belongsTo('nfl/player'),
  aWR3: DS.belongsTo('nfl/player'),
  aTE: DS.belongsTo('nfl/player'),
  aK: DS.belongsTo('nfl/player'),
  aD: DS.belongsTo('nfl/player'),
  hinactives: DS.attr(),
  hQB: DS.belongsTo('nfl/player'),
  hRB: DS.belongsTo('nfl/player'),
  hWR1: DS.belongsTo('nfl/player'),
  hWR2: DS.belongsTo('nfl/player'),
  hWR3: DS.belongsTo('nfl/player'),
  hTE: DS.belongsTo('nfl/player'),
  hK: DS.belongsTo('nfl/player'),
  hD: DS.belongsTo('nfl/player')
});
