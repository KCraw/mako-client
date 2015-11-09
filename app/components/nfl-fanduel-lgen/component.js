import Ember from 'ember';

const NFLFanduelLgenComponent = Ember.Component.extend({
	poolQB1: Ember.computed('players', 'players.@each.isExcluded', 'solutionQB', function() {
		if (this.get('solutionQB')) {
			return [this.get('solutionQB')];
		} else {
			return this.get('players').filter((player) => {
				return player.get('position') === 'QB' && !player.get('isExcluded');
			});
		}
	}),
	solutionQB1: null,
	requiredQB1: null,
	poolQB: Ember.computed.filterBy('players', 'position', 'QB'),
	// This is how we deal with required players
	poolQBChanged: Ember.on('init', Ember.observer('poolQB.[]', function() {
		this.get('poolQB').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredQB1')) {
						if (!this.get('requiredQB1')) {
							this.set('requiredQB1', sender);
						} 
					}
				} else if (sender === this.get('requiredQB1')) { 			// If the change was unrequiring the player 
					this.set('requiredQB1', null);
				} 

				// THERE CAN BE ONLY ONE!!!!
				if (this.get('requiredQB1')) {
					this.get('poolQB').forEach((other) => {
						if (other !== this.get('requiredQB1')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolQB').forEach((other) => {
						if (other !== this.get('requiredQB1')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionQB1', this.get('requiredQB1'));
			});
		});
	})),


	poolRB1: Ember.computed('players', 'players.@each.isExcluded', 'solutionRB1', 'solutionRB2', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'RB' && !player.get('isExcluded') && player !== this.get('solutionRB2');
		});
	}),
	solutionRB1: null,
	requiredRB1: null,
	poolRB2: Ember.computed('players', 'players.@each.isExcluded', 'solutionRB1', 'solutionRB2', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'RB' && !player.get('isExcluded') && player !== this.get('solutionRB1');
		});
	}),
	solutionRB2: null,
	requiredRB2: null,
	poolRB: Ember.computed.filterBy('players', 'position', 'RB'),
	// This is how we deal with required players
	poolRBChanged: Ember.on('init', Ember.observer('poolRB.[]', function() {
		this.get('poolRB').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredRB1') && sender !== this.get('requiredRB2')) {
						if (!this.get('requiredRB1')) {
							this.set('requiredRB1', sender);
						} 
						else if (!this.get('requiredRB2')) {
							this.set('requiredRB2', sender);
						} 
					}
				} else if (sender === this.get('requiredRB1')) { 			// If the change was unrequiring the player 
					this.set('requiredRB1', null);
				} else if (sender === this.get('requiredRB2')) {
					this.set('requiredRB2', null);
				}

				// THERE CAN BE ONLY... two????
				if (this.get('requiredRB1') && this.get('requiredRB2')) {
					this.get('poolRB').forEach((other) => {
						if (other !== this.get('requiredRB1') && other !== this.get('requiredRB2')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolRB').forEach((other) => {
						if (other !== this.get('requiredRB1') && other !== this.get('requiredRB2')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionRB1', this.get('requiredRB1'));
				this.set('solutionRB2', this.get('requiredRB2'));
			});
		});
	})),

	poolWR1: Ember.computed('players', 'players.@each.isExcluded', 'solutionWR2', 'solutionWR3', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'WR' && !player.get('isExcluded') && player !== this.get('solutionWR2') && player !== this.get('solutionWR3');
		});
	}),
	solutionWR1: null,
	requiredWR1: null,
	poolWR2: Ember.computed('players', 'players.@each.isExcluded', 'solutionWR1', 'solutionWR3', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'WR' && !player.get('isExcluded') && player !== this.get('solutionWR1') && player !== this.get('solutionWR3');
		});		
	}),
	solutionWR2: null,
	requiredWR2: null,
	poolWR3: Ember.computed('players', 'players.@each.isExcluded', 'solutionWR1', 'solutionWR2', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'WR' && !player.get('isExcluded') && player !== this.get('solutionWR1') && player !== this.get('solutionWR2');
		});		
	}),
	solutionWR3: null,
	requiredWR3: null,
	poolWR: Ember.computed.filterBy('players', 'position', 'WR'),
	// This is how we deal with required players
	poolWRChanged: Ember.on('init', Ember.observer('poolWR.[]', function() {
		this.get('poolWR').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredWR1') && sender !== this.get('requiredWR2') && sender !== this.get('requiredWR3')) {
						if (!this.get('requiredWR1')) {
							this.set('requiredWR1', sender);
						} 
						else if (!this.get('requiredWR2')) {
							this.set('requiredWR2', sender);
						} 
						else if (!this.get('requiredWR3')) {
							this.set('requiredWR3', sender);
						} 
					}
				} else if (sender === this.get('requiredWR1')) { 			// If the change was unrequiring the player 
					this.set('requiredWR1', null);
				} else if (sender === this.get('requiredWR2')) {
					this.set('requiredWR2', null);
				} else if (sender === this.get('requiredWR3')) {
					this.set('requiredWR3', null);
				}

				// THERE CAN BE ONLY... menage a trois????
				if (this.get('requiredWR1') && this.get('requiredWR2') && this.get('requiredWR3')) {
					this.get('poolWR').forEach((other) => {
						if (other !== this.get('requiredWR1') && other !== this.get('requiredWR2') && other !== this.get('requiredWR3')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolWR').forEach((other) => {
						if (other !== this.get('requiredWR1') && other !== this.get('requiredWR2') && other !== this.get('requiredWR3')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionWR1', this.get('requiredWR1'));
				this.set('solutionWR2', this.get('requiredWR2'));
				this.set('solutionWR3', this.get('requiredWR3'));
			});
		});
	})),

	poolTE1: Ember.computed('players', 'players.@each.isExcluded', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'TE' && !player.get('isExcluded');
		});		
	}),
	solutionTE1: null,
	requiredTE1: null,
	poolTE: Ember.computed.filterBy('players', 'position', 'TE'),
	// This is how we deal with required players
	poolTEChanged: Ember.on('init', Ember.observer('poolTE.[]', function() {
		this.get('poolTE').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredTE1')) {
						if (!this.get('requiredTE1')) {
							this.set('requiredTE1', sender);
						} 
					}
				} else if (sender === this.get('requiredTE1')) { 			// If the change was unrequiring the player 
					this.set('requiredTE1', null);
				} 

				// THERE CAN BE ONLY ONE!!!!
				if (this.get('requiredTE1')) {
					this.get('poolTE').forEach((other) => {
						if (other !== this.get('requiredTE1')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolTE').forEach((other) => {
						if (other !== this.get('requiredTE1')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionTE1', this.get('requiredTE1'));
			});
		});
	})),

	poolK1: Ember.computed('players', 'players.@each.isExcluded', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'K' && !player.get('isExcluded');
		});			
	}),
	solutionK1: null,
	requiredK1: null,
	poolK: Ember.computed.filterBy('players', 'position', 'K'),
	// This is how we deal with required players
	poolKChanged: Ember.on('init', Ember.observer('poolK.[]', function() {
		this.get('poolK').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredK1')) {
						if (!this.get('requiredK1')) {
							this.set('requiredK1', sender);
						} 
					}
				} else if (sender === this.get('requiredK1')) { 			// If the change was unrequiring the player 
					this.set('requiredK1', null);
				} 

				// THERE CAN BE ONLY ONE!!!!
				if (this.get('requiredK1')) {
					this.get('poolK').forEach((other) => {
						if (other !== this.get('requiredK1')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolK').forEach((other) => {
						if (other !== this.get('requiredK1')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionK1', this.get('requiredK1'));
			});
		});
	})),

	poolD1: Ember.computed('players', 'players.@each.isExcluded', function(player, index, players) {
		return this.get('players').filter((player) => {
			return player.get('position') === 'D' && !player.get('isExcluded');
		});	
	}),
	solutionD1: null,
	requiredD1: null,
	poolD: Ember.computed.filterBy('players', 'position', 'D'),
	// This is how we deal with required players
	poolDChanged: Ember.on('init', Ember.observer('poolD.[]', function() {
		this.get('poolD').forEach((player) => {
			player.addObserver('isRequired', player, (sender, key, value, rev) => {
				// If the change was requiring the player
				if (sender.get('isRequired')) {
					// Make sure player isn't already in the list... that would be embarrassing
					if (sender !== this.get('requiredD1')) {
						if (!this.get('requiredD1')) {
							this.set('requiredD1', sender);
						} 
					}
				} else if (sender === this.get('requiredD1')) { 			// If the change was unrequiring the player 
					this.set('requiredD1', null);
				} 

				// THERE CAN BE ONLY ONE!!!!
				if (this.get('requiredD1')) {
					this.get('poolD').forEach((other) => {
						if (other !== this.get('requiredD1')) {
							other.set('isDisabled', true);
						}
					});
				} else {
					this.get('poolD').forEach((other) => {
						if (other !== this.get('requiredD1')) {
							other.set('isDisabled', false);
						}
					});
				}
				this.set('solutionD1', this.get('requiredD1'));
			});
		});
	})),
 	solutionRatings: Ember.computed.collect('solutionQB1.rating', 'solutionRB1.rating', 'solutionRB2.rating', 'solutionWR1.rating', 'solutionWR2.rating', 'solutionWR3.rating', 'solutionTE1.rating', 'solutionK1.rating', 'solutionD1.rating'),
 	solutionTotalRating: Ember.computed.sum('solutionRatings'),
 	solutionRatingsMinus: Ember.computed.collect('solutionQB1.ratingMinus', 'solutionRB1.ratingMinus', 'solutionRB2.ratingMinus', 'solutionWR1.ratingMinus', 'solutionWR2.ratingMinus', 'solutionWR3.ratingMinus', 'solutionTE1.ratingMinus', 'solutionK1.ratingMinus', 'solutionD1.ratingMinus'),
 	solutionTotalRatingMinus: Ember.computed.sum('solutionRatingsMinus'),
  solutionRatingsPlus: Ember.computed.collect('solutionQB1.ratingPlus', 'solutionRB1.ratingPlus', 'solutionRB2.ratingPlus', 'solutionWR1.ratingPlus', 'solutionWR2.ratingPlus', 'solutionWR3.ratingPlus', 'solutionTE1.ratingPlus', 'solutionK1.ratingPlus', 'solutionD1.ratingPlus'),
 	solutionTotalRatingPlus: Ember.computed.sum('solutionRatingsPlus'),
 	solutionTotalActual: Ember.computed('solutionQB1.actual', 'solutionRB1.actual', 'solutionRB2.actual', 'solutionWR1.actual', 'solutionWR2.actual', 'solutionWR3.actual', 'solutionTE1.actual', 'solutionK1.actual', 'solutionD1.actual', function() {
 		let r = 0;
 		if (this.get('solutionQB1')) {
 			if (this.get('solutionQB1.actual') !== '?') {
 				r += this.get('solutionQB1.actual');
 			}
 		}
 		if (this.get('solutionRB1')) {
 			if (this.get('solutionRB1.actual') !== '?') {
 				r += this.get('solutionRB1.actual');
 			}
 		}
 		if (this.get('solutionRB2')) {
 			if (this.get('solutionRB2.actual') !== '?') {
 				r += this.get('solutionRB2.actual');
 			}
 		}
 		if (this.get('solutionWR1')) {
 			if (this.get('solutionWR1.actual') !== '?') {
 				r += this.get('solutionWR1.actual');
 			}
 		}
 		if (this.get('solutionWR2')) {
 			if (this.get('solutionWR2.actual') !== '?') {
 				r += this.get('solutionWR2.actual');
 			}
 		}
 		if (this.get('solutionWR3')) {
 			if (this.get('solutionWR3.actual') !== '?') {
 				r += this.get('solutionWR3.actual');
 			}
 		}
 		if (this.get('solutionTE1')) {
 			if (this.get('solutionTE1.actual') !== '?') {
 				r += this.get('solutionTE1.actual');
 			}
 		}
 		if (this.get('solutionK1')) {
 			if (this.get('solutionK1.actual') !== '?') {
 				r += this.get('solutionK1.actual');
 			}
 		}
 		if (this.get('solutionD1')) {
 			if (this.get('solutionD1.actual') !== '?') {
 				r += this.get('solutionD1.actual');
 			}
 		}
 		return Math.round(r, 2);
 	}),		
 	solutionSalaries: Ember.computed.collect('solutionQB1.salary', 'solutionRB1.salary', 'solutionRB2.salary', 'solutionWR1.salary', 'solutionWR2.salary', 'solutionWR3.salary', 'solutionTE1.salary', 'solutionK1.salary', 'solutionD1.salary'),
 	solutionTotalSalary: Ember.computed.sum('solutionSalaries'),
 	solutionRemainingSalary: Ember.computed('solutionTotalSalary', function() {
 		return 60000 - this.get('solutionTotalSalary');
 	}),
 	solutionCount: Ember.computed('solutionQB1', 'solutionRB1', 'solutionRB2', 'solutionWR1', 'solutionWR2', 'solutionWR3', 'solutionTE1', 'solutionK1', 'solutionD1', function() {
 		let r = 0;
 		if (this.get('solutionQB1')) {
 			r++;
 		}
 		if (this.get('solutionRB1')) {
 			r++;
 		}
 		if (this.get('solutionRB2')) {
 			r++;
 		}
 		if (this.get('solutionWR1')) {
 			r++;
 		}
 		if (this.get('solutionWR2')) {
 			r++;
 		}
 		if (this.get('solutionWR3')) {
 			r++;
 		}
 		if (this.get('solutionTE1')) {
 			r++;
 		}
 		if (this.get('solutionK1')) {
 			r++;
 		}
 		if (this.get('solutionD1')) {
 			r++;
 		}
 		return r;
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
	actions: {
		solve() {
			// This is the meat of the thing... generate an optimal lineup based on player pools
		}
	}
});

NFLFanduelLgenComponent.reopenClass({
	positionalParams: ['players']
});

export default NFLFanduelLgenComponent;