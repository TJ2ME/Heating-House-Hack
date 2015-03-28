var http = require('https');


function get_weather(city, callback) {
  var city = city.replace(' ', '+');

  var options = {
    hostname  : 'george-vustrey-weather.p.mashape.com',
    path      : '/api.php?location=' + city,
    port      : 443,
    method    : 'GET',
    headers   : {
      'X-Mashape-Key' : 'U72EQEwYHcmshta7CdQLvkO2ADq6p1PQDWNjsnu5V9KLbex6ED'
    }
  }

  var req = http.request(options, function (res) {

    var data = '';

    res.setEncoding('utf-8');

    res.on('data', function (chunk) {
      console.log('Got data chunk: ' + chunk);
      data += chunk;
    });

    res.on('end', function () {
        console.log('Request finished with data: ' + data);
        callback(data);
    });

  });

  req.on('error', function(e) {
    console.log('Oops, something broke: ' + e);
  });

  req.end();

}

exports.fetch_weather = function (city, cb) {
  get_weather(city, cb);
}
