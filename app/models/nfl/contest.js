import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  slotName: DS.attr('string'),
  meta: DS.belongsTo('nfl/contest-meta'),

  name: Ember.computed('startTime', 'slotName', function () {
    return `${moment(this.get('startTime')).tz('America/New_York').format('ddd MM/DD @ h:mmA z')} (${this.get('slotName')})`;
  }),
  sport: Ember.computed(function() {
    return 'nfl';
  }),
  isFanDuel: Ember.computed('site', function() {
    return this.get('site') === 'fanduel';
  }),
  isDraftKings: Ember.computed('site', function() {
    return this.get('site') === 'draftkings';
  })
});
