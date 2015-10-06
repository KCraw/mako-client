import Ember from 'ember';

export default Ember.Route.extend({
  // This should build a DS.RSVP object with contests categorized by site and then sport
  // This should return all contests that start(ed) on the date provided
  model({date}) {
    let start = new Date(date + "T00:00:00").getTime();
    let end = new Date(date + "T23:59:59").getTime();

    return Ember.RSVP.hash({
      mlbContests: this.store.findAll('mlb-contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }),
      nflContests: this.store.findAll('nfl-contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }),
      nbaContests: this.store.findAll('nba-contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      })
    });
  }
});
