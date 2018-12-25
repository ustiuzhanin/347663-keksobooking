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

  var loadData = function (onLoad, onError) {
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
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR_TIMEOUT / 1000 + ' секунд');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var postData = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === RespondCodes.OK) {
        onLoad('Данные успешно отправлены');
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR_TIMEOUT / 1000 + ' секунд');
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    post: postData
  };

})();
