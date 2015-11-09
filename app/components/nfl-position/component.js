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
	avgRCustom: Ember.computed('players.list.@each.rating', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('rCustom'); }), 0.75), 1);
	}),
	avgRMean: Ember.computed('players.list.@each.ratingMinus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('rMean'); }), 0.75), 1);
	}),
	avgRWInt: Ember.computed('players.list.@each.ratingPlus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('rWInt'); }), 0.75), 1);
	}),
	avgS: Ember.computed('players.list.@each.salary', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('salary'); }), 0.75), 1);
	}),
	avgVCustom: Ember.computed('players.list.@each.value', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('vCustom'); }), 0.75), 1);
	}),
	avgVMean: Ember.computed('players.list.@each.valueMinus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('vMean'); }), 0.75), 1);
	}),
	avgVWInt: Ember.computed('players.list.@each.valuePlus', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('vWInt'); }), 0.75), 1);
	}),
	avgA: Ember.computed('players.list.@each.actual', function() {
		return math.round(math.quantileSeq(this.get('players.list').map(function(player) { return player.get('actual') !== '?' ? player.get('actual') : 0; }), 0.56), 1) || '?';
	})
});

NflPositionComponent.reopenClass({
	positionalParams: ['players']
});

export default NflPositionComponent;