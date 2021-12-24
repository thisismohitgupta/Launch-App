
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear = new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;




// Getting the client location, currency code and more from api 
var price = 75.67, currencyCode = 'INR', city = 'Chandigarh', country = 'India', timezone = 'Kolkata';
var geoURL = 'http://www.geoplugin.net/json.gp';
// https://ipapi.co/180.188.224.198/json/
// https://www.iplocate.io/api/lookup/180.188.224.198
// https://freegeoip.app/
// http://ip-api.com/json/180.188.224.198


// Handling the form data using AJAx
var subscribeBtn = document.getElementById('subscribe-btn');
var name = document.getElementById('user-full-name').value;
var email = document.getElementById('user-email').value;


var user_id = Encryption(`${name}|${email}`);

let params = (new URL(document.location)).searchParams;
let invitation_id = params.get("invitation-id");

// subscribeBtn.addEventListener('click', () => {

//     $.ajax({
//         type: 'POST',
//         dataType: 'json',
//         url: ``,
//         headers: {  'Access-Control-Allow-Origin': `https://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${invitation_id}` },
//         crossDomain:true,
//         data: {},
//         success: function (jsondata) {
//             console.log(jsondata)
//         }
//     })
// })


// changing the content of subscription container
var subscriptionContainer = document.getElementById('subscription-container');
var subscriptionTitle = document.getElementById('subscription-title');
var subscriptionTitle = document.getElementById('subscription-content');

subscribeBtn.addEventListener('click', () => {

  subscriptionContainer.innerHTML = `<p>Hi ${name}</p><p>You will automatically recive your credits  when you sign up.</p>`;
})







var settings = {
  'cache': false,
  'dataType': "jsonp",
  "async": true,
  "crossDomain": true,
  "url": `https://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${invitation_id}`,
  "method": "POST",
  "headers": {
    "accept": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);

});




