import Ember from 'ember';

export default Ember.Route.extend({
  model({ date }) {
    let start = moment.tz(date + "T00:00:00", 'America/New_York').format();
    let end = moment.tz(date + "T23:59:59", 'America/New_York').format();
    let today = moment.tz(date + "T00:00:00", 'America/New_York');

    return Ember.RSVP.hash({
      fanduelMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      fanduelNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      fanduelNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isFanDuel');
      }),
      draftkingsMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      }),
      draftkingsNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      }),
      draftkingsNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filterBy('isDraftKings');
      }),
      date: today.format('dddd, MMMM Do, YYYY'),
      shortDate: today.format('MM/DD/YYYY')
    });
  }
});
