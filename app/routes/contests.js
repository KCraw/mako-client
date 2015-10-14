import Ember from 'ember';

export default Ember.Route.extend({
  // This should build a DS.RSVP object with contests categorized by site and then sport
  // This should return all contests that have not yet started
  model() {
    var start = moment(new Date()).tz('America/New_York').format();

    return Ember.RSVP.hash({
      fanduelMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      fanduelNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      fanduelNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      draftkingsMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      }),
      draftkingsNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      }),
      draftkingsNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      })
    });
  }
});
