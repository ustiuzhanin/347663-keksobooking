'use strict';

(function () {

  var Measurements = {
    MIN_X: 0,
    MIN_Y: 130,
    MAX_X: 1200,
    MAX_Y: 630
  };

  var KeyCodes = {
    ESC: 27,
    ENTER: 15
  };

  window.util = {
    keyCodes: KeyCodes,
    measurements: Measurements
  };
})();
