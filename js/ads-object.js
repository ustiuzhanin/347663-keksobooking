'use strict';

(function () {

  var NUMBER_OF_OBJECTS = 8;
  var TITLE_ARR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PICTURES_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var adsList = [];

  var randomAdress = window.util.sortRandomNum(1, NUMBER_OF_OBJECTS);
  var randomTitle = window.util.sortRandomArr(TITLE_ARR);
  var apartmentArr = Object.keys(window.util.apartment);

  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    adsList.push(
        {
          author: {
            avatar: 'img/avatars/user0' + randomAdress[i] + '.png'
          },

          location: {
            x: window.util.getRandomArbitrary(window.util.measurements.minX, window.util.measurements.maxX),
            y: window.util.getRandomArbitrary(window.util.measurements.minY, window.util.measurements.maxY)
          },

          offer: {
            title: randomTitle[i],
            address: window.util.getRandomArbitrary(window.util.measurements.minX, window.util.measurements.maxX) + ', ' + window.util.getRandomArbitrary(window.util.measurements.minY, window.util.measurements.maxY),
            price: window.util.getRandomArbitrary(1000, 1000000),
            type: apartmentArr[window.util.getRandomArbitrary(0, apartmentArr.length - 1)],
            rooms: window.util.getRandomArbitrary(1, 5),
            guests: window.util.getRandomArbitrary(1, 15),
            checkin: CHECK_IN_OUT_TIME[window.util.getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
            checkout: CHECK_IN_OUT_TIME[window.util.getRandomArbitrary(0, CHECK_IN_OUT_TIME.length - 1)],
            features: window.util.sortRandomArr(FEATURES).slice(0, window.util.getRandomArbitrary(1, FEATURES.length)),
            description: '',
            photos: window.util.getShuffledArray(PICTURES_ARR)
          }
        }
    );
  }

  window.ads = {
    list: adsList
  };
})();
