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
		}
	}
});

NflPositionComponent.reopenClass({
	positionalParams: ['players']
});

export default NflPositionComponent;