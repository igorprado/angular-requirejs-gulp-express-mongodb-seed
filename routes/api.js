/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();
var app = require('../app');

// API modules
var beers = require('./api/beers');

// Register all modules here
router.use(beers);

module.exports = router;
