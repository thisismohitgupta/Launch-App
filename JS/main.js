
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear = new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;




// Getting the client location, currency code and more from api 
// var geoURL = 'http://www.geoplugin.net/json.gp';
// https://ipapi.co/180.188.224.198/json/
// https://www.iplocate.io/api/lookup/180.188.224.198
// https://freegeoip.app/
// http://ip-api.com/json/180.188.224.198



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

$.getJSON("https://api.ipify.org?format=json", function (data) {
     ip = data.ip;

    // getting the geo data from api
    // geoURL = 'http://www.geoplugin.net/json.gp'

     geoURL = `https://api.coinshred.com/geo/?ip=${ip}`
    // geoURL = `https://api.coinshred.com/geo/`
    var settingsLoc = {
        "crossDomain": true,
        "method": "GET",
        data: ``,
        "url": geoURL
    }

    $.ajax(settingsLoc).done(function (jsondata) {
        console.log(jsondata)
        price = jsondata.geoplugin_currencyConverter, currencyCode = jsondata.geoplugin_currencyCode, city = jsondata.geoplugin_city, country = jsondata.geoplugin_countryName, timezone = jsondata.geoplugin_timezone, currency_symbol = jsondata.geoplugin_currencySymbol;

        // changing the country name in page
        var countryElements = document.getElementsByClassName('country');
        for (var i = 0; i < countryElements.length; i++) {
            countryElements[i].textContent = country;
        }

        var faqCountryElement = document.getElementById('faq-country');
        faqCountryElement.innerText = faqCountryElement.innerText.replace('India', country)

        // setting up offer amount in the page
        var tempElements = document.getElementsByClassName('offer');
        for (var i = 0; i < tempElements.length; i++) {
            tempElements[i].textContent = `${currency_symbol}${getPrice(offer.amount * price)}`
        }



        if (getCookie('name') == null && getCookie('email') == null && getCookie('user_id') == null) {
            // if (0 != 0) {

            // changing the content of subscription container

            subscriptionTitle.innerHTML = `<h4>Get ${currency_symbol} ${getPrice(offer.amount * price)} when we launch in your wallet</h4>`;
            subscriptionContent.innerHTML = `              <form action="" class="subscription-form">

    <div class="mb-3">
        <label for="user-full-name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="user-full-name"
            placeholder="Tony Stark">
    </div>

    <div class="mb-3">
        <label for="user-email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="user-email"
            placeholder="name@example.com">
    </div>

    <div class="mb-3" id="invitation-field">
${invitation_html}
    </div>

    <div class="hero-cta">
        <button id="subscribe-btn" class="btn carousel-control-next" type="button"
            data-bs-target="#buyCarousel" data-bs-slide="next">
            Register Now
        </button>
    </div>
</form>
`

            // Handling the form data using AJAX
            var subscribeBtn = document.getElementById('subscribe-btn');
            subscribeBtn.addEventListener('click', () => {
                name = document.getElementById('user-full-name').value;
                email = document.getElementById('user-email').value;


                var user_id = Encryption(`${name}|${email}`);
                shareURL = `https://www.coinshred.com/?reffer=${user_id}&offer-code=${offer.offerCode}`;

                var settings = {
                    "crossDomain": true,
                    "method": "POST",
                    data: '{}',
                    "url": `https://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${referall_code}&currencySymbol=${currency_symbol}&offerCode=${offer.offerCode}&offerAmount=${getPrice(offer.amount * price)}`
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);

                    // setting the cookies
                    setCookie("email", email, 100);
                    setCookie("name", name, 100);
                    setCookie("user_id", user_id, 100);
                    setCookie("offerCode", offer.offerCode, 100);


                    // changing the content of subscription container
                    changeContent()

                    // adding event listner to the copy btn for displaying the linked copied text
                    var copyBtn = document.getElementById('share-copy-btn');
                    var copyStatus = document.getElementById('share-link-status');

                    copyBtn.addEventListener('click', () => {
                        return new Promise(function (resolve, reject) {
                            copyToClipboard(shareURL)
                            copyStatus.style.display = 'block';
                            // Setting 2000 ms time
                            setTimeout(resolve, 2000);
                        }).then(function () {
                            copyStatus.style.display = 'none';
                            console.log("Wrapped setTimeout after 2000ms");
                        });
                    })



                });


            })



        } else {
            // fetching data from cookies
            name = getCookie('name')
            email = getCookie('email')
            user_id = getCookie('user_id')
            shareURL = `https://www.coinshred.com/?reffer=${user_id}`;

            changeContent();

            // adding event listner to the copy btn for displaying the linked copied text
            var copyBtn = document.getElementById('share-copy-btn');
            var copyStatus = document.getElementById('share-link-status');

            copyBtn.addEventListener('click', () => {
                return new Promise(function (resolve, reject) {
                    copyToClipboard(shareURL)
                    copyStatus.style.display = 'block';
                    // Setting 2000 ms time
                    setTimeout(resolve, 2000);
                }).then(function () {
                    copyStatus.style.display = 'none';
                    console.log("Wrapped setTimeout after 2000ms");
                });
            })
        }

    })


 })
