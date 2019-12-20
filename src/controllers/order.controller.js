'use strict';

const guid = require('guid');
const repository = require('../repositories/order.repository');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'get error', data: e });
    }
};

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({ message: 'post success' });
    } catch (e) {
        res.status(500).send({ message: 'post error', data: e });
    };
};