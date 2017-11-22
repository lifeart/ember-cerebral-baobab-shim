/*jshint node:true*/
module.exports = {
  description: '@cerebral/baobab shim for Ember.js',
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'broccoli-replace', target: '*'},
      {name: '@cerebral/baobab', target: '^2.6.0'},
    ]).then(() => {
      return this.addAddonsToProject({
        packages: [
          {name: 'ember-cerebral-shim', target: '*'},
          {name: 'ember-baobab-shim', target: '*'}
        ]
      })
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}