import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.attr('string'),
  game: DS.attr('string'),
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
    let keys = Object.keys(this.get('ratings'));
    keys.forEach((key, index) => {
      r += this.get('ratings')[key];
    });
    return math.round(r/keys.length || 0, 1);
  }),
  rWInt: Ember.computed('ratings', function() {
    // We use an integral approx using area of trapezoid
    let r = 0;
    let keys = Object.keys(this.get('ratings'));
    keys.forEach((key, index) => {
      if (index < keys.length - 1) {
        let aprob = (1 - +key.replace('r','')/100);
        let bprob = (1 - +keys[index+1].replace('r','')/100);
        let a = this.get('ratings')[key];
        let b = this.get('ratings')[keys[index+1]];
        let h = ((aprob) + (bprob))/2;

        r += (a+b)/2 * h;
      }
    });
    return math.round(r || 0);
  }),
  vCustom: Ember.computed('rating', 'salary', function() {
    return math.round(this.get('rCustom') / this.get('salary') * 1000, 1) || 0;
  }),
  vMean: Ember.computed('ratingMinus', 'salary', function() {
    return math.round(this.get('rMean') / this.get('salary') * 1000, 1) || 0;
  }),
  vWInt: Ember.computed('ratingPlus', 'salary', function() {
    return math.round(this.get('rWInt') / this.get('salary') * 1000, 1) || 0;
  }),
  actual: Ember.computed('site', 'proto.fdActual', 'proto.dkActual', function() {
    if (this.get('site') === 'fanduel') {
      return this.get('proto.fdActual') != null ? this.get('proto.fdActual') : '?';
    } else if (this.get('site') === 'draftkings') {
      return this.get('proto.dkActual') != null ? this.get('proto.dkActual') : '?';
    } else {
      return '?';
    }
  }),
  position: DS.attr('string'),
  salary: DS.attr('number'),
  stats: Ember.computed.alias('proto.stats'),
  proto: DS.belongsTo('nfl/player'),
  isRequired: false,
  required: Ember.observer('isRequired', function() {
    if (this.get('isRequired')) {
      this.set('isExcluded', false);
    }
  }),
  isExcluded: false,
  excluded: Ember.observer('isExcluded', function() {
    if (this.get('isExcluded')) {
      this.set('isRequired', false);
    }
  }),
  isDisabled: false

});
