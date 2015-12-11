import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('nba/contest', { equalTo: params.contest_id}).then((contests) => {
    	return contests.get('firstObject');	
    });
  },
  afterModel(contest) {
  	 // Oh, Promises... Are you really superior? All this to preload to avoid pop-in
  	return Ember.RSVP.hash({
  		mProtos: contest.get('matchups').then((matchups) => {
  			return Ember.RSVP.all(matchups.getEach('proto')).then(protos => protos);
  		}),
  		pProtos: contest.get('matchups').then((matchups) => {
				return Ember.RSVP.hash({
					aPG: Ember.RSVP.all(matchups.getEach('aPG')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hPG: Ember.RSVP.all(matchups.getEach('hPG')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aSG: Ember.RSVP.all(matchups.getEach('aSG')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hSG: Ember.RSVP.all(matchups.getEach('hSG')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aSF: Ember.RSVP.all(matchups.getEach('aSF')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hSF: Ember.RSVP.all(matchups.getEach('hSF')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aPF: Ember.RSVP.all(matchups.getEach('aPF')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hPF: Ember.RSVP.all(matchups.getEach('hPF')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aC: Ember.RSVP.all(matchups.getEach('aC')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hC: Ember.RSVP.all(matchups.getEach('hC')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					})
				}).then(protos => protos);
  		})
  	}).then(() => contest);
  }
});
