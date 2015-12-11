import Ember from 'ember';

const teamFullNames = {
	'SA': 'San Antonio Spurs',
	'TOR': 'Toronto Raptors',
	'MEM': 'Memphis Grizzlies',
	'DET': 'Detriot Pistons'
};

const fullPositions = {
	'PG': 'Point Guard',
	'SG': 'Shooting Guard',
	'SF': 'Small Forward',
	'PF': 'Power Forward',
	'C': 'Center'
};

const labels = ['Minutes', 'FG3', 'FG2', 'FT', 'Assists', 'DRB', 'ORB', 'BLK', 'STL', 'T/O'];

const logkeys = ['minutes', 'fg3', 'fg2', 'ft', 'assist', 'drb', 'orb', 'blk', 'stl', 'turnovers'];

const NbaPlayerComponent = Ember.Component.extend({
	didInsertElement() {
		let ctx = this.$('.ratingsChart').get(0).getContext('2d');
		let data = {
  		labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'],
	    datasets: [
        {
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [this.get('player.ratings.r10'), this.get('player.ratings.r20'), this.get('player.ratings.r30'), this.get('player.ratings.r40'), this.get('player.ratings.r50'), this.get('player.ratings.r60'), this.get('player.ratings.r70'), this.get('player.ratings.r80'), this.get('player.ratings.r90')]
        }
	    ]
		};
		let options = {
			// Boolean - whether or not the chart should be responsive and resize when the browser does.
			responsive: true,

			// Boolean - If we want to override with a hard coded scale
	    scaleOverride: true,

	    // ** Required if scaleOverride is true **
	    // Number - The number of steps in a hard coded scale
	    scaleSteps: 5,
	    // Number - The value jump in the hard coded scale
	    scaleStepWidth: 20,
	    // Number - The scale starting value
	    scaleStartValue: 0,

			// Number - Pixel offset from point x to tooltip edge
			tooltipXOffset: 15,

			//Boolean - Whether the line is curved between points
			bezierCurve : false,

	    // //Number - Tension of the bezier curve between points
    	// bezierCurveTension : 0.1,

    	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    	pointHitDetectionRadius : 5,
		};
		let rchart = new Chart(ctx).Line(data, options);
	},
	fullName: Ember.computed('player', function() {
		return `${this.get('player.firstName')} ${this.get('player.lastName')}`;
	}),
	position: Ember.computed('player.position', function() {
		return fullPositions[this.get('player.position')];
	}),
	team: Ember.computed('player', function() {
		return teamFullNames[this.get('player.team')];
	}),
	logs: Ember.computed('player.site', 'stats.gamelogs.[]', function() {
		if (!this.get('stats.gamelogs.length')) {
			return null;
		} else {
			return this.get('stats.gamelogs').map((glog) => {
				let r = [];

				r.pushObject(glog.date);
				r.pushObject(glog.tm);
				r.pushObject(glog.loc);
				r.pushObject(glog.opp);
				r.pushObject(glog.start);

				for (let i = 0, len = logkeys.length; i < len; i++) {
					r.pushObject(glog[logkeys[i]]);
				}

				r.pushObject( (this.get('player.site') === 'fanduel' && glog.fdPts) || (this.get('player.site') === 'draftkings' && glog.dkPts));

				return r;
			});
		}
	}),
	means: Ember.computed('stats.gamelogs.[]', function() {
		if (!this.get('stats.gamelogs.length')) {
			return null;
		} else {

			let r = [];
			let numGames = this.get('stats.gamelogs.length');

			for (let i = 0, len = logkeys.length; i < len; i++) {
				let stat = logkeys[i];
				let statArray = [];
				for (let j = 0; j < numGames; j++) {
					let gamelog = this.get('stats.gamelogs').objectAt(j);
					statArray.push(gamelog[stat]);
				}
				let statValue;
				if (statArray == null || numGames === 0) {
					statValue = '-';
				} else if (stat.indexOf('Per') === -1) {
					statValue = math.round(math.sum(statArray)/numGames, 1);
				} else {
					statValue = math.round(math.sum(statArray)/numGames, 2);
				}
				r.pushObject(statValue);
			}
			return r;
		}
	}),
	medians: Ember.computed('player.position', 'stats.totals', function() {
		if (!this.get('stats.gamelogs.length')) {
			return null;
		} else {

			let r = [];
			let numGames = this.get('stats.gamelogs.length');

			for (let i = 0, len = logkeys.length; i < len; i++) {
				let stat = logkeys[i];
				let statArray = [];
				for (let j = 0; j < numGames; j++) {
					let gamelog = this.get('stats.gamelogs').objectAt(j);
					statArray.push(gamelog[stat]);
				}
				let statValue;
				if (statArray == null || numGames === 0) {
					statValue = '-';
				} else if (stat.indexOf('Per') === -1) {
					statValue = math.round(math.quantileSeq(statArray, 0.5), 1);
				} else {
					statValue = math.round(math.quantileSeq(statArray, 0.5), 2);
				}
				r.pushObject(statValue);
			}
			return r;
		}
	}),
	labels: labels,
	date: Ember.computed('player.proto.startTime', function() {
		return moment(this.get('player.proto.startTime')).format('ddd MMM DD, YYYY');
	})
});

NbaPlayerComponent.reopenClass({
	positionalParams: ['player', 'stats']
});

export default NbaPlayerComponent;
