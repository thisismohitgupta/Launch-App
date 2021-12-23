
/**
 * This function return the Encrypted text
 * @param {Text} string 
 * @returns 
 */
function Encryption(string) {
    var ciphertext = CryptoJS.AES.encrypt('Anurag Rai|Anuragrai15march@gmail.com', 'coinshred').toString();
    return ciphertext;
}

/**
 * This function return an array [name, email]
 * @param {Encrypted Data} encrtpted 
 * @param {Secret Key} key 
 */
function Decryption(encrtpted, key = 'coinshred') {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(encrtpted, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    data = originalText.split('|');
    return data;
}
