import Ember from 'ember';

const positions = ['QB1', 'RB1', 'RB2', 'WR1', 'WR2', 'WR3', 'TE1', 'K1', 'D1'];

const NflFdOptimizer = Ember.Component.extend({
	init() {
		this._super(...arguments);

		this.send('resetDefaults');
	},
	// rC -- passed to child componenents for display purposes
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
	requiredQB1DidChange: Ember.on('init', Ember.observer('requiredQB1', function() {
		if (this.get('requiredQB1')) {
			this.set('solutionQB1', this.get('requiredQB1'));
		}
	})),
	poolQB1: Ember.computed('poolQB', 'requiredQB1', function() {
		if (this.get('requiredQB1')) {
			return [this.get('requiredQB1')];	// If a player has been required at this position, then the pool is only that player
		} else {   // The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players	
			return this.get('poolQB');
		}
	}),
	sortedPoolQB1: Ember.computed.sort('poolQB1', 'poolSorting'), 

	requiredRB1DidChange: Ember.on('init', Ember.observer('requiredRB1', function() {
		if (this.get('requiredRB1')) {
			this.set('solutionRB1', this.get('requiredRB1'));
		}
	})),
	poolRB1: Ember.computed('poolRB', 'requiredRB1', 'solutionRB2', function() {
		if (this.get('requiredRB1')) {
			return [this.get('requiredRB1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolRB').filter((item) => {
				return item !== this.get('solutionRB2');
			});
		}
	}),
	sortedPoolRB1: Ember.computed.sort('poolRB1', 'poolSorting'), 

	requiredRB2DidChange: Ember.on('init', Ember.observer('requiredRB2', function() {
		if (this.get('requiredRB2')) {
			this.set('solutionRB2', this.get('requiredRB2'));
		}
	})),
	poolRB2: Ember.computed('poolRB', 'requiredRB2', 'solutionRB1', function() {
		if (this.get('requiredRB2')) {
			return [this.get('requiredRB2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolRB').filter((item) => {
				return item !== this.get('solutionRB1');
			});
		}
	}),
	sortedPoolRB2: Ember.computed.sort('poolRB2', 'poolSorting'), 

	requiredWR1DidChange: Ember.on('init', Ember.observer('requiredWR1', function() {
		if (this.get('requiredWR1')) {
			this.set('solutionWR1', this.get('requiredWR1'));
		}
	})),
	poolWR1: Ember.computed('poolWR', 'requiredWR1', 'solutionWR2', 'solutionWR3', function() {
		if (this.get('requiredWR1')) {
			return [this.get('requiredWR1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return item !== this.get('solutionWR2') && item !== this.get('solutionWR3');
			});
		}
	}),
	sortedPoolWR1: Ember.computed.sort('poolWR1', 'poolSorting'), 

	requiredWR2DidChange: Ember.on('init', Ember.observer('requiredWR2', function() {
		if (this.get('requiredWR2')) {
			this.set('solutionWR2', this.get('requiredWR2'));
		}
	})),
	poolWR2: Ember.computed('poolWR', 'requiredWR2', 'solutionWR1', 'solutionWR3', function() {
		if (this.get('requiredWR2')) {
			return [this.get('requiredWR2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return item !== this.get('solutionWR1') && item !== this.get('solutionWR3');
			});
		}
	}),
	sortedPoolWR2: Ember.computed.sort('poolWR2', 'poolSorting'), 


	requiredWR3DidChange: Ember.on('init', Ember.observer('requiredWR3', function() {
		if (this.get('requiredWR3')) {
			this.set('solutionWR3', this.get('requiredWR3'));
		}
	})),
	poolWR3: Ember.computed('poolWR', 'requiredWR3', 'solutionWR1', 'solutionWR2', function() {
		if (this.get('requiredWR3')) {
			return [this.get('requiredWR3')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolWR').filter((item) => {
				return item !== this.get('solutionWR1') && item !== this.get('solutionWR2');
			});
		}
	}),
	sortedPoolWR3: Ember.computed.sort('poolWR3', 'poolSorting'), 


	requiredTE1DidChange: Ember.on('init', Ember.observer('requiredTE1', function() {
		if (this.get('requiredTE1')) {				
			this.set('solutionTE1', this.get('requiredTE1'));
		}
	})),
	poolTE1: Ember.computed('poolTE', 'requiredTE1', function() {
		if (this.get('requiredTE1')) {
			return [this.get('requiredTE1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolTE');
		}
	}),
	sortedPoolTE1: Ember.computed.sort('poolTE1', 'poolSorting'), 

	requiredK1DidChange: Ember.on('init', Ember.observer('requiredK1', function() {
		if (this.get('requiredK1')) {
			this.set('solutionK1', this.get('requiredK1'));
		}
	})),
	poolK1: Ember.computed('poolK', 'requiredK1', function() {
		if (this.get('requiredK1')) {
			return [this.get('requiredK1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolK');
		}
	}),
	sortedPoolK1: Ember.computed.sort('poolK1', 'poolSorting'), 

	requiredD1DidChange: Ember.on('init', Ember.observer('requiredD1', function() {
		if (this.get('requiredD1')) {
			this.set('solutionD1', this.get('requiredD1'));
		}
	})),
	poolD1: Ember.computed('poolD', 'requiredD1', function() {
		if (this.get('requiredD1')) {
			return [this.get('requiredD1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolD');
		}
	}),   
	sortedPoolD1: Ember.computed.sort('poolD1', 'poolSorting'), 

	poolSorting: ['salary:desc'],
	pools: Ember.computed.collect('poolQB1', 'poolRB1', 'poolRB2', 'poolWR1', 'poolWR2', 'poolWR3', 'poolTE1', 'poolK1', 'poolD1'),

	// Current solution sums
	solution: Ember.computed.collect('solutionQB1', 'solutionRB1', 'solutionRB2', 'solutionWR1', 'solutionWR2', 'solutionWR3', 'solutionTE1', 'solutionK1', 'solutionD1'),
	solutionCurrent: Ember.computed('solution.[]', function() {
		return this.get('solution').compact();
	}),
	solutionCount: Ember.computed.alias('solutionCurrent.length'),
	solutionTeams: Ember.computed('solutionCurrent.[]', function(){
		let tTeams = new Map();
		this.get('solutionCurrent').forEach(function(player) {
			if (!tTeams[player.get('team')]) {
				tTeams[player.get('team')] = 1;
			} else {
				tTeams[player.get('team')]++;
			}
		});
		return tTeams;
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
 		return this.get('salaryCap') - this.get('solutionTotalSalary');
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
			this.set('selectFor', 'rMean');
			this.set('strategy', 'balanced');
			this.set('preventOppD', false);
			this.set('preventTeamK', false);
			this.set('salaryCap', 60000);
			this.set('teamCap', 4);
			if (this.$()) {
				this.$('input[name="selectFor"][value="rWMean"]').prop('checked', true);	
			}
			if (this.$()) {
				this.$('input[name="strategy"][value="balanced"]').prop('checked', true);	
			}
			this.send('resetPlayers');
		},
		resetPlayers() {
			this.set('disabledPositions', {});
			this.set('excludedPlayers', {});
			this.set('requiredPlayers', {});
			this.set('requiredQB1', null);
			this.set('requiredRB1', null);
			this.set('requiredRB2', null);
			this.set('requiredWR1', null);
			this.set('requiredWR2', null);
			this.set('requiredWR3', null);
			this.set('requiredTE1', null);
			this.set('requiredK1', null);
			this.set('requiredD1', null);
			this.clearSolution();
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
						if (player === this.get('solutionRB1')) {
							this.set('requiredRB1', player);
						} else if (player === this.get('solutionRB2')) {
							this.set('requiredRB2', player);
						}
						else if (!this.get('requiredRB1')) {
							this.set('requiredRB1', player);
						} else if (!this.get('requiredRB2')) {
							this.set('requiredRB2', player);
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
						if (player === this.get('solutionWR1')) {
							this.set('requiredWR1', player);
						} else if (player === this.get('solutionWR2')) {
							this.set('requiredWR2', player);
						} else if (player === this.get('solutionWR3')) {
							this.set('requiredWR3', player);
						} else if (!this.get('requiredWR1')) {
							this.set('requiredWR1', player);
						} else if (!this.get('requiredWR2')) {
							this.set('requiredWR2', player);
						} else if (!this.get('requiredWR3')) {
							this.set('requiredWR3', player);
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
				this.send('requirePlayer', player, false);

				if (player === this.get('solutionQB1')) {
					this.set('solutionQB1', null);
				} else if (player === this.get('solutionRB1')) {
					this.set('solutionRB1', null);
				} else if (player === this.get('solutionRB2')) {
					this.set('solutionRB2', null);
				} else if (player === this.get('solutionWR1')) {
					this.set('solutionWR1', null);
				} else if (player === this.get('solutionWR2')) {
					this.set('solutionWR2', null);
				} else if (player === this.get('solutionWR3')) {
					this.set('solutionWR3', null);
				} else if (player === this.get('solutionTE1')) {
					this.set('solutionTE1', null);
				} else if (player === this.get('solutionK1')) {
					this.set('solutionK1', null);
				} else if (player === this.get('solutionD1')) {
					this.set('solutionD1', null);
				}
			}
		},
		changeSelectFor(value) {
			this.set('selectFor', value);
		},
		changeStrategy(value) {
			this.set('strategy', value);
		},
		optimizeLineup(button) {
			// Finally the meat of the thing... solve optimal lineup
			this.set('isGenerating', true);
			this.$(button).blur();
			this.generateLineup();
			this.set('isGenerating', false);
		}
	},
	clearSolution() {
		this.set('solutionQB1', this.get('requiredQB1'));
		this.set('solutionRB1', this.get('requiredRB1'));
		this.set('solutionRB2', this.get('requiredRB2'));
		this.set('solutionWR1', this.get('requiredWR1'));
		this.set('solutionWR2', this.get('requiredWR2'));
		this.set('solutionWR3', this.get('requiredWR3'));
		this.set('solutionTE1', this.get('requiredTE1'));
		this.set('solutionK1', this.get('requiredK1'));
		this.set('solutionD1', this.get('requiredD1'));
	},
	generateLineup() {
		this.clearSolution();

		// Sort the pools by descending value
		this.set('poolSorting', [`${this.get('selectFor').replace('r', 'v')}:desc`]);

		// Run fillMax
		let success = this.fillMax();

		if (!success) {
			return alert('Could not find any valid lineup solutions! Requiring/excluding fewer players should fix this.');
		}

		// Sort the pools by descending profit
		this.set('poolSorting', [`${this.get('selectFor')}:desc`]);

		// Run subMax
		this.subMax();

		// The End!!!
	},
	fillMax() {

		// Check if we are over the salary cap; if we are, we need to make some efficient subs
		if (math.smallerEq(this.get('solutionRemainingSalary'), 0)) {
			return this.subMin();
		}

		// Before we do anything, we need to see if we have a complete solution
		if (this.get('solutionCount') === 9) {
			return true; // We return true to signal that a solution was found
		}

		let profitStat;
		if (this.get('strategy') === 'balanced') {
			profitStat = this.get('selectFor').replace('r', 'v');
		} else if (this.get('strategy') === 'sands') {
			profitStat = this.get('selectFor');
		}

		let temp = null;

		// Loop through each position
		PositionLoop:
		for (let i = 0, ilen = positions.length; i < ilen; i++) {

			// Skip filled positions
			if (this.get(`solution${positions[i]}`)) {
				continue PositionLoop;
			}

			// Start at the top and move down each position to find a valid addition
			let position = positions[i];

			PlayerLoop:
			for (let j = 0, jlen = this.get(`sortedPool${position}.length`); j < jlen; j++ ) {
				let potential = this.get(`sortedPool${position}`).objectAt(j);

				// Make sure the potential isn't excluded
				if (this.get(`excludedPlayers.${potential.get('id')}`)) {
					continue PlayerLoop;
				}

				// See if the potential would put us over the team cap
				let pTeam = potential.get('team');
				if (this.get(`solutionTeams.${pTeam}`) && math.largerEq(this.get(`solutionTeams.${pTeam}`), this.get('teamCap'))) {
					continue PlayerLoop;
				}

				// Special check for kickers
				if (position === 'K1' && this.get('preventTeamK') && this.get('solutionQB1.team') === pTeam) {
					continue;
				} else if (position === 'QB1' && this.get('preventTeamK') && this.get('solutionK1.team') === pTeam) {
					continue PlayerLoop;
				}


				let pOpp = potential.get('opp');
				// Special check for defenses
				if (position === 'D1' && this.get('preventOppD')) {
					if (this.get('solutionQB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR3.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionTE1.team') === pOpp) {
						continue PlayerLoop;
					}
				} else if (this.get('preventOppD') && this.get('solutionD1.team') === pOpp) {
					continue PlayerLoop;
				}
				// CHANGE back to this to make an exception for kickers, and change below
				// } else if (position !== 'K1' && this.get('preventOppD') && this.get('solutionD1.team') === pOpp) {
				// 	continue PlayerLoop;
				// }

				// Now we can see if there is a temp solution, or if this player is better than the temp solution
				if (!temp || math.larger(potential.get(`${profitStat}`), temp.player.get(`${profitStat}`))) {
					temp = { position: position, player:potential };
				}
			} // -- End of PlayerLoop

		} // -- End of PositionLoop

		if (temp) {
			this.set(`solution${temp.position}`, temp.player);
			return this.fillMax();
		} else {
			return false; // Return false to signal that no solution could be found
		}

	},
	subMin() {

		let profitStat;
		if (this.get('strategy') === 'balanced') {
			profitStat = this.get('selectFor').replace('r', 'v');
		} else if (this.get('strategy') === 'sands') {
			profitStat = this.get('selectFor');
		}
		
		let temp = null;

		// Loop through each position
		PositionLoop:
		for (let i = 0, ilen = positions.length; i < ilen; i++) {

			// Skip unfilled positions
			if (!this.get(`solution${positions[i]}`)) {
				continue PositionLoop;
			}

			// Start at the top and move down each position to find a valid addition
			let position = positions[i];

			PlayerLoop:
			for (let j = 0, jlen = this.get(`sortedPool${position}.length`); j < jlen; j++ ) {
				let potential = this.get(`sortedPool${position}`).objectAt(j);

				// Make sure the potential isn't excluded
				if (this.get(`excludedPlayers.${potential.get('id')}`)) {
					continue PlayerLoop;
				}

				// // See if potential is less expensive than the solution
				if (!math.smaller(potential.get('salary'), this.get(`solution${positions[i]}.salary`))) {
					continue PlayerLoop;
				}

				// See if the potential would put us over the team cap
				let pTeam = potential.get('team');
				if (this.get(`solutionTeams.${pTeam}`) && math.largerEq(this.get(`solutionTeams.${pTeam}`), this.get('teamCap'))) {
					continue PlayerLoop;
				}

				// Special check for kickers
				if (position === 'K1' && this.get('preventTeamK') && this.get('solutionQB1.team') === pTeam) {
					continue;
				} else if (position === 'QB1' && this.get('preventTeamK') && this.get('solutionK1.team') === pTeam) {
					continue PlayerLoop;
				}


				let pOpp = potential.get('opp');
				// Special check for defenses
				if (position === 'D1' && this.get('preventOppD')) {
					if (this.get('solutionQB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR3.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionTE1.team') === pOpp) {
						continue PlayerLoop;
					}
				} else if (this.get('preventOppD') && this.get('solutionD1.team') === pOpp) {
					continue PlayerLoop;
				}

				// We need to look for relative value--who would lose the least profit
				let lostProfit = this.get(`solution${positions[i]}.${profitStat}`) - potential.get(`${profitStat}`);

				// Now we can see if there is a temp solution, or if this player is better than the temp solution
				if (!temp || math.smaller(lostProfit, temp.lostProfit)) {
					temp = { position: position, lostProfit: lostProfit, player:potential };
				} else if (math.equal(lostProfit, temp.lostProfit) && math.smaller(potential.get('salary'), this.get(`solution${positions[i]}.salary`))) {
					temp = { position: position, lostProfit: lostProfit, player:potential };
				}
			} // -- End of PlayerLoop

		} // -- End of PositionLoop

		if (temp) {
			this.set(`solution${temp.position}`, temp.player);
			return this.fillMax();
		} else {
			return false; // Return false to signal that no solution could be found
		}
	},
	subMax() {
		let profitStat = this.get('selectFor');

		let temp = null;

		// Loop through each position
		PositionLoop:
		for (let i = 0, ilen = positions.length; i < ilen; i++) {

			// Start at the top and move down each position to find a valid substitution
			let position = positions[i];

			PlayerLoop:
			for (let j = 0, jlen = this.get(`sortedPool${position}.length`); j < jlen; j++ ) {

				let potential = this.get(`sortedPool${position}`).objectAt(j);

				// Make sure the potential isn't excluded
				if (this.get(`excludedPlayers.${potential.get('id')}`)) {
					continue PlayerLoop;
				}

				// Don't sub yourself, that's recursive!!! And rude.
				if (potential === this.get(`solution${position}`)) {
					continue PositionLoop; // Once we get to the current solution, everyone below is worse
				}

				// The solution salary minus the current solution at the position
				let tempSalaryRemaining = this.get('solutionRemainingSalary') + this.get(`solution${position}.salary`);

				// See if potential would put us over the team or salary cap
				if (math.larger(potential.get('salary'), tempSalaryRemaining)) {
					continue PlayerLoop;
				}

				// See if the potential would put us over the team cap
				let pTeam = potential.get('team');
				if (this.get(`solutionTeams.${pTeam}`) && this.get(`solution${position}.team`) !== potential.get('team') && math.largerEq(this.get(`solutionTeams.${pTeam}`), this.get('teamCap'))) {
					continue PlayerLoop;
				}

				// Special check for kickers
				if (position === 'K1' && this.get('preventTeamK') && this.get('solutionQB1.team') === pTeam) {
					continue;
				} else if (position === 'QB1' && this.get('preventTeamK') && this.get('solutionK1.team') === pTeam) {
					continue PlayerLoop;
				}

				let pOpp = potential.get('opp');
				// Special check for defenses
				if (position === 'D1' && this.get('preventOppD')) {
					if (this.get('solutionQB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionRB2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR1.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR2.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionWR3.team') === pOpp) {
						continue PlayerLoop;
					}
					if (this.get('solutionTE1.team') === pOpp) {
						continue PlayerLoop;
					}
				} else if (this.get('preventOppD') && this.get('solutionD1.team') === pOpp) {
					continue PlayerLoop;
				}

				// Now we can see if there is a temp solution, or if this player is better than the temp solution
				if (!temp || math.larger(potential.get(`${profitStat}`), temp.player.get(`${profitStat}`))) {
					temp = { position: position, player: potential };
				}
			} // -- End of PlayerLoop

		} // -- End of PositionLoop

		if (temp) {
			this.set(`solution${temp.position}`, temp.player);
			return this.subMax();
		} else {
			return false; // Return false to signal that no better solution was found
		}

	}
});



NflFdOptimizer.reopenClass({
	positionalParams: ['contest']
});

export default NflFdOptimizer;
