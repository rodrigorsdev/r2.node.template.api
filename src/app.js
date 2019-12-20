'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

mongoose.connect(config.databaseConnectionString);

const Product = require('./models/product.model');
const Customer = require('./models/customer.model');
const Order = require('./models/order.model');

const mainRoute = require('./routes/main.route');
const productRoute = require('./routes/product.route');
const customertRoute = require('./routes/customer.route');
const orderRoute = require('./routes/order.route');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', mainRoute);
app.use('/product', productRoute);
app.use('/customer', customertRoute);
app.use('/order', orderRoute);

module.exports = app;