import DS from 'ember-data';

export default DS.Model.extend({
  contest: DS.belongsTo('contest'),
  content: DS.attr('string')
});
