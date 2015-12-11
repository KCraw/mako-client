import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: Ember.computed.alias('proto.startTime'),
  awayTeam: DS.attr('string'),
  awayStatus: Ember.computed.alias('proto.awayStatus'),
  homeTeam: DS.attr('string'),
  homeStatus: Ember.computed.alias('proto.homeStatus'),
  ainjuries: Ember.computed.alias('proto.ainjuries'),
  aPG: DS.belongsTo('nba/contest-player'),
  aSG: DS.belongsTo('nba/contest-player'),
  aSF: DS.belongsTo('nba/contest-player'),
  aPF: DS.belongsTo('nba/contest-player'),
  aC: DS.belongsTo('nba/contest-player'),
  hinjuries: Ember.computed.alias('proto.hinjuries'),
  hPG: DS.belongsTo('nba/contest-player'),
  hSG: DS.belongsTo('nba/contest-player'),
  hSF: DS.belongsTo('nba/contest-player'),
  hPF: DS.belongsTo('nba/contest-player'),
  hC: DS.belongsTo('nba/contest-player'),
  proto: DS.belongsTo('nba/matchup')
});