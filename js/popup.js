'use strict';

(function () {
  var dataObj;
  var getData = function(data) {
    return dataObj = data;
  }

  // var loadPopup = function (data) {
    var pin = document.querySelector('.map__pins');
    var map = document.querySelector('.map');

    var closePopup = function () {
      var cardPopup = document.querySelector('.popup');

      map.removeChild(cardPopup);

      document.removeEventListener('keydown', onPopupEscPress);
    };

    var openPopup = function (index) {
      console.log('qqq');

      var openedPopups = Array.from(map.children);
      console.log(openedPopups);

      openedPopups.forEach(function (item) {
        if (item.classList.contains('popup')) {
          closePopup(item);
        }
      });

      // window.cardRender.addCard(data, index);
      window.cardRender.addCard(dataObj, index);

      var popupCloseBtn = document.querySelector('.popup__close');

      popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
      document.addEventListener('keydown', onPopupEscPress);
    };

    var onPinsClick = function (evt) {
      var target = evt.target;
      console.log(target);

      while (target !== pin) {
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
      if (evt.keyCode === window.util.keyCodes.esc) {
        closePopup();
      }
    };

    pin.addEventListener('click', onPinsClick);
  // };

  window.popup = {
    // load: loadPopup
    load: getData
  };

  // pin.addEventListener('click', window.onPinsClick);

})();
