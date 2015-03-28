var table_row_template = $('.table-row-template').remove(),
    table              = $('.weather-table');


API.fetch_weather('Calgary', function (response) {


  var data = JSON.parse(response);

  $('#main-text').text(data[0]['condition']);


  data.forEach(function (day) {

    var new_row = table_row_template.clone();

    new_row.find('#day').text(day['day_of_week']);
    new_row.find('#high').text(day['high']);
    new_row.find('#low').text(day['low']);

    table.append(new_row);
  });



});
