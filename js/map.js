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


var adsList = [];

var sortRandomNum = function(min, max) {
  var arr = [];
  for(var i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr.sort(function(a, b){return 0.5 - Math.random()});
};

var sortRandomArr = function(arr) {
  return arr.sort(function(a, b){return 0.5 - Math.random()});
}

var getRandomArbitrary = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

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

var createList = function() {

  var randomAdress = sortRandomNum(1, NUMBER_OF_OBJECTS);
  var randomTitle = sortRandomArr(TITLE_ARR);
  var apartmentArr = Object.keys(APARTMENT_TYPE);
  console.log(apartmentArr.length);

  for(var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    var rand = sortRandomArr(PICTURES_ARR);

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
          address: getRandomArbitrary(MIN_X, MAX_X) + ", " + getRandomArbitrary(MIN_Y, MAX_Y),
          price: getRandomArbitrary(1000, 1000000),
          type: apartmentArr[getRandomArbitrary(0, apartmentArr.length - 1)],
          rooms: getRandomArbitrary(1, 5),
          guests: getRandomArbitrary(1, 15),
          checkin: CHECK_IN_OUT_TIME[getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
          checkout: CHECK_IN_OUT_TIME[getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
          features: sortRandomArr(FEATURES).slice(0, getRandomArbitrary(1, FEATURES.length)),
          description: '',
          photos:  getShuffledArray(PICTURES_ARR)
        }

      }
    );
  }
}
createList();

/* show .map */

var map = document.querySelector('.map');
map.classList.remove('map--faded');

/* markers render */

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsContainer = document.querySelector('.map__pins');
var pinWidth = 50;
var pinHeigth = 70;

var renderMarkers = function(adsObj) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = (adsObj.location.x - pinWidth / 2) + "px";
  pinElement.style.top = (adsObj.location.y - pinHeigth) + "px";
  pinElement.querySelector('img').src = adsObj.author.avatar;
  pinElement.querySelector('img').alt = adsObj.offer.title;

  return pinElement;
}

var addMarkers = function(amount) {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < amount.length; i++) {
    fragment.appendChild(renderMarkers(amount[i]));
  }
  pinsContainer.appendChild(fragment);
}
addMarkers(adsList);

/* first card render */

cardTemplate = document.querySelector('#card').content.querySelector('.popup');
filtersContainer = document.querySelector('.map__filters-container');

var renderFirstCard = function(adsObj) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = adsObj[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adsObj[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = adsObj[0].offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPE[adsObj[0].offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = adsObj[0].offer.rooms + ' комнаты для ' + adsObj[0].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsObj[0].offer.checkin + ', выезд до ' + adsObj[0].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = adsObj[0].offer.description;
  cardElement.querySelector('.popup__avatar').src = adsObj[0].author.avatar;

  var renderFeatures = function(featuresArr) {
    for(var i = 0; i < featuresArr.length; i++) {
      var qq = cardElement.querySelector('.popup__feature--wifi');
      cardElement.querySelector('.popup__feature--' + featuresArr[i]).style.display = 'inline-block';
    }
  }
  renderFeatures(adsObj[0].offer.features);

  var renderPhotos = function(picturesArr) {
    var picturesContainer = cardElement.querySelector('.popup__photos');
    var picture = cardElement.querySelector('.popup__photo');
    picturesContainer.removeChild(picture);

    for(var i = 0; i < picturesArr.length; i++) {
      pictureElement = picture.cloneNode(true);
      pictureElement.src = picturesArr[i];
      picturesContainer.appendChild(pictureElement);
    }
  }
  renderPhotos(adsObj[0].offer.photos)

  map.insertBefore(cardElement, filtersContainer);
}
renderFirstCard(adsList);
