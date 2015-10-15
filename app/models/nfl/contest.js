import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  slot: DS.attr('string'),
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  meta: DS.belongsTo('nfl/contest-meta'),

  displayName: Ember.computed('site', 'slot', 'startTime', function() {
    let name = '';
    if (this.get('site') === 'fanduel') {
      name += "FanDuel ";
    } else if (this.get('site') === 'draftkings') {
      name += "DraftKings ";
    }
    name += moment(this.get('startTime')).tz('America/New_York').format('ddd MM/DD/YY h:mmA') + ' ET ';
    name += '(' + this.get('slot').toUpperCase() + ')';
    return name;
  }),

  sport: 'nfl'
});
