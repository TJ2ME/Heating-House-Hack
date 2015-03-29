var table_row_template = $('.table-row-template').remove(),
    current_row_template = $('.current-row-template').remove();

$(document).ready(function(){
  $('.btn-md').hide(0); 
  loadData();
});

function toCel(num) {
  return Math.round((num -32) * 5/9);
}

function loadData() {

    API.fetch_weather(function (response) {

      $('.current-row-template').remove();
      $('.table-row-template').remove();


      var data = JSON.parse(response);

      var condition = data.query.results.channel.item.condition;
      var atmosphere = data.query.results.channel.atmosphere;
          
            var new_row = current_row_template.clone();

            new_row.find('#todayDate').text(condition['date']);
            new_row.find('#todayTemp').text(toCel(condition['temp']));
            new_row.find('#todayLow').text(atmosphere['humidity']);
            new_row.find('#todayPOP').text(condition['text']);
          
            $('#currentDay').append(new_row);

            if(toCel(condition['temp']) >= 15) {
              $('#acCtrl').fadeIn();
              $('#ignoreCtrl').fadeIn();
            } 

            if(toCel(condition['temp']) <= 0) {
              $('#heatCtrl').fadeIn();
              $('#ignoreCtrl').fadeIn();
            } 

      var forecast = data.query.results.channel.item.forecast;

      for(var index = 0; index < forecast.length; ++index) {
            var day = forecast[index];
          
            var new_row = table_row_template.clone();

            new_row.find('#foreDate').text(day['day'] + ' ' + day['date']);
            new_row.find('#foreHigh').text(toCel(day['high']));
            new_row.find('#foreLow').text(toCel(day['low']));
            new_row.find('#foreDetails').text(day['text']);
          
            $('#forecast').append(new_row);
            
        

      };
      console.log("ran");
    
      reloadWeather();
      

    });
  }


var myVar;
function reloadWeather() {

 myVar = setTimeout(loadData, 60000);

} 

$(window).scroll(function (event) {
    var height = $(window).scrollTop();
    if(height == 0) {
      $('.navbar').css("background-color", "transparent");
      $('.collapsed').css("background-color", "#eee");
    } else {
      $('.navbar').css("background-color", "#eee");
    }
});

var sysStat = $('#statusText');

$('#heatCtrl').click(function(){
    $('.alertHeat').fadeIn();
    $('.btn-md').fadeOut();
    sysStat.text("Heat is on.");
 });

$('#acCtrl').click(function(){
  $('.alertAC').fadeIn();
  $('.btn-md').fadeOut();
  sysStat.text("A/C is on.");
 });

$('#ignoreCtrl').click(function(){
  $('.btn-md').fadeOut();
 });

 $('#forceHeat').click(function(){
    $('.manualHeat').fadeIn();
    sysStat.text("Heat is on.");
 });

$('#forceAC').click(function(){
  $('.manualAC').fadeIn();
  sysStat.text("A/C is on.");
 });

$('#forceOff').click(function(){
  $('.manualOff').fadeIn();
  sysStat.text("Systems are off.");
 });

$(function(){
    $("[data-hide]").on("click", function(){
        $("." + $(this).attr("data-hide")).fadeOut();
    });
});

