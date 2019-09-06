var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/udemy');
mongoose.connection.on('open', () => {
    console.log("MongoDB: Bağlandı");
});
mongoose.connection.on('error', (err) => {
    console.log("MongoDB: Error", err);
});
