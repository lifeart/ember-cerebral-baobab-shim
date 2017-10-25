'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
// const replace = require('broccoli-replace');
module.exports = {
  name: 'function-tree',
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
  treeForAddon (tree) {
    const app = this._findHost();
    const reduxPath = path.dirname(path.resolve('./cerebral_src/packages/node_modules/@cerebral/baobab/src/index.js'));
    let reduxTree = this.treeGenerator(reduxPath);

    if (!tree) {
      return this._super.treeForAddon.call(this, reduxTree);
    }

    const trees = mergeTrees([reduxTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
}

module.exports = {
  name: '@cerebral/baobab',
};
