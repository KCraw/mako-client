import Ember from 'ember';

export function mathRound([number], {decimals}) {
  return math.round(number, (decimals || 0));
}

export default Ember.Helper.helper(mathRound);
