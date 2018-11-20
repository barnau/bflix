const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Movie = require('../models/movie');
const TvShow = require('../models/tvshow');
//const upload = require('./upload')
const Image = require('../models/image');
const path = require('path');
const multer = require('multer');

const DIR = './src/assets/images/'
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

//var upload = multer({storage: storage}).single('photo');


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

  // ADD A MOVIE
  router.post('/movie', passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      var newMovie = new Movie({
        location: req.body.location,
        title: req.body.title,
        director: req.body.director,
        posterLocation: req.body.posterLocation,
        synopsis: req.body.synopsis,
        genre: req.body.genre
      });

      newMovie.save(function(err) {
        if (err) {
          console.log('save failed');
          console.log(err);
          return res.json({success: false, msg: 'Save movie failed.'});
        }
        console.log('save succeeded')
        res.json({success: true, msg: 'Successful created new movie.'});
      });
    } else {
      console.log('no token attached to request')
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  // MIDDLE WEAR ATTACH MOVIE
  router.use('/movie/:id',(req, res, next) => {
    console.log('editmovie middle wear hit. id: ' + req.params.id)
    Movie.findById(req.params.id, (err, movie) => {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else if (movie) {
        console.log(movie)
        req.movie = movie;
        next();
      } else {
        res.status(404).send('movie not found');
      }
    })
  })

  // EDIT MOVIE
  router.put('/movie/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);

    if (token) {
      console.log(req.movie);
      console.log("---------------------------");
      console.log(req.body);

      req.movie.location = req.body.location;
      req.movie.title = req.body.title;
      req.movie.director = req.body.director;
      req.movie.posterLocation = req.body.posterLocation;
      req.movie.synopsis = req.body.synopsis;
      req.movie.genre = req.body.genre;

      console.log(req.movie)
      req.movie.save((err) => {
        if(err) console.log(err)
        else {
          console.log('Updated movie')
          return res.status(200).send({success: true, msg: 'Updated movie.'})
        }
      })
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

  // GET TV SHOW BY ID
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

  // POST UPLOAD IMAGE
  // router.post('/upload', passport.authenticate('jwt', { session: false}), upload )
  router.post('/upload', upload.single('photo'), (req, res, next) => {
    console.log('upload route hit')
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      var srcPath = "/" + req.file.path.replace(/\\/g,"/");
      console.log(srcPath);
      return res.send({
        success: true,
        imgPath: srcPath
      })
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
