const express = require('express');
const app = express();
const path = require('path');
const authHandler = require('./lib/auth');
const bodyParser = require('body-parser');
const config = require('ih-config');
const scheduler = require('./lib/scheduleTweet')

app.use(bodyParser.json())

app.get('/api/requestToken', authHandler.getRequestToken);
app.post('/api/accessToken', authHandler.getAccessToken);
app.post('/api/scheduleTweet', scheduler.scheduleTweet);
app.use(express.static(path.join(__dirname,'/dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(config.get('PORT') || 8000);