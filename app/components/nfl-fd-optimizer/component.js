import Ember from 'ember';

const NflFdOptimizer = Ember.Component.extend({
	init() {
		this._super(...arguments);

		// Track which positions have disabled controls (required is full)
		this.set('disabledPositions', {});

		// Track which players have been excluded
		this.set('excludedPlayers', {});

		// Track all required players
		this.set('requiredPlayers', {});

		// Default select for
		this.set('selectFor', 'rMean');
	},
	// rC -- passed to child componenents for display purposes
	rCSample: 50,
	rCSampleChanged: Ember.on('init', Ember.observer('rCSample', function() {
		let s = this.get('rCSample');
		this.get('players').setEach('rCSample', s);
	})),

	isBacktested: Ember.computed('players.@each.actual', function() {
		return !this.get('players').isEvery('actual', false);
	}),

	// Track players at each position
	poolQB: Ember.computed('contest.matchups.@each.aQB', 'contest.matchups.@each.hQB', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aQB'), item.get('hQB'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),
	poolRB: Ember.computed('contest.matchups.@each.aRB', 'contest.matchups.@each.hRB', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aRB'), item.get('hRB'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),
	poolWR: Ember.computed('contest.matchups.@each.aWR1', 'contest.matchups.@each.hWR1', 'contest.matchups.@each.aWR2', 'contest.matchups.@each.hWR2', 'contest.matchups.@each.aWR3', 'contest.matchups.@each.hWR3', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aWR1'), item.get('hWR1'), item.get('aWR2'), item.get('hWR2'), item.get('aWR3'), item.get('hWR3'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),
	poolTE: Ember.computed('contest.matchups.@each.aTE', 'contest.matchups.@each.hTE', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aTE'), item.get('hTE'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),
	poolK: Ember.computed('contest.matchups.@each.aK', 'contest.matchups.@each.hK', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aK'), item.get('hK'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),
	poolD: Ember.computed('contest.matchups.@each.aD', 'contest.matchups.@each.hD', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aD'), item.get('hD'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),

	// Track the pool at each contest position
	solutionQB1: null,
	requiredQB1DidChange: Ember.on('init', Ember.observer('requiredQB1', function() {
		this.set('solutionQB1', this.get('requiredQB1'));
	})),
	requiredQB1: null,
	poolQB1: Ember.computed('poolQB', 'excludedPlayers', 'requiredQB1', function() {
		if (this.get('requiredQB1')) {
			return this.get('requiredQB1');	// If a player has been required at this position, then the pool is only that player
		} else {   // The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players	
			return this.get('poolQB').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`);
			});
		}
	}),
	solutionRB1: null,
	requiredRB1DidChange: Ember.on('init', Ember.observer('requiredRB1', function() {
		this.set('solutionRB1', this.get('requiredRB1'));
	})),
	requiredRB1: null,
	poolRB1: Ember.computed('poolRB', 'excludedPlayers', 'requiredRB1', 'solutionRB2', function() {
		if (this.get('requiredRB1')) {
			return this.get('requiredRB1');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolRB').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`) && item !== this.get('solutionRB2');
			});
		}
	}),
	solutionRB2: null,
	requiredRB2DidChange: Ember.on('init', Ember.observer('requiredRB2', function() {
		this.set('solutionRB2', this.get('requiredRB2'));
	})),
	requiredRB2: null,
	poolRB2: Ember.computed('poolRB', 'excludedPlayers', 'requiredRB2', 'solutionRB1', function() {
		if (this.get('requiredRB2')) {
			return this.get('requiredRB2');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolRB').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`) && item !== this.get('solutionRB1');
			});
		}
	}),
	solutionWR1: null,
	requiredWR1DidChange: Ember.on('init', Ember.observer('requiredWR1', function() {
		this.set('solutionWR1', this.get('requiredWR1'));
	})),
	requiredWR1: null,
	poolWR1: Ember.computed('poolWR', 'excludedPlayers', 'requiredWR1', 'solutionWR2', 'solutionWR3', function() {
		if (this.get('requiredWR1')) {
			return this.get('requiredWR1');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`) && item !== this.get('solutionWR2') && item !== this.get('solutionWR3');
			});
		}
	}),
	solutionWR2: null,
	requiredWR2DidChange: Ember.on('init', Ember.observer('requiredWR2', function() {
		this.set('solutionWR2', this.get('requiredWR2'));
	})),
	requiredWR2: null,
	poolWR2: Ember.computed('poolWR', 'excludedPlayers', 'requiredWR2', 'solutionWR1', 'solutionWR3', function() {
		if (this.get('requiredWR2')) {
			return this.get('requiredWR2');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`) && item !== this.get('solutionWR1') && item !== this.get('solutionWR3');
			});
		}
	}),
	solutionWR3: null,
	requiredWR3DidChange: Ember.on('init', Ember.observer('requiredWR3', function() {
		this.set('solutionWR3', this.get('requiredWR3'));
	})),
	requiredWR3: null,
	poolWR3: Ember.computed('poolWR', 'excludedPlayers', 'requiredWR3', 'solutionWR1', 'solutionWR2', function() {
		if (this.get('requiredWR3')) {
			return this.get('requiredWR3');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`) && item !== this.get('solutionWR1') && item !== this.get('solutionWR2');
			});
		}
	}),
	solutionTE1: null,
	requiredTE1DidChange: Ember.on('init', Ember.observer('requiredTE1', function() {
		this.set('solutionTE1', this.get('requiredTE1'));
	})),
	requiredTE1: null,
	poolK1: Ember.computed('poolTE', 'excludedPlayers', 'requiredTE1', function() {
		if (this.get('requiredTE1')) {
			return this.get('requiredTE1');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolTE').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`);
			});
		}
	}),
	solutionK1: null,
	requiredK1DidChange: Ember.on('init', Ember.observer('requiredK1', function() {
		this.set('solutionK1', this.get('requiredK1'));
	})),
	requiredK1: null,
	poolK1: Ember.computed('poolK', 'excludedPlayers', 'requiredK1', function() {
		if (this.get('requiredK1')) {
			return this.get('requiredK1');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolK').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`);
			});
		}
	}),
	solutionD1: null,
	requiredD1DidChange: Ember.on('init', Ember.observer('requiredD1', function() {
		this.set('solutionD1', this.get('requiredD1'));
	})),
	requiredD1: null,
	poolD1: Ember.computed('poolD', 'excludedPlayers', 'requiredD1', function() {
		if (this.get('requiredD1')) {
			return this.get('requiredD1');	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolD').filter((item) => {
				return this.get(`excludedPlayers.${item.get('id')}`);
			});
		}
	}),    


	// Current solution sums
	solution: Ember.computed.collect('solutionQB1', 'solutionRB1', 'solutionRB2', 'solutionWR1', 'solutionWR2', 'solutionWR3', 'solutionTE1', 'solutionK1', 'solutionD1'),
	solutionCount: Ember.computed('solution', function() {
		return this.get('solution').compact().get('length');
	}),
	solutionRMeans: Ember.computed.collect('solutionQB1.rMean', 'solutionRB1.rMean', 'solutionRB2.rMean', 'solutionWR1.rMean', 'solutionWR2.rMean', 'solutionWR3.rMean', 'solutionTE1.rMean', 'solutionK1.rMean', 'solutionD1.rMean'),
 	solutionTotalRMean: Ember.computed.sum('solutionRMeans'),
 	solutionRWIs: Ember.computed.collect('solutionQB1.rWInt', 'solutionRB1.rWInt', 'solutionRB2.rWInt', 'solutionWR1.rWInt', 'solutionWR2.rWInt', 'solutionWR3.rWInt', 'solutionTE1.rWInt', 'solutionK1.rWInt', 'solutionD1.rWInt'),
 	solutionTotalRWI: Ember.computed.sum('solutionRWIs'),
  solutionRCustoms: Ember.computed.collect('solutionQB1.rCustom', 'solutionRB1.rCustom', 'solutionRB2.rCustom', 'solutionWR1.rCustom', 'solutionWR2.rCustom', 'solutionWR3.rCustom', 'solutionTE1.rCustom', 'solutionK1.rCustom', 'solutionD1.rCustom'),
 	solutionTotalRCustom: Ember.computed.sum('solutionRCustoms'),
 	solutionTotalActuals: Ember.computed.collect('solutionQB1.actual', 'solutionRB1.actual', 'solutionRB2.actual', 'solutionWR1.actual', 'solutionWR2.actual', 'solutionWR3.actual', 'solutionTE1.actual', 'solutionK1.actual', 'solutionD1.actual'),
 	solutionTotalActual: Ember.computed.sum('solutionTotalActuals'),
	solutionSalaries: Ember.computed.collect('solutionQB1.salary', 'solutionRB1.salary', 'solutionRB2.salary', 'solutionWR1.salary', 'solutionWR2.salary', 'solutionWR3.salary', 'solutionTE1.salary', 'solutionK1.salary', 'solutionD1.salary'),
 	solutionTotalSalary: Ember.computed.sum('solutionSalaries'),
	solutionRemainingSalary: Ember.computed('solutionTotalSalary', function() {
 		return 60000 - this.get('solutionTotalSalary');
 	}),
 	solutionRemainingSalaryPer: Ember.computed('solutionRemainingSalary', 'solutionCount', function() {
 		if (this.get('solutionCount') === 9) {
 			return 0;
 		} else if (math.sign(this.get('solutionRemainingSalary')) === -1) {
 			return 0;
 		} else if (this.get('solutionRemainingSalary') === 0) {
 			return 0;
 		} else {
			return Math.floor(this.get('solutionRemainingSalary') / (9 - this.get('solutionCount'))); 
 		}
 		
 	}),
 	// Formatting for nfl-matchup components
	matchupsSorting: ['startTime'],
	sortedMatchups: Ember.computed.sort('contest.matchups', 'matchupsSorting'),
	matchupRows: Ember.computed('sortedMatchups', function() {
		let matchups = this.get('sortedMatchups');
		let size = 2;
		let r = [];
		for (let i = 0, len = matchups.length; i < len; i += size) {
			r.push(matchups.slice(i, i + size));
		}
		return r;
	}),

	// Formatting for nfl-position components
	positionsGroup1: Ember.computed('poolQB', 'poolRB', 'poolTE', function() {
		let r = [];
		r.push({ name: "Quarterbacks", list: this.get('poolQB') });
		r.push({ name: "Runningbacks", list: this.get('poolRB') });
		r.push({ name: "Tight Ends", list: this.get('poolTE') });
		return r;
	}),
	positionsGroup2: Ember.computed('poolWR', 'poolK', 'poolD', function() {
		let r = [];
		r.push({ name: "Wide Receivers", list: this.get('poolWR') });
		r.push({ name: "Kickers", list: this.get('poolK') });
		r.push({ name: "Defenses", list: this.get('poolD') });
		return r;
	}),
	
	positionsGroups: Ember.computed.collect('positionsGroup1', 'positionsGroup2'),
	players: Ember.computed('poolQB', 'poolRB', 'poolWR', 'poolTE', 'poolK', 'poolD', function() {
		return [].concat(this.get('poolQB'), this.get('poolRB'), this.get('poolWR'), this.get('poolTE'), this.get('poolK'), this.get('poolD'));
	}),

	actions: {
		resetDefaults() {
			this.set('rCSample', 50);
			this.set('disabledPositions', {});
			this.set('excludedPlayers', {});
			this.set('requiredPlayers', {});
			this.set('selectFor', 'rMean');
			this.$('input[name="selectFor"][value="rMean"]').prop('checked', true);
			this.set('preventOppD', false);
			this.set('preventTeamK', false);
			this.set('solutionQB1', null);
			this.set('requiredQB1', null);
			this.set('solutionRB1', null);
			this.set('requiredRB1', null);
			this.set('solutionRB2', null);
			this.set('requiredRB2', null);
			this.set('solutionWR1', null);
			this.set('requiredWR1', null);
			this.set('solutionWR2', null);
			this.set('requiredWR2', null);
			this.set('solutionWR3', null);
			this.set('requiredWR3', null);
			this.set('solutionTE1', null);
			this.set('requiredTE1', null);
			this.set('solutionK1', null);
			this.set('requiredK1', null);
			this.set('solutionD1', null);
			this.set('requiredD1', null);
		},
		openPlayerModal(player) {
			this.set('modalPlayer', player);
			this.set('playerModalShown', false);
			this.set('playerModalEnabled', true);
		},
		closePlayerModal() {
			this.set('modalPlayer', null);
			this.set('playerModalEnabled', false);
			this.set('playerModalShown', false);
		},
		requirePlayer(player, toggle) {
			switch(player.get('position')) {
				case 'QB':
					if (toggle) {
						if (!this.get('requiredQB1')) {
							this.set('requiredQB1', player);
						}
					} else {
						if (player === this.get('requiredQB1')) {
							this.set('requiredQB1', null);
						}
					} 
					// Set disabled state
					if (this.get('requiredQB1')) {
						this.set('disabledPositions.QB', true);
					} else {
						this.set('disabledPositions.QB', false);
					}
					break;
				case 'RB':
					if (toggle) {
						if (!this.get('requiredRB1')) {
							this.set('requiredRB1', player);
						} else if (!this.get('requiredRB2')) {
							this.set('requiredRB2', player)
						}
					} else {
						if (player === this.get('requiredRB1')) {
							this.set('requiredRB1', null);
						} else if (player === this.get('requiredRB2')) {
							this.set('requiredRB2', null);
						}
					}
					// Set disabled state
					if (this.get('requiredRB1') && this.get('requiredRB2')) {
						this.set('disabledPositions.RB', true);
					} else {
						this.set('disabledPositions.RB', false);
					}  
					break;
				case 'WR':
					if (toggle) {
						if (!this.get('requiredWR1')) {
							this.set('requiredWR1', player);
						} else if (!this.get('requiredWR2')) {
							this.set('requiredWR2', player)
						} else if (!this.get('requiredWR3')) {
							this.set('requiredWR3', player)
						}
					} else {
						if (player === this.get('requiredWR1')) {
							this.set('requiredWR1', null);
						} else if (player === this.get('requiredWR2')) {
							this.set('requiredWR2', null);
						} else if (player === this.get('requiredWR3')) {
							this.set('requiredWR3', null);
						}
					}  
					// Set disabled state
					if (this.get('requiredWR1') && this.get('requiredWR2') && this.get('requiredWR3')) {
						this.set('disabledPositions.WR', true);
					} else {
						this.set('disabledPositions.WR', false);
					}
					break;
				case 'TE':
					if (toggle) {
						if (!this.get('requiredTE1')) {
							this.set('requiredTE1', player);
						}
					} else {
						if (player === this.get('requiredTE1')) {
							this.set('requiredTE1', null);
						}
					} 
					// Set disabled state
					if (this.get('requiredTE1')) {
						this.set('disabledPositions.TE', true);
					} else {
						this.set('disabledPositions.TE', false);
					}
					break;
				case 'K':
					if (toggle) {
						if (!this.get('requiredK1')) {
							this.set('requiredK1', player);
						}
					} else {
						if (player === this.get('requiredK1')) {
							this.set('requiredK1', null);
						}
					} 
					// Set disabled state
					if (this.get('requiredK1')) {
						this.set('disabledPositions.K', true);
					} else {
						this.set('disabledPositions.K', false);
					}
					break;
				case 'D':
					if (toggle) {
						if (!this.get('requiredD1')) {
							this.set('requiredD1', player);
						}
					} else {
						if (player === this.get('requiredD1')) {
							this.set('requiredD1', null);
						}
					} 
					// Set disabled state
					if (this.get('requiredD1')) {
						this.set('disabledPositions.D', true);
					} else {
						this.set('disabledPositions.D', false);
					}
					break;
			}
		},
		excludePlayer(player, toggle) {
			if (toggle) {
				this.send('requirePlayer', player, false)
			}
		},
		changeSelectFor(value) {
			this.set('selectFor', value);
		},
		optimizeLineup(button) {
			// Finally the meat of the thing... solve optimal lineup
			this.$(button).blur();
			alert('Yo, Dawg! We heard you like optimal lineups! So we took your optimal lineup and we optimally optimized it for optimal optimalness.');
		}
	}
});

NflFdOptimizer.reopenClass({
	positionalParams: ['contest']
});

export default NflFdOptimizer;
