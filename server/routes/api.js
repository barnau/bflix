var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Movie = require("../models/movie");
var TvShow = require("../models/tvshow");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Express RESTful API');
});

// SIGNUP
router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        fullAccess: false
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

  //LOGIN
  router.post('/signin', function(req, res) {
    console.log(req);
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({success: true, fullAccess: user.fullAccess, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

  // ADD MOVIE
  router.post('/movie', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      console.log(req.body);
      var newMovie = new Movie({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
      });

      newMovie.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save movie failed.'});
        }
        res.json({success: true, msg: 'Successful created new movie.'});
      });
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  // GET ALL MOVIES
  router.get('/movie', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req)
    console.log(req.headers)
    var token = getToken(req.headers);
    if (token) {
      Movie.find(function (err, movie) {
        if (err) return next(err);
        console.log('movies found')
        console.log(movie);
        res.json(movie);
      });
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  // MIDDLE WEAR AUTO ATTACH MOVIE
  router.use('/player/:movieId',(req, res, next) => {
    console.log('player middle wear hit. id: ' + req.params.movieId)
    Movie.findById(req.params.movieId, (err, movie) => {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else if (movie) {
        console.log(movie)
        req.movie = movie;
        next();
      } else {
        res.status(404).send('moive not found');
      }
    })
  })

  

  // add video id parameter and implement socket
  router.get('/player/:movieId', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);

    if (token) {
      console.log(req.movie);
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  //GET ALL TV SHOWS
  router.get('/tvshow', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req)
    console.log(req.headers)
    var token = getToken(req.headers);
    if (token) {
      TvShow.find(function (err, shows) {
        if (err) return next(err);
        console.log('shows found')
        console.log(shows);
        res.json(shows);
      });
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  // MIDDLE WEAR ATTACH TVSHOW
  router.use('/tvshow/:id',(req, res, next) => {
    console.log('player middle wear hit. id: ' + req.params.id)
    TvShow.findById(req.params.id, (err, tvshow) => {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else if (tvshow) {
        console.log(tvshow)
        req.tvshow = tvshow;
        next();
      } else {
        res.status(404).send('moive not found');
      }
    })
  })

  // add 
  router.get('/tvshow/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);

    if (token) {
      console.log(req.tvshow);
      res.json(req.tvshow);
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

module.exports = router;
