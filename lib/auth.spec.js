const expect = require('chai').expect;
const requestMock = require('express-request-mock');
const proxyquire = require('proxyquire').noPreserveCache();
let authHandler = require('./auth');
let req, res, proxyConfig = {};

describe("auth Handler integration tests", () => {

    it('calls twitter and gets an oauth token', (done) => {
        requestMock(authHandler, {})
            .then((mock) => {
                const res = mock.res;
                expect(res).to.be.a('object');
                const resData = JSON.parse(res._getData());
                expect(resData).to.be.a('object');
                expect(resData).to.have.a.property('oauth_token');
                expect(resData.oauth_token).to.be.a('string');
                expect(resData.oauth_token).to.not.be.empty;
        }).then(done);
    });

    it('returns a 500 when you send it a bad key', (done) => {
        authHandler = proxyquire('./auth', {'ih-config': proxyConfig});
        proxyConfig.get = (string) => {'foobar'};

        requestMock(authHandler, {})
        .then((mock) => {
            expect(mock.res.statusCode).to.equal(500);
        }).then(done);
    })
})