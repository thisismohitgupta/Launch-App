// geoURL = 'http://www.geoplugin.net/json.gp'
geoURL = 'https://api.coinshred.com/launch/'
var price, currencyCode, city, country, timezone;

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: geoURL,
  data: {},
  success: function (jsondata) {
    // console.log('working')
    console.log(jsondata)
    price = jsondata.geoplugin_currencyConverter, currencyCode = jsondata.geoplugin_currencyCode, city = jsondata.geoplugin_city, country = jsondata.geoplugin_countryName, timezone = geoplugin_timezone;

  }
})





// var geoURL = 'http://www.geoplugin.net/json.gp';
  // https://ipapi.co/180.188.224.198/json/
  // https://www.iplocate.io/api/lookup/180.188.224.198
  // https://freegeoip.app/
  // http://ip-api.com/json/180.188.224.198
