// * This file containe the javascript that set the subscription form content according to the cookies and doing the encryption and decryption work


// fetching the referal code
let params = (new URL(document.location)).searchParams;
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


// if (getCookie('name') == null && getCookie('email') == null && getCookie('user_id') == null) {
if (0 != 0) {

    // changing the content of subscription container

    subscriptionTitle.innerHTML = `<h1>Subscription</h1>`;
    subscriptionContent.innerHTML = `              <form action="" class="subscription-form">

    <div class="mb-3">
        <label for="user-full-name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="user-full-name"
            placeholder="Eg: Mohit Gupta">
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
            Grab 3k Now
        </button>
    </div>
</form>
`

} else {
    // fetching data from cookies
    // name = getCookie('name') 
    // email = getCookie('email') 
    // user_id = getCookie('user_id')
    name = 'Anurag Rai'
    email = 'Anuragrai15march@gmail.com'
    user_id = 'QW51cmFnIFJhaXxBbnVyYWdAZW1haWwuY29t'
    shareURL = `https://www.coinshred.com/?reffer=${user_id}`;

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


}