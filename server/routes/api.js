var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Movie = require("../models/movie");

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Express RESTful API');
});

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

  router.use('/player/:movieId',(req, res, next) => {
    Movie.findById(req.params.movieId, (err, movie) => {
      if (err) {
        res.status(500).send(err);
      } else if (movie) {
        req.movie = movie;
        next();
      } else {
        res.status(404).send('moive not found');
      }
    })
  })

  // add video id parameter and implement socket
  router.get('/player/:movieId', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log(req)
    console.log(req.headers)
    var token = getToken(req.headers);
    if (token) {

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
