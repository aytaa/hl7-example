var hl7 = require('simple-hl7');

///////////////////SERVER/////////////////////
var app = hl7.tcp();

app.use(function(req, res, next) {
    //req.msg is the HL7 message
    console.log('******message received*****')
    console.log(req.msg.log());
    next();
})

app.use(function(req, res, next){
    //res.ack is the ACK
    //acks are created automatically

    //send the res.ack back
    console.log('******sending ack*****')
    res.end()
})

app.use(function(err, req, res, next) {
    //error handler
    //standard error middleware would be
    console.log('******ERROR*****')
    console.log(err);
    var msa = res.ack.getSegment('MSA');
    msa.editField(1, 'AR');
    res.ack.addSegment('ERR', err.message);
    res.end();
});

var client = hl7.Server.createTcpClient({
    host: 'localhost',
    port: 7777,
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

console.log('*******mesaj gönderildi***********');
client.send(msg);

app.start(7777);
console.log('server 7777 portunu dinliyor');