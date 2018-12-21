'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  // var DEBOUNCE_INTERVAL = 1000; // ms

  // window.debounce = function (cb) {
  //   var lastTimeout = null;
  //
  //   return function() {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function() {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };
})();
