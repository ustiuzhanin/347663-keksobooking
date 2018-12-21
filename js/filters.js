'use strict';

(function () {

  var filtersForm = function (adsObj) {
    var mapFilters = document.querySelector('.map__filters');
    var housingType = document.querySelector('#housing-type');
    var filteredArr = [];
    // var housingTypeMap = {
    //   'any': '',
    //   'palace': '',
    //   'flat': '',
    //   'house': '',
    //   'bungaloz': '',
    // }
    var filteredArr1 = Array.from(adsObj);



    var filterType = document.querySelector('#housing-type');
    var filterRooms = document.querySelector('#housing-rooms');
    var filterPrice = document.querySelector('#housing-price');
    var filterGuests = document.querySelector('#housing-guests');
    // var filterFeatures = document.querySelectorAll('input[name=features]:checked');

    var onFiltersFormChange = function (evt) {
      window.markersRender.removeMarkers();
      // window.popup.close();

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
        } else if (filterPrice.value === 'any') {
          return item;
        }
      };
      var filteredGuests = function (item) {
        if (filterGuests.value === '0') {
          return item.offer.guests === 0;
        } else if (filterGuests.value > 0) {
          return (item.offer.guests >= filterGuests.value && item.offer.guests !== 0);
        } else if (filterGuests.value === 'any') {
          return item;
        }
      };
      var filteredFeatures = function (item) {
        // console.log(evt.target.checked);
        // if (evt.target.checked === true) {
        //   return item.offer.features.indexOf(evt.target.value) !== -1;
        // } else if (evt.target.checked === false) {
        //   return item;
        // }
        var filterFeatures = document.querySelectorAll('input[name=features]:checked');

        var checkedItemsArr = [];
        checkedItemsArr = Array.from(filterFeatures).map(function (element) {
           // if (element.checked === true) {
            // console.log(element.value);
            return element.value;
          // }
        });

        // console.log(checkedItemsArr);
        // console.log(item.offer.features);

        var newArr = checkedItemsArr.every(function (element) {
          return item.offer.features.indexOf(element) !== -1;
        })
        return newArr;
        // console.log(newArr);
      };

      var filtered = Array.from(adsObj)
          .filter(filteredType)
          .filter(filteredRooms)
          .filter(filteredPrice)
          .filter(filteredGuests)
          .filter(filteredFeatures)

      console.log(filtered);
      window.markersRender.addMarkers(filtered);
      window.popup.load(filtered);
      // window.cardRender.addCard(data, index);
    }

    mapFilters.addEventListener('change', onFiltersFormChange);

  };

  window.filters = {
    onChange: filtersForm

  }
})();
/*
создать обьект вида: 'наименование значения инпута': 'значение инпута'
создать функцию перебора обьекта с данными(item) {
   создать функцию перебора обьекта со значениями(valueOfItem) {
    если item.offer.valueOfItem === valueOfItem
    eсли
 }
}
*/





  //   console.log('q');
  //    filteredArr1.filter(function(value){
  //
  //     return evt.target.value === value.offer.type;
  //
  //   });
  //   console.log(filtered);
  // }

  // housingType.addEventListener('change', onHousingTypeChange);


  // window.markersRender.addMarkers(filtered);
  // каждый импут пушит валью(не ноль) в массив
  // элементы массива перебераются с маркеров и отрисовываются

  // var filtersValue = []
  // var filters = document.querySelectorAll('.map__filter');
  //
  // filters.forEach(function (item) {
  //   console.log(item.value);
  //   filtersValue.push(item.value);
  // });
  // console.log(filtersValue);
  //
  // // filtersValue.forEach()
  //
  // var filtered = adsObj.filter(function(item){
  //
  //   item.offer.type === filtersValue[0]
  //   if (item.offer.type === filtersValue[0])
  //
  // });
