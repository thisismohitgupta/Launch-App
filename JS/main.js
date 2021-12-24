
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


// Handling the form data using AJAX
var subscribeBtn = document.getElementById('subscribe-btn');

// for testing
// var name = 'anurag';
// var email = 'name@email.com';
// var user_id = Encryption(`${name}|${email}`);

subscribeBtn.addEventListener('click', () => {
    var name = document.getElementById('user-full-name').value;
    var email = document.getElementById('user-email').value;
    

    var user_id = Encryption(`${name}|${email}`);
    shareURL = `https://www.coinshred.com/?reffer=${user_id}`;

    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": `https://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${referall_code}`,
        "method": "POST",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        // setting the cookies
        setCookie("email", email, 100);
        setCookie("name", name, 100);
        setCookie("user_id", user_id, 100);


        // changing the content of subscription container
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











