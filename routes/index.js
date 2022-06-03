var express = require('express');
var router = express.Router();

router.get('/heartbeat', function (req, res, next) {
  res.send('Server is up and runniing');
});

module.exports = router;
