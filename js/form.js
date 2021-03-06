'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var NOT_FOR_GUESTS_CODE = 100;
  var MinStayingPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };
  var Guests = {
    1: 3,
    2: 2,
    3: 1,
    100: 4
  };
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormFieldset = document.querySelectorAll('.ad-form fieldset');
  var filtersForm = document.querySelector('.map__filters');

  /* price restrictions */

  var stayingType = adForm.querySelector('#type');
  var stayingPrice = adForm.querySelector('#price');

  var onStayingChange = function () {
    switch (stayingType.value) {
      case 'bungalo':
        stayingPrice.min = MinStayingPrice.BUNGALO;
        stayingPrice.placeholder = MinStayingPrice.BUNGALO;
        break;
      case 'flat':
        stayingPrice.min = MinStayingPrice.FLAT;
        stayingPrice.placeholder = MinStayingPrice.FLAT;
        break;
      case 'house':
        stayingPrice.min = MinStayingPrice.HOUSE;
        stayingPrice.placeholder = MinStayingPrice.HOUSE;
        break;
      case 'palace':
        stayingPrice.min = MinStayingPrice.PALACE;
        stayingPrice.placeholder = MinStayingPrice.PALACE;
        break;
    }
  };

  stayingType.addEventListener('change', onStayingChange);

  /* checkin/out restrictions */

  var timeFieldset = document.querySelector('.ad-form__element--time');
  var checkin = document.querySelector('#timein');
  var checkout = document.querySelector('#timeout');

  var onCheckInOutChange = function (evt) {
    var checkinValue = checkin.value.slice(0, checkin.value.indexOf(':'));
    var checkoutValue = checkout.value.slice(0, checkout.value.indexOf(':'));
    if (checkinValue < checkoutValue) {
      evt.target.setCustomValidity('«Время заезда» должно быть позже или совпадать с «Временем выезда»');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  timeFieldset.addEventListener('change', onCheckInOutChange);

  var synchronizeTime = function (firstItem, secondItem) {
    var firstItemValue = firstItem.value;
    var secondItemOptions = secondItem.options;

    Array.from(secondItemOptions).forEach(function (item, i) {
      if (item.value === firstItemValue) {
        secondItem.selectedIndex = i;
      }
    });
  };

  checkin.addEventListener('change', function () {
    synchronizeTime(checkin, checkout);
  });

  checkout.addEventListener('change', function () {
    synchronizeTime(checkout, checkin);
  });

  /* room and guests restrictions */

  var numberOfRooms = document.querySelector('#room_number');
  var numberOfGuests = document.querySelector('#capacity');

  var guestsArr = Array.from(numberOfGuests.children);

  var setGuestsCapacity = function (rooms) {

    /* reset the options */
    guestsArr.forEach(function (item) {
      item.disabled = true;
    });

    /* set the new options */
    var roomsNumber = Number(rooms);

    if (roomsNumber !== NOT_FOR_GUESTS_CODE) {
      for (var i = 1; i <= roomsNumber; i++) {
        guestsArr[Guests[i]].disabled = false;
      }
    } else {
      guestsArr[Guests[NOT_FOR_GUESTS_CODE]].disabled = false;
    }
    /* set the value to none after changing the staying type */
    numberOfGuests.value = '';
  };

  var onRoomChange = function () {
    setGuestsCapacity(numberOfRooms.value);
  };

  numberOfRooms.addEventListener('change', onRoomChange);

  /* show/hide invalid frame */

  var onFieldsetChange = function (evt) {
    if (evt.target.checkValidity()) {
      evt.target.classList.remove('validity-error');
    }
  };

  var onFormInvalid = function (evt) {
    var invalidInput = evt.target;
    invalidInput.classList.add('validity-error');
  };

  adForm.addEventListener('invalid', onFormInvalid, true);
  adFormFieldset.forEach(function (item) {
    item.addEventListener('change', onFieldsetChange);
  });

  /* deactivating page and resets form  */

  var deactivateForm = function () {
    adForm.reset();
    preview.src = DEFAULT_AVATAR;
    clearLoadedPictures();
    onStayingChange();
    window.pageLoad.disableForm(adFormFieldset, true);
    window.pageLoad.disableForm(filtersForm, true);
    adForm.classList.add('ad-form--disabled');
  };

  /* form submit */

  var onLoad = function () {

    /* disable and reset form */

    deactivateForm();
    window.pageLoad.deactivate();

    /* reset the main pin position */
    mainPin.style.left = window.pageLoad.mainPinStartCoordinates.left + 'px';
    mainPin.style.top = window.pageLoad.mainPinStartCoordinates.top + 'px';

    /* success block */
    var pageMain = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var succesElement = successTemplate.cloneNode(true);
    pageMain.appendChild(succesElement);

    var closeSuccess = function () {
      pageMain.removeChild(succesElement);
      document.removeEventListener('keydown', onEscPress);
    };

    var onSuccessClick = function () {
      closeSuccess();
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.util.keyCodes.ESC) {
        closeSuccess();
      }
    };

    succesElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.post(onLoad, window.backend.onError, new FormData(adForm));
  };

  adForm.addEventListener('submit', onFormSubmit);

  /* form reset btn */

  var formResetBtn = document.querySelector('.ad-form__reset');

  var onResetBtnClick = function () {
    deactivateForm();
    window.pageLoad.deactivate();
  };

  formResetBtn.addEventListener('click', onResetBtnClick);

  /* avatar load */

  var avatarLoadInput = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var renderPicture = function (element, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      element.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var onAvatarLoadChange = function () {
    var file = avatarLoadInput.files[0];

    renderPicture(preview, file);
  };

  avatarLoadInput.addEventListener('change', onAvatarLoadChange);

  /* pictures load */

  var picturesLoadInput = document.querySelector('#images');
  var picturesLoadContainer = document.querySelector('.ad-form__photo-container');

  var clearLoadedPictures = function () {
    var photoRenderContainer = document.querySelectorAll('.ad-form__photo');

    photoRenderContainer.forEach(function (item) {
      picturesLoadContainer.removeChild(item);
    });
  };

  var onPicturesLoadChange = function (evt) {
    var filesList = evt.target.files;
    clearLoadedPictures();

    Array.from(filesList).forEach(function (item) {
      var imageContainer = document.createElement('div');
      var imageElement = document.createElement('img');

      imageContainer.classList.add('ad-form__photo');
      imageElement.classList.add('ad-form__photo--element');
      imageElement.style.width = '100%';
      imageElement.style.height = '100%';

      renderPicture(imageElement, item);

      imageContainer.appendChild(imageElement);
      picturesLoadContainer.appendChild(imageContainer);
    });
  };

  picturesLoadInput.addEventListener('change', onPicturesLoadChange);
})();
