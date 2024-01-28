var crypto = require('crypto');

// Convert hexadecimal key to Buffer directly
var hexKey = 'FF87937C174401EF8328611B81784938';
var key = Buffer.from(hexKey, 'hex');

console.log('Converted Key:', key);

exports.encrypt = function (plainText) {
    var iv = Buffer.from('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f', 'binary');
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
	console.log(encoded)
    return encoded;
};

exports.decrypt = function (encText) {
    var iv = Buffer.from('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f', 'binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(encText, 'hex', 'utf8');
    decoded += decipher.final('utf8');
	console.log("decoded",decoded)
    return decoded;
};
