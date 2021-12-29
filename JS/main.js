
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear = new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;


// fetching the referal code
var params = (new URL(document.location)).searchParams;
const referall_code = params.get("reffer");
var invitation_html = ''

var subscriptionContainer = document.getElementById('subscription-container');
var subscriptionTitle = document.getElementById('subscription-title');
var subscriptionContent = document.getElementById('subscription-content');

var name, email, user_id, shareURL;

function copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}


var refered_by_name, refered_by_email;






/**
 * This function is used to change the content of subscription container
 */
function changeContent() {

    subscriptionTitle.innerHTML = `<h3>Hi ${name.charAt(0).toUpperCase() + name.slice(1)},</h3>`;
    subscriptionContent.innerHTML = `
    <p>Your Credits will be automatically added into your account, when you sign up with ${email} in Coinshred.</p>
    <div class="mb-3 my-3 share-link-container">
    <label for="share-link" class="form-label" style="font-weight: 700;">Invite Friends</label>
    <div>
    <input type="url" name="share" id="share-link" class="form-control" value="${shareURL}" readonly>
    <button class="copy-btn" id='share-copy-btn'>
    <img src="/IMG/copy.png" alt="copy icon">
    </button>
    </div>
    <p class="copy-status" id="share-link-status"> Link Copied</p>
    </div>
    <p>Get Crypto of worth &#8377;100 per referal Account.</p>
`;

    var termsElement = document.getElementById('terms-and-conditions');
    termsElement.innerHTML = `<img src='/IMG/email.png' style='height:1.5rem;'/> ${email}`;
    termsElement.style.borderTop = '1px solid #000';
    termsElement.style.padding = '5px';
    termsElement.style.paddingLeft = '0';
    termsElement.style.textAlign = 'right';

}






if (referall_code != null) {
    var referall_data = Decryption(referall_code);
    refered_by_name = referall_data[0];
    refered_by_email = referall_data[1];
    invitation_html = `<label for="invitationname" class="form-label">Invited By</label>
    <input type="text" class="form-control" id="invitationname"
        value="${refered_by_name}" readonly>

        <input type="text" class="form-control" id="invitationfield"
        value="${referall_code}" hidden>
        `
    console.log(refered_by_name, refered_by_email)
}


// code for getting the ip address of user
var ip, price, currencyCode, city, country, timezone, currency_symbol;

// $.getJSON("https://api.ipify.org?format=json", function (data) {

    $.ajax({
        url: 'https://api.ipify.org?format=json',
        type: "GET",
        data: {},
        success: function (data) {
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
                price = jsondata.geoplugin_currencyConverter, currencyCode = jsondata.geoplugin_currencyCode, city = jsondata.geoplugin_city, country = jsondata.geoplugin_countryName, timezone = jsondata.geoplugin_timezone, currency_symbol = jsondata.geoplugin_currencySymbol;


                displayAndSaveData(price, currencyCode, city, country, timezone, currency_symbol)
            })

        },
        error: function () {
            // console.log('error working')
            displayAndSaveData(price=75, currencyCode='INR', city='Unknown', country='India', timezone='Unknown', currency_symbol='₹')

        }
    })



// })