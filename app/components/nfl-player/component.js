import Ember from 'ember';

const teamFullNames = {
	'TB': 'Tampa Bay Buccaneers',
	'ATL': 'Atlanta Falcons',
	'SD': 'San Diego Chargers',
	'BAL': 'Baltimore Ravens',
	'MIN': 'Minnesota Vikings',
	'CHI': 'Chicago Bears',
	'ARI': 'Arizona Cardinals',
	'CLE': 'Cleveland Browns',
	'TEN': 'Tennessee Titans',
	'HOU': 'Houston Texans',
	'NYG': 'New York Giants',
	'NO': 'New Orleans Saints',
	'CIN': 'Cincinnati Bengals',
	'PIT': 'Pittsburgh Steelers',
	'SF': 'San Francisco 49ers',
	'STL': 'St. Louis Rams',
	'NE': 'New England Patriots',
	'NYJ': 'New York Jets',
	'BUF': 'Buffalo Bills',
	'MIA': 'Miami Dolphins',
	'IND': 'Indianapolis Colts',
	'JAX': 'Jacksonville Jaguars',
	'JAC': 'Jacksonville Jaguars',
	'DEN': 'Denver Broncos',
	'OAK': 'Oakland Raiders',
	'KC': 'Kansas City Chiefs',
	'WAS': 'Washington Redskins',
	'PHI': 'Philadelphia Eagles',
	'DAL': 'Dallas Cowboys',
	'GB': 'Green Bay Packers',
	'DET': 'Detroit Lions',
	'CAR': 'Carolina Panthers',
	'SEA': 'Seattle Seahawks'
};

const fullPositions = {
	'QB': 'Quarterback',
	'WR': 'Wide Receiver',
	'RB': 'Runningback',
	'TE': 'Tight End',
	'K': 'Kicker',
	'D': 'Defense'
};

const labels = {
	'QB': ['Pass Att', 'Pass Cmp', 'Pass Cmp %', 'Pass Int', 'Pass Int %', 'Pass Yds', 'Pass Y/A', 'Pass Y/C', 'Pass TD', 'Pass TD/A', 'Pass TD/C', 'Rush Att', 'Rush Yds', 'Rush Y/A', 'Rush TD', 'Rush TD/A'],
	'WR': ['Pass Tgt', 'Pass Rec', 'Pass Rec %', 'Pass Yds', 'Pass Y/T', 'Pass Y/R', 'Pass TD', 'Pass TD/T', 'Pass TD/R'],
	'RB': ['Rush Att', 'Rush Yds', 'Rush Y/A', 'Rush TD', 'Rush TD/A', 'Pass Tgt', 'Pass Rec', 'Pass Rec %', 'Pass Yds', 'Pass Y/T', 'Pass Y/R', 'Pass TD', 'Pass TD/T', 'Pass TD/R'],
	'TE': ['Pass Tgt', 'Pass Rec', 'Pass Rec %', 'Pass Yds', 'Pass Y/T', 'Pass Y/R', 'Pass TD', 'Pass TD/T', 'Pass TD/R'],
	'K': ['XPM', 'XPA', 'XP %', 'FGM', 'FGA', 'FG %'],
	'D': ['Pass Att', 'Pass Cmp', 'Pass Cmp %', 'Pass Sack', 'Pass Sack %', 'Pass Int', 'Pass Int %', 'Pass Yds', 'Pass Y/A', 'Pass Y/C', 'Pass TD', 'Pass TD/A', 'Pass TD/C', 'Rush Att', 'Rush Yds', 'Rush Y/A', 'Rush TD', 'Rush TD/A', 'Fumbles Rec\'d', 'XPM', 'XPA', 'XP %', 'FGM', 'FGA', 'FG %']
};

