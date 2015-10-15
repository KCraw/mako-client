import Ember from 'ember';

export function etDate([date], {format}) {
  return moment(date).tz('America/New_York').format(format);
}

export default Ember.Helper.helper(etDate);
