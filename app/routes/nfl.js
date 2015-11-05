import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('nfl/contest', { equalTo: params.contest_id}).then((contests) => {
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
					aQB: Ember.RSVP.all(matchups.getEach('aQB')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hQB: Ember.RSVP.all(matchups.getEach('hQB')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aRB: Ember.RSVP.all(matchups.getEach('aRB')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hRB: Ember.RSVP.all(matchups.getEach('hRB')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aWR1: Ember.RSVP.all(matchups.getEach('aWR1')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hWR1: Ember.RSVP.all(matchups.getEach('hWR1')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aWR2: Ember.RSVP.all(matchups.getEach('aWR2')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hWR2: Ember.RSVP.all(matchups.getEach('hWR2')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aWR3: Ember.RSVP.all(matchups.getEach('aWR3')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hWR3: Ember.RSVP.all(matchups.getEach('hWR3')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aTE: Ember.RSVP.all(matchups.getEach('aTE')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hTE: Ember.RSVP.all(matchups.getEach('hTE')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aK: Ember.RSVP.all(matchups.getEach('aK')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hK: Ember.RSVP.all(matchups.getEach('hK')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					aD: Ember.RSVP.all(matchups.getEach('aD')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					}),
					hD: Ember.RSVP.all(matchups.getEach('hD')).then((players) => {
						return Ember.RSVP.all(players.getEach('proto')).then(protos => protos);
					})
				}).then(protos => protos);
  		})
  	}).then(() => contest);
  }
});
