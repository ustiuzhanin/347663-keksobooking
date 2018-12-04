'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (adsObj, index) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = adsObj[index].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adsObj[index].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = adsObj[index].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.util.apartment[adsObj[index].offer.type];
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

  window.cardRender = {
    addCard: renderCard
  };
})();
