//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

const mysql = require('mysql');
const _     = require('lodash');

class Repo {
    constructor(connection) {
        this.connection = connection;
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT email, phone_number FROM directory', (err, results) => {
                if (err) {
                    return reject(new Error(`An error occured getting the users ${err}`));
                }

                resolve((results || []).map((user) => {
                    return {
                        email      : user.email,
                        phoneNumber: user.phone_number
                    };
                }));
            });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT email, phone_number FROM directory WHERE email = ? LIMIT 1', [email], (err, results) => {

                if (err) {
                    return reject(new Error(`An error occured getting the user: ${err}`));
                }

                if (!results.length) {
                    resolve(undefined);
                } else {
                    resolve({
                        email      : _.head(results).email,
                        phoneNumber: _.head(results).phone_number
                    });
                }
            });
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.connect = (connectionSettings) => {
    return new Promise((resolve, reject) => {
        if (!connectionSettings.host) {
            throw new Error('A host must be specified.');
        }

        if (!connectionSettings.user) {
            throw new Error('A user must be specified.');
        }

        if (!connectionSettings.password) {
            throw new Error('A password must be specified.');
        }

        if (!connectionSettings.port) {
            throw new Error('A port must be specified.');
        }

        resolve(new Repo(mysql.createConnection(connectionSettings)));
    });
}