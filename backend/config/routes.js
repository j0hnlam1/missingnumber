var userController = require('./../controllers/users.js');
var pokeController = require('./../controllers/pokemons.js');
var gymController = require('./../controllers/gyms.js');
var pokestopController = require('./../controllers/pokestops.js');

module.exports = function(app){

	
    app.get('/findPokemon', function(req, res) {
    	pokeController.find(req, res);
    })
    app.post('/newPokemon', function(req, res) {
      	pokeController.create(req, res);
    })
    app.get('/findGym', function(req, res) {
    	gymController.find(req, res);
    })
    app.post('/newGym', function(req, res) {
      	gymController.create(req, res);
    })
    app.get('/findPokestop', function(req, res) {
    	pokestopController.find(req, res);
    })
    app.post('/newPokestop', function(req, res) {
      	pokestopController.create(req, res);
    })
}