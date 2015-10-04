import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  ab: DS.attr('number'),
  k: DS.attr('number'),
  hbp: DS.attr('number'),
  bb: DS.attr('number'),
  h: DS.attr('number'),
  h1: DS.attr('number'),
  h2: DS.attr('number'),
  h3: DS.attr('number'),
  hr: DS.attr('number'),
  rbi: DS.attr('number'),
  r: DS.attr('number'),
  sb: DS.attr('number'),
  cs: DS.attr('number'),

  out: Ember.computed('ab', 'h', function () {
    return this.get('ab') - this.get('h');
  }),

  fdPoints: Ember.computed('out', 'hbp', 'bb', 'h', 'h1', 'h2', 'h3', 'hr', 'r', 'rbi', 'sb', function () {
    return  this.get('out') * -0.25
              + this.get('hbp') + this.get('bb')
              + this.get('h1') + this.get('h2') * 2 + this.get('h3') * 3 + this.get('hr') * 4
              + this.get('r') + this.get('rbi')
              + this.get('sb');
  }),

  dkPoints: Ember.computed('', function() {
    return 0;
  })
});
