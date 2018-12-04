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

  var sortRandomNum = function (min, max) {
    var arr = [];
    for (var i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  var sortRandomArr = function (arr) {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  var getRandomArbitrary = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getShuffledArray = function (arr) {
    var shuffledArr = [];
    for (var i = 0; i < arr.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    for (i = 0; i < arr.length; i++) {
      shuffledArr[i] = arr[i];
    }
    return shuffledArr;
  };

  window.util = {
    keyCodes: keyCodes,
    sortRandomNum: sortRandomNum,
    sortRandomArr: sortRandomArr,
    getRandomArbitrary: getRandomArbitrary,
    getShuffledArray: getShuffledArray,
    apartment: APARTMENT_TYPE,
    measurements: MEASUREMENTS
  };
})();
