'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Order');

exports.get = async () => {
    const res = await Model
        .find({}, 'number status')
        .populate('customer', 'name')
        .populate('itens.product', 'title');
    return res;
}

exports.create = async (data) => {
    var model = new Model(data);
    await model.save();
}