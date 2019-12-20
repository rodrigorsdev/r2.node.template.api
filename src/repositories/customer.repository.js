'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Customer');

exports.get = async () => {
    const res = await Model.find({});
    return res;
}

exports.create = async (data) => {
    var model = new Model(data);
    await model.save();
}

exports.authenticate = async (data) => {
    const res = await Model.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}