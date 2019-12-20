'use strict';

const md5 = require('md5');

const repository = require('../repositories/customer.repository');
const authService = require('../services/auth.services');

const ValidationContract = require('../validators/fluent.validator');

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
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'name must be 3 or more');

        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({ message: 'post success' });
    } catch (e) {
        res.status(500).send({ message: 'post error', data: e });
    };
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({ message: 'wrong user or password' });
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: 'post error', data: e });
    };
};