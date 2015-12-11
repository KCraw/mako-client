import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nba-fd-optimizer', 'Integration | Component | nba fd optimizer', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nba-fd-optimizer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nba-fd-optimizer}}
      template block text
    {{/nba-fd-optimizer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
