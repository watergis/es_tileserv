var express = require('express');
var router = express.Router();

const wrap = fn => (...args) => fn(...args).catch(args[2])
router.get('/healthcheck', wrap(require('./healthcheck')));
router.get('/api/tile/:z/:x/:y.:ext', wrap(require('./tile')));
router.get('/api/tile/:tilesets/:z/:x/:y.:ext', wrap(require('./tile-tilesets')));

module.exports = router;
