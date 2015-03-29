var table_row_template = $('.table-row-template').remove(),
    current_row_template = $('.current-row-template').remove();

reloadWeather();
var myVar;
function reloadWeather() {

 myVar = setTimeout(function() {

    API.fetch_weather(function (response) {

      $('.current-row-template').remove();
      $('.table-row-template').remove();

      var data = JSON.parse(response);

      var condition = data.query.results.channel.item.condition;
      var atmosphere = data.query.results.channel.atmosphere;
          
            var new_row = current_row_template.clone();

            new_row.find('#todayDate').text(condition['date']);
            new_row.find('#todayTemp').text(Math.round((condition['temp']-32) * 5/9));
            new_row.find('#todayLow').text(atmosphere['humidity']);
            new_row.find('#todayPOP').text(condition['text']);
          
            $('#currentDay').append(new_row);

      var forecast = data.query.results.channel.item.forecast;

      for(var index = 0; index < forecast.length; ++index) {
            var day = forecast[index];
          
            var new_row = table_row_template.clone();

            new_row.find('#foreDate').text(day['day'] + ' ' + day['date']);
            new_row.find('#foreHigh').text(Math.round((day['high']-32) * 5/9));
            new_row.find('#foreLow').text(Math.round((day['low']-32) * 5/9));
            new_row.find('#foreDetails').text(day['text']);
          
            $('#forecast').append(new_row);
            
        

      };
      console.log("ran");
    
      reloadWeather();
      

    });
  }, 30000);


} 
