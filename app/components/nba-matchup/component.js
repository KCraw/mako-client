import Ember from 'ember';

const NbaMatchupComponent = Ember.Component.extend({
  classNames: ['panel', 'panel-default'],
  awayPlayers: Ember.computed.collect('matchup.aPG', 'matchup.aSG', 'matchup.aSF', 'matchup.aPF', 'matchup.aC'),
  homePlayers: Ember.computed.collect('matchup.hPG', 'matchup.hSG', 'matchup.hSF', 'matchup.hPF', 'matchup.hC'),

  teams: Ember.computed('awayPlayers', 'homePlayers', function() {
		let r = [];
		r.pushObject({ name: `${this.get('matchup.awayTeam')}`, players: this.get('awayPlayers') });
		r.pushObject({ name: `@${this.get('matchup.homeTeam')}`, players: this.get('homePlayers') });
		return r;
  }),

  actions: {
  	playerClicked(player) {
  		this.get('onPlayerClicked')(player);
  	}
  }
});

NbaMatchupComponent.reopenClass({
	positionalParams: ['matchup']
});

export default NbaMatchupComponent;