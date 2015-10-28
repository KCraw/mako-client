import Ember from 'ember';

/*

This controller needs to:
  - Tracks whether each player is excluded
  - Tracks whether each player is required

*/

export default Ember.Controller.extend({

  matchups: Ember.computed.alias('model.matchups'),
  site: Ember.computed.alias('model.site'),
  players: Ember.computed('matchups.[]', function() {

  	return DS.PromiseArray.create({
  		promise: this.get('matchups').then((matchups) => {
	  		return matchups.reduce(function(acc, matchup) {
		  		acc.pushObject(matchup.get('aQB'));
		  		acc.pushObject(matchup.get('hQB'));
		  		acc.pushObject(matchup.get('aRB'));
		  		acc.pushObject(matchup.get('hRB'));
		  		acc.pushObject(matchup.get('aWR1'));
		  		acc.pushObject(matchup.get('aWR2'));
		  		acc.pushObject(matchup.get('aWR3'));
		  		acc.pushObject(matchup.get('hWR1'));
		  		acc.pushObject(matchup.get('hWR2'));
		  		acc.pushObject(matchup.get('hWR3'));
		  		acc.pushObject(matchup.get('aTE'));
		  		acc.pushObject(matchup.get('hTE'));
		  		acc.pushObject(matchup.get('aK'));
		  		acc.pushObject(matchup.get('hK'));
		  		acc.pushObject(matchup.get('aD'));
		  		acc.pushObject(matchup.get('hD'));
		  		return acc;
		  	}, []);
  		})
  	});
  	
  }),
	required: {},
	// This tracks each excluded player by id
	// 	Ex:
	// 		excluded: { -Xoda1-ssa: true }
	excluded: {}
});
