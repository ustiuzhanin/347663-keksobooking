'use strict';

var NUMBER_OF_OBJECTS = 8;
var TITLE_ARR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APARTMENT_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PICTURES_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 100;
var MAX_X = 1100;
var MIN_Y = 130;
var MAX_Y = 630;
var ESC_CODE = 27;


var adsList = [];

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

var createList = function () {

  var randomAdress = sortRandomNum(1, NUMBER_OF_OBJECTS);
  var randomTitle = sortRandomArr(TITLE_ARR);
  var apartmentArr = Object.keys(APARTMENT_TYPE);

  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    adsList.push(
        {
          author: {
            avatar: 'img/avatars/user0' + randomAdress[i] + '.png'
          },

          location: {
            x: getRandomArbitrary(MIN_X, MAX_X),
            y: getRandomArbitrary(MIN_Y, MAX_Y)
          },

          offer: {
            title: randomTitle[i],
            address: getRandomArbitrary(MIN_X, MAX_X) + ', ' + getRandomArbitrary(MIN_Y, MAX_Y),
            price: getRandomArbitrary(1000, 1000000),
            type: apartmentArr[getRandomArbitrary(0, apartmentArr.length - 1)],
            rooms: getRandomArbitrary(1, 5),
            guests: getRandomArbitrary(1, 15),
            checkin: CHECK_IN_OUT_TIME[getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
            checkout: CHECK_IN_OUT_TIME[getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
            features: sortRandomArr(FEATURES).slice(0, getRandomArbitrary(1, FEATURES.length)),
            description: '',
            photos: getShuffledArray(PICTURES_ARR)
          }
        }
    );
  }
};
createList();

/* show .map */

var map = document.querySelector('.map');

/* markers render */

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsContainer = document.querySelector('.map__pins');
var pinWidth = 50;
var pinHeigth = 70;

var renderMarkers = function (adsObj, index) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = (adsObj.location.x - pinWidth / 2) + 'px';
  pinElement.style.top = (adsObj.location.y - pinHeigth) + 'px';
  pinElement.querySelector('img').src = adsObj.author.avatar;
  pinElement.querySelector('img').alt = adsObj.offer.title;
  pinElement.id = index;

  return pinElement;
};

var addMarkers = function (amount) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < amount.length; i++) {
    fragment.appendChild(renderMarkers(amount[i], i));
  }
  pinsContainer.appendChild(fragment);
};

/* first card render */

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var filtersContainer = document.querySelector('.map__filters-container');

var renderCard = function (adsObj, index) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = adsObj[index].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adsObj[index].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = adsObj[index].offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPE[adsObj[index].offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = adsObj[index].offer.rooms + ' комнаты для ' + adsObj[index].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsObj[index].offer.checkin + ', выезд до ' + adsObj[index].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = adsObj[index].offer.description;
  cardElement.querySelector('.popup__avatar').src = adsObj[index].author.avatar;
  cardElement.style.display = 'block';
  cardElement.id = 'card-' + index;

  var renderFeatures = function (featuresArr) {
    for (var i = 0; i < featuresArr.length; i++) {
      cardElement.querySelector('.popup__feature--' + featuresArr[i]).style.display = 'inline-block';
    }
  };
  renderFeatures(adsObj[index].offer.features);

  var renderPhotos = function (picturesArr) {
    var picturesContainer = cardElement.querySelector('.popup__photos');
    var picture = cardElement.querySelector('.popup__photo');
    picturesContainer.removeChild(picture);

    for (var i = 0; i < picturesArr.length; i++) {
      var pictureElement = picture.cloneNode(true);
      pictureElement.src = picturesArr[i];
      picturesContainer.appendChild(pictureElement);
    }
  };
  renderPhotos(adsObj[index].offer.photos);

  map.insertBefore(cardElement, filtersContainer);
};

/* page deactivation(onload) */

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var filtersForm = document.querySelector('.map__filters-container');
var filtersFormChildren = filtersForm.querySelector('.map__filters').children;
var mainPin = document.querySelector('.map__pin--main');

/* adress  */

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

/* page activation */

var onMainPinMouseup = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  switсhFormСondition(adFormFieldset, false);
  switсhFormСondition(filtersFormChildren, false);
  addMarkers(adsList);

  changeAdressValue(600, 300);
  loadPopup();
};

mainPin.addEventListener('mouseup', onMainPinMouseup);

/* open card popup */


var loadPopup = function () {
  var pins = document.querySelector('.map__pins');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    var cardPopup = document.querySelector('.popup');
    map.removeChild(cardPopup);

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function (index) {

    var openedPopups = Array.from(map.children);
    openedPopups.forEach(function (item) {
      if (item.classList.contains('popup')) {
        closePopup(item);
      }
    });

    renderCard(adsList, index);

    var popupCloseBtn = document.querySelector('.popup__close');

    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPinsClick = function (evt) {
    var target = evt.target;

    while (target !== pins) {
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

  pins.addEventListener('click', onPinsClick);
};

/* form restrictions */

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
