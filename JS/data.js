

function displayAndSaveData(price, currencyCode, city, country, timezone, currency_symbol){
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


}





