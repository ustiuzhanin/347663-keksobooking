'use strict';

(function () {

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

  window.markersRender = {
    addMarkers: addMarkers
  };
})();
