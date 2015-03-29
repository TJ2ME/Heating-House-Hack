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
          
            var new_row = table_row_template.clone();

            new_row.find('#day').text(day['day']);
            new_row.find('#high').text(day['high']);
            new_row.find('#low').text(day['low']);

            table.append(new_row);
        

      };
      console.log("ran");
    
      reloadWeather();
      

    });
  }, 2000);


} 

2