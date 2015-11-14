import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.attr('string'),
  game: DS.attr('string'),
  opp: DS.attr('string'),
  ratings: Ember.computed('site', 'proto.fdRatings', 'proto.dkRatings', function() {
    return (this.get('site') === 'fanduel' && this.get('proto.fdRatings')) || (this.get('site') === 'draftkings' && this.get('proto.dkRatings'));
  }),
  rCSample: '50',
  rCustom: Ember.computed('ratings', 'rCSample', function() {
    return this.get(`ratings.r${this.get('rCSample')}`) || 0;
  }),
  rMid: Ember.computed('ratings', function() {
    return this.get('ratings.r50') || 0;
  }),
  rFloor: Ember.computed('ratings', function() {
    return this.get('ratings.r20') || 0;
  }),
  rCeil: Ember.computed('ratings', function() {
    return this.get('ratings.r80') || 0;
  }),
  rMean: Ember.computed('ratings', function() {
    let r = 0;
    let num = 0;
    for (let i = 20, len = 80; i <= len; i++) {
      r += this.get('ratings')['r'+i];
      num++;
    }
    return math.round(r/num || 0, 1);
  }),
  rWInt: Ember.computed('ratings', function() {
    // We use an integral approx using area of trapezoid
    let r = 0;
    for (let i = 20, len = 80; i < len; i++) {
      let aprob = 1 - i/100;
      let bprob = 1 - (i+1)/100;
      let a = this.get('ratings')['r'+i];
      let b = this.get('ratings')['r'+(i+1)];
      let h = ((aprob) + (bprob))/2;

      r += (a+b)/2 * h;
    }
    return math.round(r || 0);
  }),
  vCustom: Ember.computed('rCustom', 'salary', function() {
    return math.round(this.get('rCustom') / this.get('salary') * 1000, 1) || 0;
  }),
  vMean: Ember.computed('rMean', 'salary', function() {
    return math.round(this.get('rMean') / this.get('salary') * 1000, 1) || 0;
  }),
  vWInt: Ember.computed('rWInt', 'salary', function() {
    return math.round(this.get('rWInt') / this.get('salary') * 100, 1) || 0;
  }),
  actual: Ember.computed('site', 'proto.fdActual', 'proto.dkActual', function() {
    return (this.get('site') === 'fanduel' && this.get('proto.fdActual')) || (this.get('site') === 'draftkings' && this.get('proto.dkActual'));
  }),
  position: DS.attr('string'),
  salary: DS.attr('number'),
  stats: Ember.computed.alias('proto.stats'),
  proto: DS.belongsTo('nfl/player')
});
