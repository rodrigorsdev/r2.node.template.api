'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
    return await jwt.verify(token, global.SALT_KEY);
}

exports.authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'not authorized'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'invalid  token'
                });
            }else{
                next();
            }
        });
    }
}