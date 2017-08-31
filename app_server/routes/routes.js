const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'The server is working!'});
});

module.exports = router;