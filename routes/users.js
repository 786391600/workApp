var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render("admin/index")
});
router.get('/show', function(req, res, next) {
    res.render("admin/show")
});
router.get('/login', function(req, res, next) {
    res.send("login");
});

module.exports = router;
