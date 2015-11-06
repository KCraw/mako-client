import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nfl-fanduel-lgen', 'Integration | Component | nfl fanduel lgen', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nfl-fanduel-lgen}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nfl-fanduel-lgen}}
      template block text
    {{/nfl-fanduel-lgen}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
