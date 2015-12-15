import Ember from 'ember';

const positions = ['PG1', 'PG2', 'SG1', 'SG2', 'SF1', 'SF2', 'PF1', 'PF2', 'C1'];

const NbaFdOptimizer = Ember.Component.extend({
	init() {
		this._super(...arguments);

		this.send('resetDefaults');
	},
	// rC -- passed to child componenents for display purposes
	rCSampleChanged: Ember.on('init', Ember.observer('rCSample', function() {
		let s = this.get('rCSample');
		this.get('players').setEach('rCSample', s);
	})),
	rCFSampleChanged: Ember.on('init', Ember.observer('rCFSample', function() {
		let s = this.get('rCFSample');
		this.get('players').setEach('rCFSample', s);
	})),
	rCCSampleChanged: Ember.on('init', Ember.observer('rCCSample', function() {
		let s = this.get('rCCSample');
		this.get('players').setEach('rCCSample', s);
	})),

	isBacktested: Ember.computed('players.@each.actual', function() {
		return !this.get('players').isEvery('actual', false);
	}),

	players: Ember.computed('contest.matchups.@each.aPG', 'contest.matchups.@each.hPG', 'contest.matchups.@each.aSG', 'contest.matchups.@each.hSG', 'contest.matchups.@each.aSF', 'contest.matchups.@each.hSF', 'contest.matchups.@each.aC', 'contest.matchups.@each.hC', function() {
		return this.get('contest.matchups').reduce(function(acc, item) {
			acc.push(item.get('aPG'), item.get('hPG'), item.get('aSG'), item.get('hSG'), item.get('aSF'), item.get('hSF'), item.get('aPF'), item.get('hPF'), item.get('aC'), item.get('hC'));
			return acc;
		}, []).filter(function(item) {
			return item.get('salary') != null;
		});
	}),

	// Track players at each position
	poolPG: Ember.computed('players.[]', function() {
		return this.get('players').filter(function(item) {
			return item.get('position') === 'PG';
		});
	}),
	poolSG: Ember.computed('players.[]', function() {
		return this.get('players').filter(function(item) {
			return item.get('position') === 'SG';
		});
	}),
	poolSF: Ember.computed('players.[]', function() {
		return this.get('players').filter(function(item) {
			return item.get('position') === 'SF';
		});
	}),
	poolPF: Ember.computed('players.[]', function() {
		return this.get('players').filter(function(item) {
			return item.get('position') === 'PF';
		});
	}),
	poolC: Ember.computed('players.[]', function() {
		return this.get('players').filter(function(item) {
			return item.get('position') === 'C';
		});
	}),

	// Track the pool at each contest position
	requiredPG1DidChange: Ember.on('init', Ember.observer('requiredPG1', function() {
		if (this.get('requiredPG1')) {
			this.set('solutionPG1', this.get('requiredPG1'));
		}
	})),
	poolPG1: Ember.computed('poolPG.[]', 'requiredPG1', 'solutionPG2', function() {
		if (this.get('requiredPG1')) {
			return [this.get('requiredPG1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolPG').filter((item) => {
				return item !== this.get('solutionPG2.[]');
			});
		}
	}),
	sortedPoolPG1: Ember.computed.sort('poolPG1', 'poolSorting'), 

	requiredPG2DidChange: Ember.on('init', Ember.observer('requiredPG2', function() {
		if (this.get('requiredPG2')) {
			this.set('solutionPG2', this.get('requiredPG2'));
		}
	})),
	poolPG2: Ember.computed('poolPG.[]', 'requiredPG2', 'solutionPG1', function() {
		if (this.get('requiredPG2')) {
			return [this.get('requiredPG2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolPG').filter((item) => {
				return item !== this.get('solutionPG1');
			});
		}
	}),
	sortedPoolPG2: Ember.computed.sort('poolPG2.[]', 'poolSorting'), 

	requiredSG1DidChange: Ember.on('init', Ember.observer('requiredSG1', function() {
		if (this.get('requiredSG1')) {
			this.set('solutionSG1', this.get('requiredSG1'));
		}
	})),
	poolSG1: Ember.computed('poolSG.[]', 'requiredSG1', 'solutionSG2', function() {
		if (this.get('requiredSG1')) {
			return [this.get('requiredSG1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolSG').filter((item) => {
				return item !== this.get('solutionSG2');
			});
		}
	}),
	sortedPoolSG1: Ember.computed.sort('poolSG1.[]', 'poolSorting'), 

	requiredSG2DidChange: Ember.on('init', Ember.observer('requiredSG2', function() {
		if (this.get('requiredSG2')) {
			this.set('solutionSG2', this.get('requiredSG2'));
		}
	})),
	poolSG2: Ember.computed('poolSG.[]', 'requiredSG2', 'solutionSG1', function() {
		if (this.get('requiredSG2')) {
			return [this.get('requiredSG2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolSG').filter((item) => {
				return item !== this.get('solutionSG1');
			});
		}
	}),
	sortedPoolSG2: Ember.computed.sort('poolSG2.[]', 'poolSorting'), 

	requiredSF1DidChange: Ember.on('init', Ember.observer('requiredSF1', function() {
		if (this.get('requiredSF1')) {
			this.set('solutionSF1', this.get('requiredSF1'));
		}
	})),
	poolSF1: Ember.computed('poolSF.[]', 'requiredSF1', 'solutionSF2', function() {
		if (this.get('requiredSF1')) {
			return [this.get('requiredSF1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolSF').filter((item) => {
				return item !== this.get('solutionSF2');
			});
		}
	}),
	sortedPoolSF1: Ember.computed.sort('poolSF1.[]', 'poolSorting'), 

	requiredSF2DidChange: Ember.on('init', Ember.observer('requiredSF2', function() {
		if (this.get('requiredSF2')) {
			this.set('solutionSF2', this.get('requiredSF2'));
		}
	})),
	poolSF2: Ember.computed('poolSF.[]', 'requiredSF2', 'solutionSF1', function() {
		if (this.get('requiredSF2')) {
			return [this.get('requiredSF2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolSF').filter((item) => {
				return item !== this.get('solutionSF1');
			});
		}
	}),
	sortedPoolSF2: Ember.computed.sort('poolSF2.[]', 'poolSorting'), 

	requiredPF1DidChange: Ember.on('init', Ember.observer('requiredPF1', function() {
		if (this.get('requiredPF1')) {
			this.set('solutionPF1', this.get('requiredPF1'));
		}
	})),
	poolPF1: Ember.computed('poolPF.[]', 'requiredPF1', 'solutionPF2', function() {
		if (this.get('requiredPF1')) {
			return [this.get('requiredPF1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolPF').filter((item) => {
				return item !== this.get('solutionPF2');
			});
		}
	}),
	sortedPoolPF1: Ember.computed.sort('poolPF1.[]', 'poolSorting'), 

	requiredPF2DidChange: Ember.on('init', Ember.observer('requiredPF2', function() {
		if (this.get('requiredPF2')) {
			this.set('solutionPF2', this.get('requiredPF2'));
		}
	})),
	poolPF2: Ember.computed('poolPF.[]', 'requiredPF2', 'solutionPF1', function() {
		if (this.get('requiredPF2')) {
			return [this.get('requiredPF2')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolPF').filter((item) => {
				return item !== this.get('solutionPF1');
			});
		}
	}),
	sortedPoolPF2: Ember.computed.sort('poolPF2.[]', 'poolSorting'), 

	requiredC1DidChange: Ember.on('init', Ember.observer('requiredC1', function() {
		if (this.get('requiredC1')) {				
			this.set('solutionC1', this.get('requiredC1'));
		}
	})),
	poolC1: Ember.computed('poolC.[]', 'requiredC1', function() {
		if (this.get('requiredC1')) {
			return [this.get('requiredC1')];	// If a player has been required at this position, then the pool is only that player
		} else {	// The pool at this position is the pool at the real position, minus any sibling position solutions and excluded players
			return this.get('poolC');
		}
	}),
	sortedPoolC1: Ember.computed.sort('poolC1.[]', 'poolSorting'), 


	poolSorting: ['salary:desc'],
	pools: Ember.computed.collect('poolPG1', 'poolPG1', 'poolSG1', 'poolSG2', 'poolSF1', 'poolSF2', 'poolPF1', 'poolPF2', 'poolC1'),

	// Current solution sums
	solution: Ember.computed.collect('solutionPG1', 'solutionPG2', 'solutionSG1', 'solutionSG2', 'solutionSF1', 'solutionSF2', 'solutionPF1', 'solutionPF2', 'solutionC1'),
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
	solutionRMeans: Ember.computed.collect('solutionPG1.rMean', 'solutionPG2.rMean', 'solutionSG1.rMean', 'solutionSG2.rMean', 'solutionSF1.rMean', 'solutionSF2.rMean', 'solutionPF1.rMean', 'solutionPF2.rMean', 'solutionC1.rMean'),
 	solutionTotalRMean: Ember.computed.sum('solutionRMeans'),
 	solutionRWIs: Ember.computed.collect('solutionPG1.rWInt', 'solutionPG2.rWInt', 'solutionSG1.rWInt', 'solutionSG2.rWInt', 'solutionSF1.rWInt', 'solutionSF2.rWInt', 'solutionPF1.rWInt', 'solutionPF2.rWInt', 'solutionC1.rWInt'),
 	solutionTotalRWI: Ember.computed.sum('solutionRWIs'),
  solutionRCustoms: Ember.computed.collect('solutionPG1.rCustom', 'solutionPG2.rCustom', 'solutionSG1.rCustom', 'solutionSG2.rCustom', 'solutionSF1.rCustom', 'solutionSF2.rCustom', 'solutionPF1.rCustom', 'solutionPF2.rCustom', 'solutionC1.rCustom'),
 	solutionTotalRCustom: Ember.computed.sum('solutionRCustoms'),
 	solutionTotalActuals: Ember.computed.collect('solutionPG1.actual', 'solutionPG2.actual', 'solutionSG1.actual', 'solutionSG2.actual', 'solutionSF1.actual', 'solutionSF2.actual', 'solutionPF1.actual', 'solutionPF2.actual', 'solutionC1.actual'),
 	solutionTotalActual: Ember.computed.sum('solutionTotalActuals'),
	solutionSalaries: Ember.computed.collect('solutionPG1.salary', 'solutionPG2.salary', 'solutionSG1.salary', 'solutionSG2.salary', 'solutionSF1.salary', 'solutionSF2.salary', 'solutionPF1.salary', 'solutionPF2.salary', 'solutionC1.salary'),
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


 	// Formatting for lineup display
 	lineupGroup1: Ember.computed('solutionPG1', 'solutionPG2', 'solutionSG1', function() {
 		return [
 			{ label: 'PG', player: this.get('solutionPG1') },
 			{ label: 'PG', player: this.get('solutionPG2') },
 			{ label: 'SG', player: this.get('solutionSG1') }, 
 		];
 	}),
 	lineupGroup2: Ember.computed('solutionSG2', 'solutionSF1', 'solutionSF2', function() {
 		return [
 			{ label: 'SG', player: this.get('solutionSG2') },
 			{ label: 'SF', player: this.get('solutionSF1') },
 			{ label: 'SF', player: this.get('solutionSF2') }, 
 		];	
 	}),
 	lineupGroup3: Ember.computed('solutionPF1', 'solutionPF2', 'solutionC1', function() {
 		return [
 			{ label: 'PF', player: this.get('solutionPF1') },
 			{ label: 'PF', player: this.get('solutionPF2') },
 			{ label: 'C', player: this.get('solutionC1') }, 
 		];	 		
 	}),
 	lineupGroups: Ember.computed.collect('lineupGroup1', 'lineupGroup2', 'lineupGroup3'),

 	// Formatting for nfl-matchup components
	matchupsSorting: ['startTime'],
	sortedMatchups: Ember.computed.sort('contest.matchups', 'matchupsSorting'),
	matchupRows: Ember.computed('sortedMatchups.[]', function() {
		let matchups = this.get('sortedMatchups');
		let size = 2;
		let r = [];
		for (let i = 0, len = matchups.length; i < len; i += size) {
			r.push(matchups.slice(i, i + size));
		}
		return r;
	}),

	// Formatting for nfl-position components
	positionsGroup1: Ember.computed('poolPG.[]', 'poolSG.[]', 'poolSF.[]', function() {
		let r = [];
		r.push({ name: "Point Guards", list: this.get('poolPG') });
		r.push({ name: "Shooting Guards", list: this.get('poolSG') });
		r.push({ name: "Small Forwards", list: this.get('poolSF') });
		return r;
	}),
	positionsGroup2: Ember.computed('poolPF.[]', 'poolC.[]', function() {
		let r = [];
		r.push({ name: "Power Forwards", list: this.get('poolPF') });
		r.push({ name: "Centers", list: this.get('poolC') });
		return r;
	}),
	
	positionsGroups: Ember.computed.collect('positionsGroup1', 'positionsGroup2'),


	actions: {
		resetDefaults() {
			this.set('rCSample', 50);
			this.set('rCFSample', 20);
			this.set('rCCSample', 80);
			this.set('selectFor', 'rMean');
			this.set('strategy', 'balanced');
			this.set('salaryCap', 60000);
			this.set('teamCap', 4);
			if (this.$()) {
				this.$('input[name="selectFor"][value="rMean"]').prop('checked', true);	
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
			this.set('requiredPG1', null);
			this.set('requiredPG2', null);
			this.set('requiredSG1', null);
			this.set('requiredSG2', null);
			this.set('requiredSF1', null);
			this.set('requiredSF2', null);
			this.set('requiredPF1', null);
			this.set('requiredPF2', null);
			this.set('requiredC1', null);
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
				case 'PG':
					if (toggle) {
						if (player === this.get('solutionPG1')) {
							this.set('requiredPG1', player);
						} else if (player === this.get('solutionPG2')) {
							this.set('requiredPG2', player);
						}
						else if (!this.get('requiredPG1')) {
							this.set('requiredPG1', player);
						} else if (!this.get('requiredPG2')) {
							this.set('requiredPG2', player);
						}
					} else {
						if (player === this.get('requiredPG1')) {
							this.set('requiredPG1', null);
						} else if (player === this.get('requiredPG2')) {
							this.set('requiredPG2', null);
						}
					}
					// Set disabled state
					if (this.get('requiredPG1') && this.get('requiredPG2')) {
						this.set('disabledPositions.PG', true);
					} else {
						this.set('disabledPositions.PG', false);
					}  
					break;
				case 'SG':
					if (toggle) {
						if (player === this.get('solutionSG1')) {
							this.set('requiredSG1', player);
						} else if (player === this.get('solutionSG2')) {
							this.set('requiredSG2', player);
						}
						else if (!this.get('requiredSG1')) {
							this.set('requiredSG1', player);
						} else if (!this.get('requiredSG2')) {
							this.set('requiredSG2', player);
						}
					} else {
						if (player === this.get('requiredSG1')) {
							this.set('requiredSG1', null);
						} else if (player === this.get('requiredSG2')) {
							this.set('requiredSG2', null);
						}
					}
					// Set disabled state
					if (this.get('requiredSG1') && this.get('requiredSG2')) {
						this.set('disabledPositions.SG', true);
					} else {
						this.set('disabledPositions.SG', false);
					}  
					break;
				case 'SF':
					if (toggle) {
						if (player === this.get('solutionSF1')) {
							this.set('requiredSF1', player);
						} else if (player === this.get('solutionSF2')) {
							this.set('requiredSF2', player);
						}
						else if (!this.get('requiredSF1')) {
							this.set('requiredSF1', player);
						} else if (!this.get('requiredSF2')) {
							this.set('requiredSF2', player);
						}
					} else {
						if (player === this.get('requiredSF1')) {
							this.set('requiredSF1', null);
						} else if (player === this.get('requiredSF2')) {
							this.set('requiredSF2', null);
						}
					}
					// Set disabled state
					if (this.get('requiredSF1') && this.get('requiredSF2')) {
						this.set('disabledPositions.SF', true);
					} else {
						this.set('disabledPositions.SF', false);
					}  
					break;
				case 'PF':
					if (toggle) {
						if (player === this.get('solutionPF1')) {
							this.set('requiredPF1', player);
						} else if (player === this.get('solutionPF2')) {
							this.set('requiredPF2', player);
						}
						else if (!this.get('requiredPF1')) {
							this.set('requiredPF1', player);
						} else if (!this.get('requiredPF2')) {
							this.set('requiredPF2', player);
						}
					} else {
						if (player === this.get('requiredPF1')) {
							this.set('requiredPF1', null);
						} else if (player === this.get('requiredPF2')) {
							this.set('requiredPF2', null);
						}
					}
					// Set disabled state
					if (this.get('requiredPF1') && this.get('requiredPF2')) {
						this.set('disabledPositions.PF', true);
					} else {
						this.set('disabledPositions.PF', false);
					}  
					break;				
				case 'C':
					if (toggle) {
						if (!this.get('requiredC1')) {
							this.set('requiredC1', player);
						}
					} else {
						if (player === this.get('requiredC1')) {
							this.set('requiredC1', null);
						}
					} 
					// Set disabled state
					if (this.get('requiredC1')) {
						this.set('disabledPositions.C', true);
					} else {
						this.set('disabledPositions.C', false);
					}
					break;
			}
		},
		excludePlayer(player, toggle) {
			if (toggle) {
				this.send('requirePlayer', player, false);

				if (player === this.get('solutionPG1')) {
					this.set('solutionPG1', null);
				} else if (player === this.get('solutionPG2')) {
					this.set('solutionPG2', null);
				} else if (player === this.get('solutionSG1')) {
					this.set('solutionSG1', null);
				} else if (player === this.get('solutionSG2')) {
					this.set('solutionSG2', null);
				} else if (player === this.get('solutionSF1')) {
					this.set('solutionSF1', null);
				} else if (player === this.get('solutionSF2')) {
					this.set('solutionSF2', null);
				} else if (player === this.get('solutionPF1')) {
					this.set('solutionPF1', null);
				} else if (player === this.get('solutionPF2')) {
					this.set('solutionPF2', null);
				} else if (player === this.get('solutionC1')) {
					this.set('solutionC1', null);
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
		this.set('solutionPG1', this.get('requiredPG1'));
		this.set('solutionPG2', this.get('requiredPG2'));
		this.set('solutionSG1', this.get('requiredSG1'));
		this.set('solutionSG2', this.get('requiredSG2'));
		this.set('solutionSF1', this.get('requiredSF1'));
		this.set('solutionSF2', this.get('requiredSF2'));
		this.set('solutionPF1', this.get('requiredPF1'));
		this.set('solutionPF2', this.get('requiredPF2'));
		this.set('solutionC1', this.get('requiredC1'));
	},
	generateLineup() {
		this.clearSolution();

		// Sort the pools by descending value
		if (this.get('strategy') === 'balanced') {
			this.set('poolSorting', [`${this.get('selectFor').replace('r', 'v')}:desc`]);
		} else if (this.get('strategy') === 'sands') {
			this.set('poolSorting', [`${this.get('selectFor')}:desc`]);
		}

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

				// Now we can see if there is a temp solution, or if this player is better than the temp solution
				if (!temp || math.larger(potential.get(`${profitStat}`), temp.player.get(`${profitStat}`))) {
					temp = { position: position, player: potential };
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



NbaFdOptimizer.reopenClass({
	positionalParams: ['contest']
});

export default NbaFdOptimizer;
