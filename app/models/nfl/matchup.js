import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  weather: DS.attr('string'),
  awayTeam: DS.attr('string'),
  homeTeam: DS.attr('string'),
  ou: DS.attr('string'),
  line: DS.attr('string'),
  ainactives: DS.attr(),
  aQB: DS.belongsTo('nfl/quarterback'),
  aRB: DS.belongsTo('nfl/runningback'),
  aWR1: DS.belongsTo('nfl/widereceiver'),
  aWR2: DS.belongsTo('nfl/widereceiver'),
  aWR3: DS.belongsTo('nfl/widereceiver'),
  aTE: DS.belongsTo('nfl/tightend'),
  aK: DS.belongsTo('nfl/kicker'),
  aD: DS.belongsTo('nfl/defense'),
  hinactives: DS.attr(),
  hQB: DS.belongsTo('nfl/quarterback'),
  hRB: DS.belongsTo('nfl/runningback'),
  hWR1: DS.belongsTo('nfl/widereceiver'),
  hWR2: DS.belongsTo('nfl/widereceiver'),
  hWR3: DS.belongsTo('nfl/widereceiver'),
  hTE: DS.belongsTo('nfl/tightend'),
  hK: DS.belongsTo('nfl/kicker'),
  hD: DS.belongsTo('nfl/defense')
});
