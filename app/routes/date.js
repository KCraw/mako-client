import Ember from 'ember';

export default Ember.Route.extend({
  model({ date }) {
    let today = moment.tz(date + "T12:00:00", 'America/New_York');
    let start = moment(today).startOf('day').format();
    let end = moment(today).endOf('day').format();
    
    return Ember.RSVP.hash({
      date: today.toDate(),
      mlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }),
      nflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }),
      nbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      })
    });
  }
});
