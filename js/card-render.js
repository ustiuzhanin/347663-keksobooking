'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var filtersContainer = document.querySelector('.map__filters-container');
  var apartmentMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderCard = function (adsObj, index) {
    var cardElement = cardTemplate.cloneNode(true);

    index = index.replace(/[^0-9]/g, '');

    cardElement.querySelector('.popup__title').textContent = adsObj[index].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adsObj[index].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = adsObj[index].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = apartmentMap[adsObj[index].offer.type];
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

    /* hide empty elements */

    var hideEmptyElement = function () {
      var offerKeys = Object.keys(adsObj[index].offer);
      var offerValues = adsObj[index].offer;
      for (var i = 0; i < offerKeys.length; i++) {
        if (offerValues[offerKeys[i]].length === 0) {
          cardElement.querySelector('[class$=' + offerKeys[i] + ']').style.display = 'none';
        }
      }
    };
    hideEmptyElement();

    map.insertBefore(cardElement, filtersContainer);
  };

  var removeCard = function () {
    Array.from(map.children).forEach(function (item) {
      if (item.classList.contains('popup')) {
        map.removeChild(item);
      }
    });
  };

  window.cardRender = {
    add: renderCard,
    remove: removeCard
  };
})();
