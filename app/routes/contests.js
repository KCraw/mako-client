import Ember from 'ember';

export default Ember.Route.extend({
  // This should build a DS.RSVP object with contests categorized by site and then sport
  // This should return all contests that have not yet started
  model() {
    var now = new Date().getTime();

    return Ember.RSVP.hash({
      mlbContests: this.store.findAll('mlb-contest', {
        orderBy: 'startTime',
        startAt: now
      }),
      nflContests: this.store.findAll('nfl-contest', {
        orderBy: 'startTime',
        startAt: now
      }),
      nbaContests: this.store.findAll('nba-contest', {
        orderBy: 'startTime',
        startAt: now
      })
    });
  }
});
