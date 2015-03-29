var http = require('https');


function get_weather( callback) {
 // var city = city.replace(' ', '+');

  var options = {
    hostname  : 'query.yahooapis.com',
    path      : '/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
    port      : 443,
    method    : 'GET',
   
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

exports.fetch_weather = function ( cb) {
  get_weather(cb);
}
