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
  rSample: '50',
  rName: Ember.computed('rSample', function() {
    let num = this.get('rSample');
    let end = num[num.length-1];
    let mod = (num == 11 && 'th') || (num == 12 && 'th') || (num == 13 && 'th') || (end == 1 && 'st') || (end == 2 && 'nd') || (end == 3 && 'rd') || 'th';
    return `${num}${mod} percentile`;
  }),
  rMSample: '25',
  rMName: Ember.computed('rMSample', function() {
    let num = this.get('rMSample');
    let end = num[num.length-1];
    let mod = (num == 11 && 'th') || (num == 12 && 'th') || (num == 13 && 'th') || (end == 1 && 'st') || (end == 2 && 'nd') || (end == 3 && 'rd') || 'th';
    return `${num}${mod} percentile`;
  }),
  rPSample: '75',
  rPName: Ember.computed('rPSample', function() {
    let num = this.get('rPSample');
    let end = num[num.length-1];
    let mod = (num == 11 && 'th') || (num == 12 && 'th') || (num == 13 && 'th') || (end == 1 && 'st') || (end == 2 && 'nd') || (end == 3 && 'rd') || 'th';
    return `${num}${mod} percentile`;
  }),
  rating: Ember.computed('ratings', 'rSample', function() {
    return this.get(`ratings.r${this.get('rSample')}`) || 0;
  }),
  ratingMinus: Ember.computed('ratings', 'rMSample', function() {
    return this.get(`ratings.r${this.get('rMSample')}`) || 0;
  }),
  ratingPlus: Ember.computed('ratings', 'rPSample', function() {
    return this.get(`ratings.r${this.get('rPSample')}`) || 0;
  }),
  rComposite: Ember.computed('ratings', function() {
    let rC = 0;
    let keys = Object.keys(this.get('ratings'));
    keys.forEach((key) => {
      rC += this.get('ratings')[key]
    });
    return math.round(rC/keys.length || 0, 1);
  }),
  value: Ember.computed('rating', 'salary', function() {
    return math.round(this.get('rating') / this.get('salary') * 1000, 1) || 0;
  }),
  valueMinus: Ember.computed('ratingMinus', 'salary', function() {
    return math.round(this.get('ratingMinus') / this.get('salary') * 1000, 1) || 0;
  }),
  valuePlus: Ember.computed('ratingPlus', 'salary', function() {
    return math.round(this.get('ratingPlus') / this.get('salary') * 1000, 1) || 0;
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
