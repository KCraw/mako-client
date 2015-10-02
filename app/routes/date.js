import Ember from 'ember';

export default Ember.Route.extend({
  // This should build a DS.RSVP object with contests categorized by site and then sport
  // This should return all contests that start(ed) on the date provided
  model({date}) {
    let start = new Date(date + "T00:00:00").getTime();
    let end = new Date(date + "T23:59:59").getTime();

    let mlb_contests = this.store.query('mlb-contest', {
      orderBy: 'startTime',
      startAt: start,
      endAt: end
    });
    let fdMlb_contests = mlb_contests.filter(function(item, index, self){
      return item.site = 'FanDuel';
    });
    let dkMlb_contests = mlb_contests.filter(function(item, index, self){
      return item.site = 'DraftKings';
    });

    let nfl_contests = this.store.query('nfl-contest', {
      orderBy: 'startTime',
      startAt: start,
      endAt: end
    });
    let fdNfl_contests = nfl_contests.filter(function(item, index, self){
      return item.site = 'FanDuel';
    });
    let dkNfl_contests = nfl_contests.filter(function(item, index, self){
      return item.site = 'DraftKings';
    });

    let nba_contests = this.store.query('nba-contest', {
      orderBy: 'startTime',
      startAt: start,
      endAt: end
    });
    let fdNba_contests = nba_contests.filter(function(item, index, self){
      return item.site = 'FanDuel';
    });
    let dkNba_contests = nba_contests.filter(function(item, index, self){
      return item.site = 'DraftKings';
    });

    return Ember.RSVP.hash({
      date: date,
      fd_mlbContests: fdMlb_contests,
      fd_nflContests: fdNfl_contests,
      fd_nbaContests: fdNba_contests,
      dk_mlbContests: dkMlb_contests,
      dk_nflContests: dkNfl_contests,
      dk_nbaContests: dkNba_contests
    });
  }
});
