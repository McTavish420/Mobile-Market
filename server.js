// importing package dependecies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// importing other dependent files
const {mongoose} = require('./mongoose');
const users = require('./routes/userapi');
const products = require('./routes/productsapi');
const tags = require('./routes/tagsapi');
const categories = require('./routes/categoryapi');
const order = require('./routes/orderapi');

const app = express();
const corsOptions = {
    exposedHeaders: 'x-auth',
};

// Using some middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cors(corsOptions));


// using routes
app.use('/users', users);
app.use('/products', products);
app.use('/tags', tags);
app.use('/categories', categories);
app.use('/order', order);







// Handle Production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
// port configuration

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
});

module.exports = {app};