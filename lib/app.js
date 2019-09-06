var hl7 = require('simple-hl7');
var moment = require('moment');
const fs  = require('fs');
var now = moment().format('DD-MM-YYYY HH:mm:ss');
var filename = moment().format('DD-MM-YYYY');
var foldername = moment().format('MM');
var dizinname = moment().format('YYYY');
var app = hl7.tcp();
var client = hl7.Server.createTcpClient('10.5.220.8', 7777);

app.use(function(req, res, next) {
    console.log('-----------MESAJ ALINDI-------------')
    console.log('Firma Adi : ' + req.firmaadi);
    console.log('Mesaj Gönderen :' + req.facility);
    console.log('Mesaj Durumu : ' + req.event);
    console.log('Mesaj Tipi : ' + req.type);
    console.log('Hastane Adi: ' + req.hastaneadi);
    console.log('Tarih & Saat : ' + now);
    fs.appendFile(filename + '.txt' , 'Firma Adı :' +  '' + req.firmaadi + '\n' + 'Mesaj Gönderen:' + '' +  req.facility + '\n' + 'Gönderiliş Tarihi :' + '' + now + '\n' + 'Hastane Adı:' + '' +  req.hastaneadi  + '\n' + '-------------------------------------' + '\n' , (err) => {
        if (err)
            throw err;
        console.log('--------------------------------------------------------------------------');
    });
    var msg=req.msg.log();
    client.send(msg, function(err, ack) {});
    next();
})



app.use(function(req, res, next){

    console.log('-----------------------------------')
    console.log('-----------ACK Gönderildi----------')
    console.log('-----------------------------------')
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

app.start(5555);
console.log('------------------------------------');
console.log('-----------SUNUCU BASLADI-----------');
console.log('------------------------------------');
