import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['input-group', 'date'],
	hideControl: false,
	didInsertElement() {
		this.$().datepicker({
			autoclose: true,
			title: this.get('title'),
			todayBtn: 'linked',
			todayHighlight: true
		});
		this.$().on('changeDate', (event) => {
			if (event.date) {
				this.get('dateSelected')(event.date);
				this.$().datepicker('clearDates');
			}
		});
	}
});
