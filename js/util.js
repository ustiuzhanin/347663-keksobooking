'use strict';

(function () {

  var APARTMENT_TYPE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var MEASUREMENTS = {
    minX: 100,
    minY: 130,
    maxX: 1100,
    maxY: 630
  };

  var keyCodes = {
    esc: 27,
    enter: 15
  };

  window.util = {
    keyCodes: keyCodes,
    apartment: APARTMENT_TYPE,
    measurements: MEASUREMENTS
  };
})();
