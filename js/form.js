'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormFieldset = document.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');

  /* price restrictions */

  var stayingType = adForm.querySelector('#type');
  var stayingPrice = adForm.querySelector('#price');

  var onStayingChange = function () {
    switch (stayingType.value) {
      case 'bungalo':
        stayingPrice.min = 0;
        stayingPrice.placeholder = 0;
        break;
      case 'flat':
        stayingPrice.min = 1000;
        stayingPrice.placeholder = 1000;
        break;
      case 'house':
        stayingPrice.min = 5000;
        stayingPrice.placeholder = 5000;
        break;
      case 'palace':
        stayingPrice.min = 10000;
        stayingPrice.placeholder = 10000;
        break;
    }
  };

  stayingType.addEventListener('change', onStayingChange);

  /* checkin/out restrictions */

  var checkin = document.querySelector('#timein');
  var checkout = document.querySelector('#timeout');

  var onCheckInOutChange = function (evt) {
    var checkinValue = checkin.value.slice(0, checkin.value.indexOf(':'));
    var checkoutValue = checkout.value.slice(0, checkout.value.indexOf(':'));
    if (checkinValue > checkoutValue) {
      evt.target.setCustomValidity('«Время заезда» должно быть раньше или совпадать с «Временем выезда»');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  checkin.addEventListener('change', onCheckInOutChange);
  checkout.addEventListener('change', onCheckInOutChange);

  /* room and guests restrictions */

  var numberOfRooms = document.querySelector('#room_number');
  var numberOfGuests = document.querySelector('#capacity');

  var guestsArr = Array.from(numberOfGuests.children);
  var guests = {
    1: 3,
    2: 2,
    3: 1,
    100: 4
  };

  var setGuestsCapacity = function (rooms) {

    /* reset the options */
    guestsArr.forEach(function (item) {
      item.disabled = true;
    });

    /* set the new options */
    var roomsNumber = Number(rooms);

    if (roomsNumber !== 100) {
      for (var i = 1; i <= roomsNumber; i++) {
        guestsArr[guests[i]].disabled = false;
      }
    } else {
      guestsArr[guests[100]].disabled = false;
    }
    /* set the value to none after changing the staying type */
    numberOfGuests.value = '';
  };

  var onRoomChange = function () {

    switch (numberOfRooms.value) {
      case '1':
        setGuestsCapacity(numberOfRooms.value);
        break;

      case '2':
        setGuestsCapacity(numberOfRooms.value);
        break;

      case '3':
        setGuestsCapacity(numberOfRooms.value);
        break;

      case '100':
        setGuestsCapacity(numberOfRooms.value);
        break;
    }
    if (numberOfGuests.value === '4') {
      numberOfGuests.setCustomValidity('Выберите количество гостей');
    }
  };
  // onRoomChange();

  numberOfRooms.addEventListener('change', onRoomChange);

  /* form submit */

  var onLoad = function () {

    /* disable and reset form */
    adForm.reset();
    window.pageLoad.disableForm(adFormFieldset, true);
    window.pageLoad.disableForm(filtersForm, true);
    adForm.classList.add('ad-form--disabled');

    /* reset the map to its primary state  */
    map.classList.add('map--faded');
    window.markersRender.removeMarkers();
    window.cardRender.removeCard();

    /* reset the main pin position */
    mainPin.style.left = window.pageLoad.mainPinStartCoordinates.left + 'px';
    mainPin.style.top = window.pageLoad.mainPinStartCoordinates.top + 'px';

    /* success block */
    var pageMain = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var succesElement = successTemplate.cloneNode(true);
    pageMain.appendChild(succesElement);

    var closeSuccess = function () {
      pageMain.removeChild(succesElement);
      document.removeEventListener('keydown', onEscPress);
    };

    var onSuccessClick = function () {
      closeSuccess();
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.util.keyCodes.esc) {
        closeSuccess();
      }
    };

    succesElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onError = function (message) {
    var pageMain = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');

    /* add error message */
    var errorElement = errorTemplate.cloneNode(true);
    var closeErrorBtn = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = message;

    pageMain.appendChild(errorElement);

    /* close error message */
    var closeError = function () {
      pageMain.removeChild(errorElement);
      document.removeEventListener('keydown', onErrorEscPress);
      closeErrorBtn.addEventListener('keydown', onErrorBtnPress);
    };
    var onErrorBtnPress = function (evt) {
      if (evt.keyCode === window.util.keyCodes.enter) {
        closeError();
      }
    };
    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.util.keyCodes.esc) {
        closeError();
      }
    };
    var onErrorBtnClick = function () {
      closeError();
    };

    closeErrorBtn.addEventListener('click', onErrorBtnClick);
    closeErrorBtn.addEventListener('keydown', onErrorBtnPress);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.post(onLoad, onError, new FormData(adForm));
  };

  adForm.addEventListener('submit', onFormSubmit);

  /* form reset */

  var formResetBtn = document.querySelector('.ad-form__reset');

  var onResetBtnClick = function () {
    adForm.reset();
  };

  formResetBtn.addEventListener('click', onResetBtnClick);
})();
