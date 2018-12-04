'use strict';

(function () {

  /* price restrictions */

  var stayingType = document.querySelector('#type');
  var stayingPrice = document.querySelector('#price');

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
  onRoomChange();

  numberOfRooms.addEventListener('change', onRoomChange);

})();
