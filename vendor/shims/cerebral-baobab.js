(function() {
  /* globals define, self */
  function vendorModule(BaseModel) {
    'use strict';
    return BaseModel;
  }
  // export an object with a default property that contains the 'hljs' global.
  define('cerebral/lib/BaseModel', ['cerebral/BaseModel'], vendorModule);
})();