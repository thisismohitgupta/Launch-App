
// code for getting the ip address of user
var ip, price, currencyCode, city, country, timezone;

$.getJSON("https://api.ipify.org?format=json", function (data) {
    ip = data.ip;
    
    // getting the geo data from api
    // geoURL = 'http://www.geoplugin.net/json.gp'
    
    geoURL = `https://api.coinshred.com/geo/?ip=${ip}`
    var settingsLoc = {
        "crossDomain": true,
        "method": "GET",
        data: ``,
        "url": geoURL
    }

    $.ajax(settingsLoc).done(function (jsondata) {
        console.log(jsondata)
        price = jsondata.geoplugin_currencyConverter, currencyCode = jsondata.geoplugin_currencyCode, city = jsondata.geoplugin_city, country = jsondata.geoplugin_countryName, timezone = jsondata.geoplugin_timezone;

    })

})





// var geoURL = 'http://www.geoplugin.net/json.gp';
  // https://ipapi.co/180.188.224.198/json/
  // https://www.iplocate.io/api/lookup/180.188.224.198
  // https://freegeoip.app/
  // http://ip-api.com/json/180.188.224.198
