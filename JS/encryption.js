
/**
 * This function return the Encrypted text
 * @param {Text} string 
 * @returns 
 */
function Encryption(string) {
    const encodedString = window.btoa(string); // "a29ucmFk"
    return encodedString;
}

/**
 * This function return an array [name, email]
 * @param {Encrypted Data} encrtpted 
 * @param {Secret Key} key 
 */
function Decryption(encrtpted) {
    // Decrypt
    var originalText = window.atob(encrtpted);
    data = originalText.split('|');
    return data;
}
