import DS from 'ember-data';

export default DS.Model.extend({
  matchups: DS.attr(),
  games: DS.attr(),
  players: DS.attr()
});
