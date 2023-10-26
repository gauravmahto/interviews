((window, top) => {

  top.getData = function () {

    window.fetch('/requestData?cb=readData', {
      method: 'GET'
    });

  };

  window.readData = function (data) {

    console.log('Response data: ', data);

  };

})(window, window.frontend = window.frontend || {});
``
