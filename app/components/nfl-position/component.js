import Ember from 'ember';

const NflPositionComponent = Ember.Component.extend({
	playersSorting: ['team'],
	sortedPlayers: Ember.computed.sort('players.list', 'playersSorting'),
	actions: {
		sortPlayers(key) {
			if (this.get('playersSorting').get('firstObject') === key + ':desc') {
				this.set('playersSorting', [key]);
			} else {
				this.set('playersSorting', [key + ':desc']);
			}
		},
  	playerClicked(player) {
  		this.sendAction('action', player);
  	} 
	},
	avgR: Ember.computed('players.list.@each.rating', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('rating'); }), 0.75), 1);
	}),
	avgRMinus: Ember.computed('players.list.@each.ratingMinus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('ratingMinus'); }), 0.75), 1);
	}),
	avgRPlus: Ember.computed('players.list.@each.ratingPlus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('ratingPlus'); }), 0.75), 1);
	}),
	avgS: Ember.computed('players.list.@each.salary', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('salary'); }), 0.75), 1);
	}),
	avgV: Ember.computed('players.list.@each.value', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('value'); }), 0.75), 1);
	}),
	avgVMinus: Ember.computed('players.list.@each.valueMinus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('valueMinus'); }), 0.75), 1);
	}),
	avgVPlus: Ember.computed('players.list.@each.valuePlus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('valuePlus'); }), 0.75), 1);
	}),
	avgA: Ember.computed('players.list.@each.actual', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('actual') !== '?' ? player.get('actual') : 0; }), 0.56), 1) || '?';
	})
});

NflPositionComponent.reopenClass({
	positionalParams: ['players']
});

export default NflPositionComponent;