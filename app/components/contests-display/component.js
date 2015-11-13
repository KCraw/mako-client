import Ember from 'ember';

export default Ember.Component.extend({
	fanduelMlbContests: Ember.computed.filterBy('model.mlbContests', 'site', 'fanduel'),
	fanduelNflContests: Ember.computed.filterBy('model.nflContests', 'site', 'fanduel'),
	fanduelNbaContests: Ember.computed.filterBy('model.nbaContests', 'site', 'fanduel'),

	draftkingsMlbContests: Ember.computed.filterBy('model.mlbContests', 'site', 'draftkings'),
	draftkingsNflContests: Ember.computed.filterBy('model.nflContests', 'site', 'draftkings'),
	draftkingsNbaContests: Ember.computed.filterBy('model.nbaContests', 'site', 'draftkings'),

	contestSorting: ['startTime'],

	fanduelMlbContestsSorted: Ember.computed.sort('fanduelMlbContests', 'contestSorting'),
	fanduelNflContestsSorted: Ember.computed.sort('fanduelNflContests', 'contestSorting'),
	fanduelNbaContestsSorted: Ember.computed.sort('fanduelNbaContests', 'contestSorting'),

	draftkingsMlbContestsSorted: Ember.computed.sort('draftkingsMlbContests', 'contestSorting'),
	draftkingsNflContestsSorted: Ember.computed.sort('draftkingsNflContests', 'contestSorting'),
	draftkingsNbaContestsSorted: Ember.computed.sort('draftkingsNbaContests', 'contestSorting'),

	fanduelContests: Ember.computed('fanduelMlbContestsSorted', 'fanduelNflContestsSorted', 'fanduelNbaContestsSorted', function() {
		let r = [];
		r.pushObject({ name: "MLB", list: this.get('fanduelMlbContestsSorted') });
		r.pushObject({ name: "NFL", list: this.get('fanduelNflContestsSorted') });
		r.pushObject({ name: "NBA", list: this.get('fanduelNbaContestsSorted') });
		return r;
	}),
	
	draftkingsContests: Ember.computed('draftkingsMlbContestsSorted', 'draftkingsNflContestsSorted', 'draftkingsNbaContestsSorted', function() {
		let r = [];
		r.pushObject({ name: "MLB", list: this.get('draftkingsMlbContestsSorted') });
		r.pushObject({ name: "NFL", list: this.get('draftkingsNflContestsSorted') });
		r.pushObject({ name: "NBA", list: this.get('draftkingsNbaContestsSorted') });
		return r;
	}),

	contests: Ember.computed('fanduelContests', 'draftkingsContests', function() {
		let r = [];
		r.pushObject({ name: "FanDuel", contests: this.get('fanduelContests') });
		r.pushObject({ name: "DraftKings", contests: this.get('draftkingsContests') });
		return r;
	})
});
