var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

router.get('/:module/:name', function(req, res) {
  var module = req.params.module,
      name = req.params.name
  res.render('partials/' + module + '/' + name);
});

module.exports = router;