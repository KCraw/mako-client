import Ember from 'ember';

export function shortSalary([cost]/*, hash*/) {
  return `${Math.round(cost/1000 * 10)/10}k`;
}

export default Ember.Helper.helper(shortSalary);
