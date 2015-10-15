import DS from 'ember-data';

export default DS.Model.extend({
  players: DS.attr(),
  games: DS.attr(),
  matchups: DS.hasMany('nfl/contest-matchup'),
});
