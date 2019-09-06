var hl7 = require('simple-hl7');
var fs  = require('fs');
var parser = new hl7.Parser({segmentSeperator: '\n'});
var client = hl7.Server.createTcpClient({
  host: '127.0.0.1',
  port: 2222,
  keepalive: true,
  callback: function(err, ack) {
    if (err) {
      console.log("*******ERROR********");
      console.log(err.message);
    } else {
      console.log(ack.log());
    }
  }
});

var msg = parser.parseFileSync('C:/wamp64/www/eticaret/eticaret/nedmin/production/veriler.hl7');

console.log('************sending 1 message****************');
client.send(msg);
// fs.unlink("C:/wamp64/www/eticaret/eticaret/nedmin/production/veriler.hl7", (error) => {
//    if (error)
  //      throw error;
  //  console.log("İşlem başarılı...");
//});
