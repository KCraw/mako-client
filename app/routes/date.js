import Ember from 'ember';

export default Ember.Route.extend({
  model({ date }) {
    let today = moment.tz(date + "T12:00:00", 'America/New_York');
    let start = moment(today).startOf('day').format();
    let end = moment(today).endOf('day').format();
    
    return Ember.RSVP.hash({
      date: today.toDate(),
      fanduelMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      fanduelNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      fanduelNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      draftkingsMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      }),
      draftkingsNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      }),
      draftkingsNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start,
        endAt: end
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      })
    });
  }
});
