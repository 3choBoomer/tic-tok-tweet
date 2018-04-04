const config = require('ih-config');
const Twitter = require('twitter-lite');
const crypto = require('crypto');

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

module.exports = {
    getRequestToken: getRequestToken,
    getAccessToken: getAccessToken
}

function getRequestToken(req, res){
    const client = new Twitter({
        consumer_key: config.get('twitterApiKey'),
        consumer_secret: config.get('twitterApiSecret')
    });
    let callbackUrl = config.get('oauthCallbackUrl');
    return client.getRequestToken(callbackUrl)
        .then((resp) => {
            /*This is a hack around the twitter-lite library not handling errors correctly.
            The returned object has a JSON string as the property name o_O
            { 
                '{"errors":[{"code":32,"message":"Could not authenticate you."}]}': '' 
            }
            */
            if(Object.keys(resp).some((k)=>{ return ~k.indexOf('errors') })){
                res.sendStatus(500);
            }
            res.json(resp);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
};

function getAccessToken(req, res){
    const client = new Twitter({
        consumer_key: config.get('twitterApiKey'),
        consumer_secret: config.get('twitterApiSecret')
    });
    if (!req || !req.body || !req.body.oauth_token || !req.body.oauth_verifier){
        res.status(400).json({'error': 'a body with both an oauth_verifier and oauth_token is required'});
    }
    const oauth_verifier = req.body.oauth_verifier;
    const oauth_token = req.body.oauth_token;

    const secret = sha256(oauth_token+oauth_verifier);
    
    return client.getAccessToken({
        key: oauth_token,
        secret: secret,
        verifier: oauth_verifier})
        .then((resp) => {
            /*This is a hack around the twitter-lite library not handling errors correctly.
            The returned object has a JSON string as the property name o_O
            { 
                '{"errors":[{"code":32,"message":"Could not authenticate you."}]}': '' 
            }
            */
            if(Object.keys(resp).some((k)=>{ return ~k.indexOf('errors') })){
                res.sendStatus(500);
            }
            res.json(resp);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
};