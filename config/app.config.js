let defaultPort = 8000;
module.exports = {
    PORT: defaultPort,
    twitterApiKey: "SECRET_KEY",
    twitterApiSecret: "SECRET_SECRET",
    oauthCallbackUrl: 'http://localhost:'+defaultPort+'/oauthCallback'
}