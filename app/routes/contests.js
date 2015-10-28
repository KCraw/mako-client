import Ember from 'ember';

export default Ember.Route.extend({
  // This should build a DS.RSVP object with contests categorized by site and then sport
  // This should return all contests that have not yet started
  model() {
    var start = moment(new Date()).tz('America/New_York').format();

    return Ember.RSVP.hash({
      mlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start
      }),
      nflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start
      }),
      nbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start
      })
    });

  }
});