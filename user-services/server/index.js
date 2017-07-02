'use strict';

const express = require('express');
const morgan  = require('morgan');

module.exports.start = (options) => {
    return new Promise((resolve, reject) => {

        if (!options.repository) {
            throw new Error('A server must be started with a connected repository.');
        }

        if (!options.port) {
            throw new Error('A server must be started with a port.');
        }

        const app = express();
        app.use(morgan('dev'));

        require('../api/handlers/users')(app, options);

        const server = app.listen(options.port, () => {
            resolve(server);
        });

    });
}