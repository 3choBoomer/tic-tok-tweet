const proxyquire = require("proxyquire").noPreserveCache();
const sinon = require("sinon");
const expect = require("chai").expect;
let sendTweet;

let ProxyTwitter = function Twitter(options) {};

ProxyTwitter.prototype = {
  post: sinon.stub().returns(Promise.resolve({ foo: "bar" }))
};

describe("sendTweet", () => {
  beforeEach(() => {
    sendTweet = proxyquire("./sendTweet", { "twitter-lite": ProxyTwitter });
  });

  it("calls twitter post", () => {
    sendTweet({ tweetText: "foo", oauthToken: "bar", oauthSecret: "baz" })
    .then(() => {
        expect(ProxyTwitter.prototype.post.calledOnce);
      }
    );
  });

  it("returns true", () => {
    sendTweet({ tweetText: "foo", oauthToken: "bar", oauthSecret: "baz" })
    .then(res => {
        expect(res).to.be.equal(true);
      }
    );
  });
});
