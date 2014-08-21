var express = require('express');
var router = express.Router();

// Model
var Beer = require('../../app/models/beer');

/* Default route */
router.route('/beers')
  
  // Creates a beer (accessed at POST /api/beers)
  .post(function(req, res){
    var beer = new Beer();
    beer.name = req.body.name;
    beer.type = req.body.type;

    // save the beer and check for errors
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Beer created!' }); 
    });
  })

  // Get all beers (accessed at GET /api/beers)
  .get(function(req, res){
    Beer.find(function(err, beers) {
      if (err)
          res.send(err);

      res.json(beers);
    });
  });

router.route('/beers/:beer_id')
  
  // Get the beer by id (accessed at GET /api/beers/:beer_id)
  .get(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
      if (err)
        res.send(err)

      res.json(beer);
    });
  })

  // Update the beer with this id (accessed at PUT /api/beers/:beer_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Beer.findById(req.params.beer_id, function(err, beer) {
      if (err)
        res.send(err);

      beer.name = req.body.name;
      beer.type = req.body.type;

      // save the Beer
      beer.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Beer updated!' });
      });

    });
  })

  // delete the beer with this id (accessed at DELETE /api/beers/:beer_id)
  .delete(function(req, res) {
    Beer.remove({
      _id: req.params.beer_id
    }, function(err, beer) {
      if (err)
        res.send(err);

      res.json({ message: 'Beer deleted' });
    });
  });

module.exports = router;