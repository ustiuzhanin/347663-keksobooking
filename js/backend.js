'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var RESPOND_CODES = {
    ok: 200,
    requestError: 400,
    rightsError: 401,
    notFoundError: 404
  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case RESPOND_CODES.ok:
          onLoad(xhr.response);
          break;
        case RESPOND_CODES.requestError:
          onError('Неверный запрос');
          break;
        case RESPOND_CODES.rightsError:
          onError('Пользователь не авторизирован');
          break;
        case RESPOND_CODES.notFoundError:
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
      if (xhr.status === RESPOND_CODES.ok) {
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
