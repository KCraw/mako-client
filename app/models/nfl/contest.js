import DS from 'ember-data';

export default DS.Model.extend({
  sport: 'nfl',
  site: DS.attr('string'),
  slot: DS.attr('string'),
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),

  displayName: Ember.computed('site', 'slot', 'startTime', function() {
    let name = this.get('site') === 'fanduel' && 'FanDuel ' || this.get('site') === 'draftkings' && 'DraftKings ';
    name += moment(this.get('startTime')).tz('America/New_York').format('ddd MM/DD/YY h:mmA') + ' ET ';
    name += '(' + this.get('slot').toUpperCase() + ')';
    return name;
  }),

  meta: DS.belongsTo('nfl/contest-meta'),
  matchups: DS.hasMany('nfl/contest-matchup')
});
