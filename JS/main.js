
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear= new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;




// Getting the client location, currency code and more from api 
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
