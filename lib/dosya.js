var hl7 = require('simple-hl7');
var fs  = require('fs');

////////////////////SERVER///////////////////
var app = hl7.file();
app.use(function(req, res, next) {
    console.log('Message Recieved From ' + req.facility);
    console.log('Message Event: ' + req.event);
    console.log('Message Type: ' + req.type);
    next();
});

//create middleware
app.use(function(req, res, next) {
    //create middleware for certain message types
    if (req.type != 'ADT' || req.event != 'A04') {
        return next();
    }

    var pid = req.msg.getSegment('PID');
    var patient = pid.getComponent(5, 2) + ' ' + pid.getComponent(5, 1);

    console.log('Patient Info Is ' + patient);
    next();
});

//No ACK with FileClient
// app.use(function(req, res, next) {
//   console.log('************sending ack****************')
//   res.end();
// })

//Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
});


app.start('test-import');
console.log('tcp interface listening on ' + 7777);
////////////////////SERVER///////////////////