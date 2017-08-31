const express = require('express');
const router = express.Router();

const twitchOauth = require('../twitchOauth/oauth')

router.get('/', function(req, res) {
	res.json({message: 'The server is working!'});
});

router.get('/twitch/:code', twitchOauth.grabTwitchData);

module.exports = router;
