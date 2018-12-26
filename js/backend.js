'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var RespondCodes = {
    OK: 200,
    REQUEST_ERROR: 400,
    RIGHTS_ERROR: 401,
    NOT_FOUND_ERROR: 404
  };

  var createXhrEvent = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case RespondCodes.OK:
          onLoad(xhr.response);
          break;
        case RespondCodes.REQUEST_ERROR:
          onError('Неверный запрос');
          break;
        case RespondCodes.RIGHTS_ERROR:
          onError('Пользователь не авторизирован');
          break;
        case RespondCodes.NOT_FOUND_ERROR:
          onError('Страница не найдена');
          break;
        default:
          onError('Страница не найдена: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR_TIMEOUT / 1000 + ' секунд');
    });

    return xhr;
  };

  var onXhrError = function (message) {
    var pageMain = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');

    /* add error message */
    var errorElement = errorTemplate.cloneNode(true);
    var closeErrorBtn = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = message;

    pageMain.appendChild(errorElement);

    /* close error message */
    var closeError = function () {
      pageMain.removeChild(errorElement);
      document.removeEventListener('keydown', onErrorEscPress);
      closeErrorBtn.addEventListener('keydown', onErrorBtnPress);
    };
    var onErrorBtnPress = function (e) {
      if (e.keyCode === window.util.keyCodes.ENTER) {
        closeError();
      }
    };
    var onErrorEscPress = function (e) {
      if (e.keyCode === window.util.keyCodes.ESC) {
        closeError();
      }
    };
    var onErrorBtnClick = function () {
      closeError();
    };

    closeErrorBtn.addEventListener('click', onErrorBtnClick);
    closeErrorBtn.addEventListener('keydown', onErrorBtnPress);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var getData = function (onLoad, onError) {
    var xhr = createXhrEvent(onLoad, onError);

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var sendData = function (onLoad, onError, data) {
    var xhr = createXhrEvent(onLoad, onError);

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: getData,
    post: sendData,
    onError: onXhrError
  };

})();
