'use strcit';

const chai           = require('chai');
const expect         = chai.expect;
const repository     = require('../../../user-services/repository');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('#Repository', () => {
    it('should throw an exception if it is not created with a host, username, password and port', () => {
        return Promise.all([
            expect(repository.connect({
                //host: 'localhost',
                user: 'usr',
                password: 123,
                port: 3307
            })).to.be.rejectedWith(/host/),

            expect(repository.connect({
                host: 'localhost',
                // user: 'usr',
                password: 123,
                port: 3307
            })).to.be.rejectedWith(/user/),

            expect(repository.connect({
                host: 'localhost',
                user: 'usr',
                // password: 123,
                port: 3307
            })).to.eventually.be.rejectedWith(/password/),

            expect(repository.connect({
                host: 'localhost',
                user: 'usr',
                password: 123,
                // port: 3307
            })).to.be.rejectedWith(/port/)
        ]);
    });
});