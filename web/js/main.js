var table_row_template = $('.table-row-template').remove(),
    table              = $('.weather-table');

reloadWeather();
var myVar;
function reloadWeather() {

 myVar= setTimeout(function() {

    API.fetch_weather(function (response) {

      $('.table-row-template').remove();
      var data = JSON.parse(response);

      var forecast = data.query.results.channel.item.forecast;

      for(var index = 0; index < forecast.length; ++index) {
            var day = forecast[index];
          
            var new_row = $('.table-row-template').clone();

            new_row.find('#foreDate').text(day['day']);
            new_row.find('#foreHigh').text(day['high']);
            new_row.find('#foreLow').text(day['low']);
            new_row.find('#foreDetails').text(day['text']);
          
            $('#forecast').append(new_row);
        

      };
      console.log("ran");
    
      reloadWeather();
      

    });
  }, 30000);


} 

2