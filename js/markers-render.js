'use strict';

(function () {

  var MAX_MARKERS_RENDER = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');


  var renderMarkers = function (adsObj, index) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (adsObj.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (adsObj.location.y - PIN_HEIGTH) + 'px';
    pinElement.querySelector('img').src = adsObj.author.avatar;
    pinElement.querySelector('img').alt = adsObj.offer.title;
    pinElement.id = 'pin-' + index;

    return pinElement;
  };

  var addMarkers = function (adsObj) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < Math.min(adsObj.length, MAX_MARKERS_RENDER); i++) {
      fragment.appendChild(renderMarkers(adsObj[i], i));
    }

    pinsContainer.appendChild(fragment);
  };

  var removeMarkers = function () {
    Array.from(pinsContainer.children).forEach(function (item) {
      if (item.type === 'button') {
        pinsContainer.removeChild(item);
      }
    });
  };

  window.markersRender = {
    add: addMarkers,
    remove: removeMarkers
  };
})();
