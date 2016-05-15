# Mako

<img src="screenshots/mako1.png" width="33%">
<img src="screenshots/mako2.png" width="33%">
<img src="screenshots/mako3.png" width="33%">

This is the front-end code for Mako. Since it is a data visualization and manipulation layer, this repository is being left public as a portfolio project. Feel free to see how I did things with Ember.js.

Most of the real work is done on the backend, which scrapes publicly available sports statistics and upcoming matchup data, caches them in a NoSQL database, and uses a custom algorithm to perform statistical analysis on the matchups and generate rating distributions tuned to each major DFS site.
Since it generally works and releasing it into the wild would decrease its value, the backend repository is obviously kept private.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

