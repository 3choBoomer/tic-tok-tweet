const expect = require('chai').expect;
const requestMock = require('express-request-mock');
const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
let Twitter = require('twitter-lite');
let authHandler = require('./auth');
let req, res, proxyConfig = {}, proxyTwitterClient = {};

let ProxyTwitter = function Twitter(options) {

  }
  
  ProxyTwitter.prototype = {
    getAccessToken: sinon.stub().returns(Promise.resolve({foo:'bar'}))
  }

describe("Twitter integration tests", () => {

    describe('getRequestToken', () => {
        it('calls twitter and gets an oauth token (Requires valid twitter config values in ./config/app.config.local.js)', (done) => {
            requestMock(authHandler.getRequestToken, {})
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

            requestMock(authHandler.getRequestToken, {})
            .then((mock) => {
                expect(mock.res.statusCode).to.equal(500);
            }).then(done);
        });
    });

    describe('getRequestToken', () => {

        beforeEach(() => {
            authHandler = proxyquire('./auth', {'twitter-lite': ProxyTwitter});
        });

        it('calls the twitter api to get an access token', (done) => {
            requestMock(authHandler.getAccessToken, {body: {oauth_token: 'foo', oauth_verifier: 'bar'}})
                .then((mock) => {
                    const res = mock.res;
                    expect(res).to.be.a('object');
                    const resData = JSON.parse(res._getData());
                    expect(resData).to.be.a('object');
                    expect(resData).to.have.a.property('foo');
                    expect(resData.foo).to.be.a('string');
                    expect(resData.foo).to.be.equal('bar');
                    expect(ProxyTwitter.calledOnce)
            }).then(done);
        });

        it('returns a 400 when you send it a bad request', (done) => {
            requestMock(authHandler.getAccessToken, {})
            .then((mock) => {
                expect(mock.res.statusCode).to.equal(400);
            }).then(done);
        });
    });
})