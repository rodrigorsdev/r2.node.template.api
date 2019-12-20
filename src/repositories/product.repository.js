'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Product');

exports.get = async () => {
    const res = await Model.find({
        active: true
    }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Model
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.getById = async (id) => {
    const res = await Model
        .findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = Model
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.create = async (data) => {
    var model = new Model(data);
    await model.save();
}

exports.update = async (id, data) => {
    await Model
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async (id) => {
    await Model
        .findOneAndRemove(id);
}