import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  ip: DS.attr('number'),
  win: DS.attr('boolean'),
  k: DS.attr('number'),
  hbp: DS.attr('number'),
  bb: DS.attr('number'),
  h: DS.attr('number'),
  h1: DS.attr('number'),
  h2: DS.attr('number'),
  h3: DS.attr('number'),
  hr: DS.attr('number'),
  r: DS.attr('number'),
  er: DS.attr('number'),

  fdPoints: Ember.computed('ip', 'win', 'k', 'er', function() {
    return Math.floor(this.get('ip')) + Math.floor(this.get('ip') % 1 * 333)/100 + this.get('win') * 4 + this.get('k') + this.get('er') * -1; // This maps to FD rules
  }),

  dkPoints: Ember.computed('', function() {
    return 0; // This should actually compute ponts based on DK rules
  })

});
