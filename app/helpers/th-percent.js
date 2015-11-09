import Ember from 'ember';

export function thPercent([num]/*, hash*/) {
  let end = num[num.length-1];
  let mod = (num == 11 && 'th') || (num == 12 && 'th') || (num == 13 && 'th') || (end == 1 && 'st') || (end == 2 && 'nd') || (end == 3 && 'rd') || 'th';
  return `${num}${mod} percentile`;
}

export default Ember.Helper.helper(thPercent);
