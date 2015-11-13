/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
  app.import(app.bowerDirectory+ '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
    destDir: "fonts"
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
    destDir: "fonts"
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
    destDir: "fonts"
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
    destDir: "fonts"
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
    destDir: 'fonts'
  });
  app.import(app.bowerDirectory + '/mathjs/dist/math.js');
  app.import(app.bowerDirectory + '/moment/moment.js');
  app.import(app.bowerDirectory + '/moment-timezone/builds/moment-timezone-with-data.js');
  app.import(app.bowerDirectory + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
  app.import(app.bowerDirectory + '/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css');
  app.import(app.bowerDirectory + '/Chart.js/Chart.js');
  // app.import(app.bowerDirectory + '/Chart.js/src/Chart.Core.js');
  // app.import(app.bowerDirectory + '/Chart.js/src/Chart.Line.js');

  return app.toTree();
};
