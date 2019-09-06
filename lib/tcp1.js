var hl7 = require('simple-hl7');

////////////////////SERVER///////////////////
var app = hl7.tcp();
app.use(function(req, res, next) {
    if (req.type != 'ADT' || req.event != 'A04') {
        return next();
    }

    var pid = req.msg.getSegment('PID');
    var patient = pid.getComponent(5, 2) + ' ' + pid.getComponent(5, 1);

    console.log('Patient Info Is ' + patient);
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

//Send Ack
app.use(function(req, res, next) {
    res.end();
})

//Error Handler
app.use(function(err, req, res, next) {
    var msa = res.ack.getSegment('MSA');
    msa.setField(1, 'AR');
    res.ack.addSegment('ERR', err.message);
    res.end();
});


app.start(7777);
console.log('tcp interface listening on ' + 7777);
