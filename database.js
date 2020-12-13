const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/sportfishing";

//connecting database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('Db connect'))
    .catch(err => console.log(err));

module.exports = mongoose;