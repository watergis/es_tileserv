var express = require('express');
var router = express.Router();

const wrap = fn => (...args) => fn(...args).catch(args[2])

router.get('/tile/:z/:x/:y.:ext', wrap(require('./tile')));

module.exports = router;
