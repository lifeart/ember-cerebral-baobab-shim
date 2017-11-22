'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const replace = require('broccoli-replace');
module.exports = {
  name: '@cerebral/baobab',
  _findHost: function () {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app
    } while (current && current.parent && current.parent.parent && (current = current.parent))

      return app;
  },
  isDevelopingAddon() {
    return true;
  },
  included(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    this._super.included.apply(this, arguments);
    target.import('vendor/shims/cerebral-baobab.js');
  },
  treeForAddon (tree) {
    const app = this._findHost();

    const reduxPath = path.dirname(require.resolve('@cerebral/baobab'));

    let reduxTree = this.treeGenerator(reduxPath);

    if (!tree) {
      return this._super.treeForAddon.call(this, reduxTree);
    }

    reduxTree = replace(reduxTree, {
      files: '**/*.js',
      patterns: [
        {
          match: /cerebral\/lib/g,
          replacement: `cerebral`
        }
      ]
    });

    reduxTree = replace(reduxTree, {
      files: '**/*.js',
      patterns: [
        {
          match: /cerebral\/es/g,
          replacement: `cerebral`
        }
      ]
    });

    const trees = mergeTrees([reduxTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};