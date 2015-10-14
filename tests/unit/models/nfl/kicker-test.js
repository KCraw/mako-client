import { moduleForModel, test } from 'ember-qunit';

moduleForModel('nfl/kicker', 'Unit | Model | nfl/kicker', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
