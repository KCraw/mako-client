import Ember from 'ember';

const RqExBoxesComponent = Ember.Component.extend({
	tagName: '',

	init() {
		this._super(...arguments);
		this.set('isRequired', Ember.computed('player', `requiredList.${this.get('player.id')}`, {
			get(key) {
				return this.get(`requiredList.${this.get('player.id')}`);
			}, 
			set(key, value) {
				this.set(`requiredList.${this.get('player.id')}`, value);
				return value;
			}
		}));
		this.set('isExcluded', Ember.computed('player', `excludedList.${this.get('player.id')}`, {
			get(key) {
				return this.get(`excludedList.${this.get('player.id')}`);
			}, 
			set(key, value) {
				this.set(`excludedList.${this.get('player.id')}`, value);
				return value;
			}
		}));
		this.set('isDisabled', Ember.computed('player', 'isRequired', `disabledList.${this.get('player.position')}`, function() {
			return !this.get('isRequired') && this.get(`disabledList.${this.get('player.position')}`);
		}));
	},


	isRequiredChanged: Ember.observer('isRequired', function() {
		if (this.get('isRequired')) {
			this.set('isExcluded', false);
		}
	}),
	isExcludedChanged: Ember.observer('isExcluded', function() {
		if (this.get('isExcluded')) {
			this.set('isRequired', false);
		}
	}),


	actions: {
		playerRequired(player) {
			this.toggleProperty('isRequired');
			this.get('onPlayerRequired')(player, this.get('isRequired'));
		},
		playerExcluded(player) {
			this.toggleProperty('isExcluded');
			this.get('onPlayerExcluded')(player, this.get('isExcluded'));
		}
	}

});

RqExBoxesComponent.reopenClass({
	positionalParams: ['player']
});

export default RqExBoxesComponent;