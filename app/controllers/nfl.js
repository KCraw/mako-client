import Ember from 'ember';

export default Ember.Controller.extend({
	// Controller is a Singleton!!!
	modelDidChange: Ember.observer('model', function() {
		this.set('rCSample', 50);
		this.set('modalPlayer', null);
		this.set('modalEnabled', false);
		this.get('players').then((players) => {
			players.forEach(function(player) {
				player.set('isRequired', false);
				player.set('isExcluded', false);
			});	
		});
	}),
	// Modal for players
	actions: {
		openModal(player) {
			this.set('modalPlayer', player);
			this.toggleProperty('modalEnabled');
		},
		closeModal() {
			this.set('modalPlayer', null);
			this.toggleProperty('modalEnabled');
		}, 
		resetDefaults() {
			this.set('rCSample', 50);
		}
	},
	// Component sync stuff
	rCSampleChanged: Ember.observer('rCSample', 'players.[]', function() {
		this.get('players').forEach((player) => {
			player.set('rCSample', this.get('rCSample'));
		});
	}),
	contest: Ember.computed.alias('model'),
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
  })
});
