import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nfl-matchups', 'Integration | Component | nfl matchups', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nfl-matchups}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nfl-matchups}}
      template block text
    {{/nfl-matchups}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
