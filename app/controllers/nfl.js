import Ember from 'ember';

export default Ember.Controller.extend({
	// Controller is a Singleton!!!
	modelDidChange: Ember.observer('model', function() {
		this.set('rSample', 50);
		this.set('rMSample', 25);
		this.set('rPSample', 75);
		this.set('required', {});
		this.set('excluded', {});
		this.set('modalPlayer', null);
		this.set('modalEnabled', false);
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
			this.set('rSample', 50);
			this.set('rMSample', 25);
			this.set('rPSample', 75);
		}
	},
	// Component sync stuff
	rSampleChanged: Ember.observer('rSample', 'players.[]', function() {
		this.get('players').forEach((player) => {
			player.set('rSample', this.get('rSample'));
		});
	}),
	rMSampleChanged: Ember.observer('rMSample', 'players.[]', function() {
		this.get('players').forEach((player) => {
			player.set('rMSample', this.get('rMSample'));
		});
	}),
	rPSampleChanged: Ember.observer('rPSample', 'players.[]', function() {
		this.get('players').forEach((player) => {
			player.set('rPSample', this.get('rPSample'));
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
