import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
		this.$('.modal').on('hidden.bs.modal', (event) => {
			this.set('isEnabled', false);
			this.set('isShown', false);
		});
		this.$('.modal').on('shown.bs.modal', (event) => {
			this.set('isEnabled', true);
			this.set('isShown', true)
		});
	},
	toggle: Ember.observer('isEnabled', function() {
		if (this.get('isEnabled')) {
			this.$('.modal').modal('show');
		} else {
			this.$('.modal').modal('hide');
		}
	}),
	isEnabled: false,
	actions: {
		closeModal() {
			this.sendAction('action');
		}
	}, 
});
