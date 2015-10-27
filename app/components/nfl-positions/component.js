import Ember from 'ember';

const NflPlayersComponent = Ember.Component.extend({
	playersQB: Ember.computed.filterBy('players', 'position', 'QB'),
	playersRB: Ember.computed.filterBy('players', 'position', 'RB'),
	playersWR: Ember.computed.filterBy('players', 'position', 'WR'),
	playersTE: Ember.computed.filterBy('players', 'position', 'TE'),
	playersK: Ember.computed.filterBy('players', 'position', 'K'),
	playersD: Ember.computed.filterBy('players', 'position', 'D'),

	playersGroup1: Ember.computed('playersQB', 'playersRB', 'playersTE', function() {
		let r = [];
		r.pushObject({ position: "QB", list: this.get('playersQB') });
		r.pushObject({ position: "RB", list: this.get('playersRB') });
		r.pushObject({ position: "TE", list: this.get('playersTE') });
		return r;
	}),
	playersGroup2: Ember.computed('playersWR', 'playersK', 'playersD', function() {
		let r = [];
		r.pushObject({ position: "WR", list: this.get('playersWR') });
		r.pushObject({ position: "K", list: this.get('playersK') });
		r.pushObject({ position: "D", list: this.get('playersD') });
		return r;
	}),
	
	playersGroups: Ember.computed.collect('playersGroup1', 'playersGroup2')
});

NflPlayersComponent.reopenClass({
	positionalParams: ['players']
});

export default NflPlayersComponent;