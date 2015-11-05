import Ember from 'ember';

export function siteName([site]/*, hash*/) {
  return (site === 'fanduel' && 'FanDuel') || (site === 'draftkings' && 'DraftKings') || site;
}

export default Ember.Helper.helper(siteName);
