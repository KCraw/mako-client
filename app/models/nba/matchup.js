import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  awayTeam: DS.attr('string'),
  awayStatus: DS.attr('string'),
  homeTeam: DS.attr('string'),
  homeStatus: DS.attr('string'),
  ainjuries: DS.attr(),
  aPG: DS.belongsTo('nba/player'),
  aSG: DS.belongsTo('nba/player'),
  aSF: DS.belongsTo('nba/player'),
  aPF: DS.belongsTo('nba/player'),
  aC: DS.belongsTo('nba/player'),
  hinjuries: DS.attr(),
  hPG: DS.belongsTo('nba/player'),
  hSG: DS.belongsTo('nba/player'),
  hSF: DS.belongsTo('nba/player'),
  hPF: DS.belongsTo('nba/player'),
  hC: DS.belongsTo('nba/player')
});
