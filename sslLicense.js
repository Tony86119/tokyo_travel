// var fs = require('fs');

// var pfxPath = 'ssl/www_geologycloud_tw.pfx';

// var hspfx = fs.readFileSync(pfxPath);

// var options = {
//     pfx: hspfx,
//     // passphrase: '000000',
// };

// var ssl = {};
// ssl.options = options;

// module.exports = ssl;

var fs = require('fs');
var keyPath = 'ssl/server_key.key';
var certPath = 'ssl/server_cert.pem';
var hskey = fs.readFileSync(keyPath);
var hscert = fs.readFileSync(certPath);
var options = {
key: hskey,
cert: hscert
};
//ssl object
var ssl = {};
ssl.options = options;
module.exports = ssl;