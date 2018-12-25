'use strict';

(function () {
  var dataObj;
  var getData = function (data) {
    dataObj = data;
  };

  var pinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  var closePopup = function () {
    var pin = document.querySelectorAll('.map__pin');
    var cardPopup = document.querySelector('.popup');

    map.removeChild(cardPopup);

    Array.from(pin).forEach(function (item) {
      item.classList.remove('map__pin--active');
    });

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function (index) {

    var openedPopups = Array.from(map.children);

    openedPopups.forEach(function (item) {
      if (item.classList.contains('popup')) {
        closePopup(item);
      }
    });

    var activePin = document.getElementById(index);
    activePin.classList.add('map__pin--active');

    window.cardRender.add(dataObj, index);

    var popupCloseBtn = document.querySelector('.popup__close');

    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPinsClick = function (evt) {
    var target = evt.target;

    while (target !== pinsContainer) {
      if (target.tagName === 'BUTTON') {
        break;
      }
      target = target.parentNode;
    }

    if (!target.classList.contains('map__pin--main') && target.classList.contains('map__pin')) {
      openPopup(target.id);
    }
  };

  var onPopupCloseBtnClick = function () {
    closePopup();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodes.ESC) {
      closePopup();
    }
  };

  pinsContainer.addEventListener('click', onPinsClick);

  window.popup = {
    load: getData
  };

})();
