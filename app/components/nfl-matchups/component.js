import Ember from 'ember';

const NflMatchupsComponent =  Ember.Component.extend({
	classNames: ['row'],
	matchupsSorting: ['startTime'],
	sortedMatchups: Ember.computed.sort('matchups', 'matchupsSorting'),
	rows: Ember.computed('sortedMatchups', function() {
		let matchups = this.get('sortedMatchups');
		let size = 2;
		let r = [];
		for (let i = 0, len = matchups.length; i < len; i += size) {
			r.push(matchups.slice(i, i + size));
		}
		return r;
	}),

	actions: {
  	playerClicked(player) {
  		this.sendAction('action', player);
  	} 
  }
});

NflMatchupsComponent.reopenClass({
	positionalParams: ['matchups']
});

export default NflMatchupsComponent;