const logkeys = {
	'QB': ['passAtt', 'passCmp', 'passCmpPer', 'passInt', 'passIntPerAtt', 'passYds', 'passYdsPerAtt', 'passYdsPerCmp', 'passTD', 'passTDPerAtt', 'passTDPerCmp', 'rushAtt', 'rushYds', 'rushYdsPerAtt', 'rushTD', 'rushTDPerAtt'],
	'WR': ['passTgt', 'passRec', 'passRecPer', 'passYds', 'passYdsPerTgt', 'passYdsPerRec', 'passTD', 'passTDPerTgt', 'passTDPerRec'],
	'RB': ['rushAtt', 'rushYds', 'rushYdsPerAtt', 'rushTD', 'rushTDPerAtt', 'passTgt', 'passRec', 'passRecPer', 'passYds', 'passYdsPerTgt', 'passYdsPerRec', 'passTD', 'passTDPerTgt', 'passTDPerRec'],
	'TE': ['passTgt', 'passRec', 'passRecPer', 'passYds', 'passYdsPerTgt', 'passYdsPerRec', 'passTD', 'passTDPerTgt', 'passTDPerRec'],
	'K': ['XPM', 'XPA', 'XPMPer', 'FGM', 'FGA', 'FGMPer'],
	'D': ['passAtt', 'passCmp', 'passCmpPer', 'passSack', 'passSackPer', 'passInt', 'passIntPerAtt', 'passYds', 'passYdsPerAtt', 'passYdsPerCmp', 'passTD', 'passTDPerAtt', 'passTDPerCmp', 'rushAtt', 'rushYds', 'rushYdsPerAtt', 'rushTD', 'rushTDPerAtt', 'fumRec', 'XPM', 'XPA', 'XPMPer', 'FGM', 'FGA', 'FGMPer']
};

const NflPlayerComponent = Ember.Component.extend({
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
	    scaleSteps: 6,
	    // Number - The value jump in the hard coded scale
	    scaleStepWidth: 10,
	    // Number - The scale starting value
	    scaleStartValue: -10,

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
	logs: Ember.computed('player.site', 'player.position', 'stats.gamelogs', 'stats.fantasylogs', function() {
		if (!this.get('stats.gamelogs.length')) {
			return null;
		} else {
			return this.get('stats.gamelogs').map((glog) => {
				let r = [];

				r.pushObject(glog.date);
				r.pushObject(glog.Tm);
				r.pushObject(glog.Opp);

				for (let i = 0, len = logkeys[this.get('player.position')].length; i < len; i++) {
					r.pushObject(glog[logkeys[this.get('player.position')][i]]);
				}

				if (this.get('player.stats.fantasylogs.length')) {
					let fantasylog = this.get('player.stats.fantasylogs').find((flog) => {
						return glog.date === flog.date;
					});
					if (fantasylog) {
						r.pushObject( (this.get('player.site') === 'fanduel' && fantasylog.fdPts) || (this.get('player.site') === 'draftkings' && fantasylog.dkPts) || 0 );
					}
				}

				return r;
			});
		}
	}),
	means: Ember.computed('player.position', 'stats.totals', function() {
		if (!this.get('stats.totals')) {
			return null;
		} else {

			let r = [];
			let numGames = this.get('stats.totals.games');

			for (let i = 0, len = logkeys[this.get('player.position')].length; i < len; i++) {
				let stat = logkeys[this.get('player.position')][i];
				let statArray = this.get('stats.totals')[stat];

				let statValue;
				if (statArray == null || numGames === 0) {
					statValue = '-';
				} else if (stat.indexOf('Per') === -1) {
					statValue = math.round(math.sum(statArray)/numGames, 1);
				} else if (this.get('player.position') === 'D') {
					statValue = statArray;
				} else {
					statValue = math.round(math.sum(statArray)/numGames, 2);
				}
				r.pushObject(statValue);
			}
			return r;
		}
	}),
	medians: Ember.computed('player.position', 'stats.totals', function() {
		if (!this.get('stats.totals') || this.get('player.position') === 'D') {
			return null;
		} else {

			let r = [];

			for (let i = 0, len = logkeys[this.get('player.position')].length; i < len; i++) {
				let stat = logkeys[this.get('player.position')][i];
				let statArray = this.get('stats.totals')[stat];
				let statValue;
				if (statArray == null) {
					statValue = '-';
				} else if (stat.indexOf('Per') === -1) {
					statValue = math.round(math.quantileSeq(statArray, 0.50), 1);
				} else {
					statValue = math.round(math.quantileSeq(statArray, 0.50), 2);
				}
				r.pushObject(statValue);
			}
			return r;
		}
	}),
	labels: Ember.computed('player.position', function() {
		return labels[this.get('player.position')];
	}), 
	date: Ember.computed('player.proto.startTime', function() {
		return moment(this.get('player.proto.startTime')).format('ddd MMM DD, YYYY');
	})
});

NflPlayerComponent.reopenClass({
	positionalParams: ['player', 'stats']
});

export default NflPlayerComponent;