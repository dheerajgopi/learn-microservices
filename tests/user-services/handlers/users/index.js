'use strict';

const supertest      = require('supertest');
const chai           = require('chai');
const expect         = chai.expect;
const url            = 'localhost:8080';
const api            = supertest(url);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('#Users API', () => {
    describe('#users', () => {
        it('should return all users', (done) => {
            api
            .get('/users')
            .end((err, res) => {
                expect(res.status).eq(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    describe('#search', () => {
        it('should return user details for known user', (done) => {
            api
            .get('/search?email=homer@thesimpsons.com')
            .end((err, res) => {
                expect(res.status).eq(200);
                expect(res.body).to.be.an('object');
                done();
            });
        });

        it('should return 404 for unknown user', (done) => {
            api
            .get('/search?email=someone@something.com')
            .end((err, res) => {
                expect(res.status).eq(404);
                done();
            });
        });
    });
});
