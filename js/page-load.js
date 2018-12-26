'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 85;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters-container');
  var filtersFormChildren = filtersForm.querySelector('.map__filters').children;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mainPinStartCoordinates = {
    left: mainPin.offsetLeft,
    top: mainPin.offsetTop
  };

  /* deactivating page on the first website load */

  /* adress */

  var adressInput = document.querySelector('#address');

  var changeAdressValue = function (x, y) {
    adressInput.value = x + ', ' + y;
  };

  var switсhFormСondition = function (arr, value) {
    Array.from(arr).forEach(function (item) {
      item.disabled = value;
    });
  };

  window.addEventListener('load', function () {
    /* enable forms */
    switсhFormСondition(adFormFieldset, true);
    switсhFormСondition(filtersFormChildren, true);

    /* coordinates */
    var defaultPinPositionLeft = mainPin.offsetLeft + Math.round(mainPin.offsetWidth / 2);
    var defaultPinPositionTop = mainPin.offsetTop + Math.round(mainPin.offsetHeight / 2);
    changeAdressValue(defaultPinPositionLeft, defaultPinPositionTop);
  });

  /* activating page on the first interaction + add mouse move event to the main pin */

  var activation = false;

  var activatePage = function () {
    if (!activation) {

      var onLoad = function (respond) {
        activation = true;
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        adressInput.readOnly = true;

        switсhFormСondition(adFormFieldset, false);
        switсhFormСondition(filtersFormChildren, false);

        window.markersRender.add(respond);
        window.popup.load(respond);
        window.filters.onChange(respond);

      };

      window.backend.load(onLoad, window.backend.onError);
    }
  };

  var deactivatePage = function () {
    activation = false;
    map.classList.add('map--faded');
    window.markersRender.remove();
    window.cardRender.remove();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosTop = (mainPin.offsetTop - shift.y);
      var pinPosleft = (mainPin.offsetLeft - shift.x);

      if (pinPosTop < window.util.measurements.MIN_Y - MAIN_PIN_HEIGTH) {
        mainPin.style.top = window.util.measurements.MIN_Y - MAIN_PIN_HEIGTH + 'px';
      } else if (pinPosTop + MAIN_PIN_HEIGTH > window.util.measurements.MAX_Y) {
        mainPin.style.top = window.util.measurements.MAX_Y - MAIN_PIN_HEIGTH + 'px';
      } else if (pinPosleft < window.util.measurements.MIN_X) {
        mainPin.style.left = window.util.measurements.MIN_X + 'px';
      } else if (pinPosleft + MAIN_PIN_WIDTH > window.util.measurements.MAX_X) {
        mainPin.style.left = window.util.measurements.MAX_X - MAIN_PIN_WIDTH + 'px';
      } else {
        mainPin.style.top = pinPosTop + 'px';
        mainPin.style.left = pinPosleft + 'px';
      }

      var pinAdressY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGTH;
      var pinAdressX = parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2);

      changeAdressValue(pinAdressX, pinAdressY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      activatePage();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pageLoad = {
    mainPinStartCoordinates: mainPinStartCoordinates,
    disableForm: switсhFormСondition,
    deactivate: deactivatePage
  };

})();
