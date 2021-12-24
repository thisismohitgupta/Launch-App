if(XMLHttpRequest)
{
  var request = new XMLHttpRequest();
  if("withCredentials" in request)
  {
   // Firefox 3.5 and Safari 4
   request.open('GET', geoURL, true);
   request.onreadystatechange = function() {
     console.log('working')
     console.log(request.response)
    };
   request.send();
  }
  else if (XDomainRequest)
  {
   // IE8
   var xdr = new XDomainRequest();
   xdr.open("get", geoURL);

      xdr.send();

  }

}





$.ajax({
    type: 'GET',
    dataType: 'json',
    url: geoURL,
    headers: {  'Access-Control-Allow-Origin': geoURL },
    crossDomain:true,
    data: {},
    success: function (jsondata) {
      console.log('working')
        console.log(jsondata)
    }
  })
  




  var price = 75.67, currencyCode = 'INR', city = 'Chandigarh', country = 'India', timezone = 'Kolkata';
  var geoURL = 'http://www.geoplugin.net/json.gp';
  // https://ipapi.co/180.188.224.198/json/
  // https://www.iplocate.io/api/lookup/180.188.224.198
  // https://freegeoip.app/
  // http://ip-api.com/json/180.188.224.198
  fetch(`http://www.geoplugin.net/json.gp`).then(response => {
  
      return response.json()
  }).then(ip_obj => {
      // console.log(ip_obj)
      price = ip_obj.geoplugin_currencyConverter;
      currencyCode = ip_obj.geoplugin_currencyCode;
      city = ip_obj.geoplugin_city;
      country = ip_obj.geoplugin_countryName;
      timezone = ip_obj.geoplugin_timezone;
      console.log(price, currencyCode, city, country, timezone)
  })
  