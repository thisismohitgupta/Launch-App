
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear = new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;




// Getting the client location, currency code and more from api 
var price = 75.67, currencyCode = 'INR', city = 'Chandigarh', country = 'India', timezone = 'Kolkata';

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


// Handling the form data using AJAx
var subscribeBtn = document.getElementById('subscribe-btn');
var name = document.getElementById('user-full-name').value;
var email = document.getElementById('user-email').value;


var user_id = Encryption(`${name}|${email}`);

let params = (new URL(document.location)).searchParams;
let invitation_id = params.get("invitation-id");

subscribeBtn.addEventListener('click', () => {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: `http://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${invitation_id}`,
        data: {},
        success: function (jsondata) {
            console.log(jsondata)
        }
    })
})


// changing the content of subscription container
// var subscriptionContainer = document.getElementById('subscription-container');
// subscriptionContainer.innerHTML = `<p>Hi ${name}</p><p>You will automatically recive your credits  when you sign up.</p>`;