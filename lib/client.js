var hl7 = require('simple-hl7');
var client = hl7.Server.createTcpClient({
    host: '127.0.0.1',
    port: 2222,
    keepalive: true,
    callback: function(err, ack) {
        if (err) {
            console.log("*******HATA********");
            console.log(err.message);
        } else {
            console.log(ack.log());
        }
    }
});

var msg = new hl7.Message(
                    "EPIC",
                    "EPICADT",
                    "SMS",
                    "199912271408",
                    "CHARRIS",
                    ["ADT", "A04"], //This field has 2 components
                    "1817457",
                    "D",
                    "2.5"
                );

console.log('******sending message*****')
client.send(msg, function(err, ack) {
  console.log('******ack received*****')
  console.log(ack.log());
});

//setTimeout(function() {
    //console.log('2');
  //  console.log('************ikinci mesaj gönderiliyor****************');
  //  client.send(msg);
  //  console.log('mesaj iletildi');
//}, 3000);

//setTimeout(function() {
//    console.log('************üçüncü mesaj gönderiliyor****************');
//    client.send(msg);
//    console.log('mesaj iletildi');
//}, 4000);
