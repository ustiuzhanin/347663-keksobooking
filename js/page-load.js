'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters-container');
  var filtersFormChildren = filtersForm.querySelector('.map__filters').children;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

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

    /* adress coordinates */
    var defaultPinPositionLeft = mainPin.offsetLeft + Math.round(mainPin.offsetWidth / 2);
    var defaultPinPositionTop = mainPin.offsetTop + Math.round(mainPin.offsetHeight / 2);
    changeAdressValue(defaultPinPositionLeft, defaultPinPositionTop);
  });

  /* activating page on the first interaction + add mouse move event to the main pin */

  var PIN_BOTTOM_POS = 64;
  var PIN_LEFT_POS = 25;
  var PIN_WIDTH = 65;
  var PIN_HEIGTH = 82;
  var pins = document.querySelector('.map__pins');

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

      if (pinPosTop < window.util.measurements.minY) {
        mainPin.style.top = window.util.measurements.minY + 'px';
      } else if (pinPosTop + PIN_HEIGTH > window.util.measurements.maxY) {
        mainPin.style.top = window.util.measurements.maxY - PIN_HEIGTH + 'px';
      } else if (pinPosleft < window.util.measurements.minX) {
        mainPin.style.left = window.util.measurements.minX + 'px';
      } else if (pinPosleft + PIN_WIDTH > window.util.measurements.maxX) {
        mainPin.style.left = window.util.measurements.maxX - PIN_WIDTH + 'px';
      } else {
        mainPin.style.top = pinPosTop + 'px';
        mainPin.style.left = pinPosleft + 'px';
      }

      var pinAdressY = parseInt(mainPin.style.top, 10) + PIN_BOTTOM_POS;
      var pinAdressX = parseInt(mainPin.style.left, 10) + PIN_LEFT_POS;
      changeAdressValue(pinAdressY, pinAdressX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (pins.children.length <= 2) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        switсhFormСondition(adFormFieldset, false);
        switсhFormСondition(filtersFormChildren, false);
        window.markersRender.addMarkers(window.ads.list);

        window.popup.load();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
