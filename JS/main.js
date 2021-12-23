
// code to display the year dynamically in copyright
var copyright = document.getElementById('copyright');
var currentYear = new Date().getFullYear();
copyright.innerText = `© ${currentYear} Coinshred. All Rights Reserved`;




// Getting the client location, currency code and more from api 
var price = 75.67, currencyCode = 'INR', city = 'Chandigarh', country = 'India', timezone = 'Kolkata';
var geoURL = 'http://www.geoplugin.net/json.gp';
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
        url: ``,
        headers: {  'Access-Control-Allow-Origin': `https://api.coinshred.com/launch/?email=${email}&full_name=${name}&id=${user_id}&default_currency=${currencyCode}&currency_value=${price}&city=${city}&country=${country}&timezone=${timezone}&invite_by_id=${invitation_id}` },
        crossDomain:true,
        data: {},
        success: function (jsondata) {
            console.log(jsondata)
        }
    })
})


// changing the content of subscription container
// var subscriptionContainer = document.getElementById('subscription-container');
// subscriptionContainer.innerHTML = `<p>Hi ${name}</p><p>You will automatically recive your credits  when you sign up.</p>`;




  onmessage = evt => {
    const port = evt.ports[0]
  
    fetch(...evt.data).then(res => {
      // the response is not clonable
      // so we make a new plain object
      const obj = {
        bodyUsed: false,
        headers: [...res.headers],
        ok: res.ok,
        redirected: res.redurected,
        status: res.status,
        statusText: res.statusText,
        type: res.type,
        url: res.url
      }
  
      port.postMessage(obj)
  
      // Pipe the request to the port (MessageChannel)
      const reader = res.body.getReader()
      const pump = () => reader.read()
      .then(({value, done}) => done 
        ? port.postMessage(done)
        : (port.postMessage(value), pump())
      )
  
      // start the pipe
      pump()
    })
  }



  window.popup = window.open(geoURL);


  function xfetch(...args) {
    // tell the proxy to make the request
    const ms = new MessageChannel
    popup.postMessage(args, '*', [ms.port1])
  
    // Resolves when the headers comes
    return new Promise((rs, rj) => {
  
      // First message will resolve the Response Object
      ms.port2.onmessage = ({data}) => {
        const stream = new ReadableStream({
          start(controller) {
  
            // Change the onmessage to pipe the remaning request
            ms.port2.onmessage = evt => {
              if (evt.data === true) // Done?
                controller.close()
              else // enqueue the buffer to the stream
                controller.enqueue(evt.data)
            }
          }
        })
  
        // Construct a new response with the 
        // response headers and a stream
        rs(new Response(stream, data))
      }
    })
  }

  xfetch(geoURL)
  .then(res => res.text())
  .then(console.log)