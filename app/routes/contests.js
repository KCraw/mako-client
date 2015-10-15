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
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      fanduelNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      fanduelNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'fanduel';
        });
      }),
      draftkingsMlbContests: this.store.query('mlb/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      }),
      draftkingsNflContests: this.store.query('nfl/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      }),
      draftkingsNbaContests: this.store.query('nba/contest', {
        orderBy: 'startTime',
        startAt: start
      }).then((contests) => {
        return contests.filter(function(item) {
          return item.get('site') === 'draftkings';
        });
      })
    });
  }
});
