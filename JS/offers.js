var offers = [{
    amount: 10,
    currency: "USDT",
    offerCode: "1def44"
}, {
    amount: 20,
    currency: "USDT",
    offerCode: "263hj"
}, {
    amount: 30,
    currency: "USDT",
    offerCode: "87hbd"
},
{
    amount: 65,
    currency: "USDT",
    offerCode: "6kih5"
}]

offerCode = getCookie('offerCode')

if (offerCode == null) {
    var params = (new URL(document.location)).searchParams;
    var offer;
    var offerCode = params.get("offer-code");

    if (offerCode == null) {
        offer = offers[0];
    } else {

        var offer = offers.filter(function (lauchOffer) {
            return lauchOffer.offerCode == offerCode;
        });
        offer = offer[0];
    }
} else {
    var offer = offers.filter(function (lauchOffer) {
        return lauchOffer.offerCode == offerCode;
    });
    offer = offer[0];


}

/**
 * This function return the appropriate approx offer price
 * @param {*} price 
 */
function getPrice(price) {
    var myString = price.toString();
    mystring = myString.split('.')[0];
    var offerAmount = mystring[0];
    for (var digit = 1; digit < mystring.length; digit++) {
        offerAmount += '0';
    }

    return offerAmount;
}


