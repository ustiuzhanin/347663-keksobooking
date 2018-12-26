'use strict';

(function () {

  var changeFilters = function (adsObj) {
    var LOW_PRICE = 10000;
    var HIGH_PRICE = 50000;
    var mapFilters = document.querySelector('.map__filters');
    var filterType = document.querySelector('#housing-type');
    var filterRooms = document.querySelector('#housing-rooms');
    var filterPrice = document.querySelector('#housing-price');
    var filterGuests = document.querySelector('#housing-guests');


    var onFiltersFormChange = function () {
      window.debounce(function () {

        window.markersRender.remove();

        var getFilteredType = function (item) {
          return (item.offer.type === filterType.value || filterType.value === 'any');
        };

        var getFilteredRooms = function (item) {
          return (item.offer.rooms === Number(filterRooms.value) || filterRooms.value === 'any');
        };

        var getFilteredPrice = function (item) {
          if (filterPrice.value === 'low') {
            return item.offer.price <= LOW_PRICE;
          }
          if (filterPrice.value === 'middle') {
            return (item.offer.price > LOW_PRICE && item.offer.price <= HIGH_PRICE);
          }
          if (filterPrice.value === 'high') {
            return item.offer.price > HIGH_PRICE;
          }
          return item;
        };

        var getFilteredGuests = function (item) {
          if (filterGuests.value === '0') {
            return item.offer.guests === 0;
          } else if (filterGuests.value > 0) {
            return (item.offer.guests >= filterGuests.value && item.offer.guests !== 0);
          }
          return item;
        };

        var getFilteredFeatures = function (item) {
          var filterFeatures = document.querySelectorAll('input[name=features]:checked');

          var checkedItemsArr = [];
          checkedItemsArr = Array.from(filterFeatures).map(function (element) {
            return element.value;
          });

          return checkedItemsArr.every(function (element) {
            return item.offer.features.indexOf(element) !== -1;
          });
        };

        var filtered = Array.from(adsObj).filter(function (item) {
          return getFilteredType(item)
          && getFilteredRooms(item)
          && getFilteredPrice(item)
          && getFilteredGuests(item)
          && getFilteredFeatures(item);
        });

        window.markersRender.add(filtered);
        window.popup.load(filtered);

      });
    };

    mapFilters.addEventListener('change', onFiltersFormChange);

  };

  window.filters = {
    onChange: changeFilters
  };
})();
