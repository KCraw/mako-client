import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['input-group', 'date'],
	didInsertElement() {
		this.$().datepicker({
			autoclose: true,
			title: 'Past Contests',
			todayBtn: 'linked',
			todayHighlight: true,
			endDate: new Date()
		});
		this.$().on('changeDate', (event) => {
			if (!event.date) {
				return;
			} else {
				this.sendAction('action', event.date);
				this.$().datepicker('clearDates');
			}
		});
	}
});
