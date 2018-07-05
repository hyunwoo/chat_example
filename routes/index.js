var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/three', function(req, res, next) {
    res.render('three', { title: 'Express' });
});

router.get('/textfinder', function(req, res, next) {
    res.render('textFinder', { title: 'Express' });
});

module.exports = router;
