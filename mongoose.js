// importing dependencies
const mongoose = require('mongoose');




// initializing database url

let dbURL = 'localhost:27017/AnimeShop';
let webDBUrl = 'mongodb+srv://SayedArRafi:1424031624856@animeshop-lbzqs.mongodb.net/AnimeShop?retryWrites=true&w=majority';
//connect to database

mongoose.connect(process.env.MONGODB_URI || `${webDBUrl}`, {
    useNewUrlParser: true,
    // for production level this line requires
    // useMongoClient: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database is connected successfully!!!');
}).catch((e) => {
    console.log('Database fails to connect due to : ');
    console.log(e);
    console.log(e.message);
});

module.exports = {mongoose}