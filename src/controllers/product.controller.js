'use strict';

const repository = require('../repositories/product.repository');
const ValidationContract = require('../validators/fluent.validator');


exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'get error', data: e });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'getBySlug error', data: e });
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'getById error', data: e });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'getByTag error', data: e });
    };
};

exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.title, 3, 'title must be 3 or more');

        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        await repository.create(req.body);
        res.status(201).send({ message: 'post success' });
    } catch (e) {
        res.status(500).send({ message: 'post error', data: e });
    };
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'put success' });
    } catch (e) {
        res.status(500).send({ message: 'put error', data: e });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: 'delete success' });
    } catch (e) {
        res.status(500).send({ message: 'delete error', data: e });
    };
};