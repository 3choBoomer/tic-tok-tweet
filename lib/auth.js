const config = require('ih-config');
const Twitter = require('twitter-lite');


module.exports = function(req, res){
    const client = new Twitter({
        consumer_key: config.get('twitterApiKey'),
        consumer_secret: config.get('twitterApiSecret')
    });

    return client.getRequestToken("http://callbackurl.com")
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
            console.log('in error');
            res.sendStatus(500);
        });
};
