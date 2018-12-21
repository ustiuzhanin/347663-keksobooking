'use strict';

(function () {

  var MAX_MARKERS_RENDER = 5;
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

  var addMarkers = function (adsObj) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsObj.length; i++) {
      if (i === MAX_MARKERS_RENDER) {
        break;
      } else {
        fragment.appendChild(renderMarkers(adsObj[i], i));
      }
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
    addMarkers: addMarkers,
    removeMarkers: removeMarkers
  };
})();
