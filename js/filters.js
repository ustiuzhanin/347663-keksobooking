'use strict';

(function () {

  var filtersForm = function (adsObj) {
    var mapFilters = document.querySelector('.map__filters');
    var filterType = document.querySelector('#housing-type');
    var filterRooms = document.querySelector('#housing-rooms');
    var filterPrice = document.querySelector('#housing-price');
    var filterGuests = document.querySelector('#housing-guests');

    var onFiltersFormChange = function () {
      window.debounce(function () {

        window.markersRender.removeMarkers();

        var filteredType = function (item) {
          return (item.offer.type === filterType.value || filterType.value === 'any');
        };
        var filteredRooms = function (item) {
          return (item.offer.rooms === Number(filterRooms.value) || filterRooms.value === 'any');
        };
        var filteredPrice = function (item) {
          if (filterPrice.value === 'low') {
            return item.offer.price <= 10000;
          } else if (filterPrice.value === 'middle') {
            return (item.offer.price > 10000 && item.offer.price <= 50000);
          } else if (filterPrice.value === 'high') {
            return item.offer.price > 50000;
          } else {
            return item;
          }
        };
        var filteredGuests = function (item) {
          if (filterGuests.value === '0') {
            return item.offer.guests === 0;
          } else if (filterGuests.value > 0) {
            return (item.offer.guests >= filterGuests.value && item.offer.guests !== 0);
          } else {
            return item;
          }
        };
        var filteredFeatures = function (item) {
          var filterFeatures = document.querySelectorAll('input[name=features]:checked');

          var checkedItemsArr = [];
          checkedItemsArr = Array.from(filterFeatures).map(function (element) {
            return element.value;
          });

          var newArr = checkedItemsArr.every(function (element) {
            return item.offer.features.indexOf(element) !== -1;
          });
          return newArr;
        };

        var filtered = Array.from(adsObj)
            .filter(filteredType)
            .filter(filteredRooms)
            .filter(filteredPrice)
            .filter(filteredGuests)
            .filter(filteredFeatures);

        window.markersRender.addMarkers(filtered);
        window.popup.load(filtered);

      });
    };

    mapFilters.addEventListener('change', onFiltersFormChange);

  };

  window.filters = {
    onChange: filtersForm
  };
})();
