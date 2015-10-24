import Ember from 'ember';

const NflMatchupComponent = Ember.Component.extend({
  classNames: ['panel', 'panel-default'],
  awayPlayers: Ember.computed.collect('matchup.aQB', 'matchup.aRB', 'matchup.aWR1', 'matchup.aWR2', 'matchup.aWR3', 'matchup.aTE', 'matchup.aK', 'matchup.aD'),
  homePlayers: Ember.computed.collect('matchup.hQB', 'matchup.hRB', 'matchup.hWR1', 'matchup.hWR2', 'matchup.hWR3', 'matchup.hTE', 'matchup.hK', 'matchup.hD')
});

NflMatchupComponent.reopenClass({
	positionalParams: ['matchup']
});

export default NflMatchupComponent;