var User = require('./models/user');
var Movie = require('./models/movie');
//var TvShow = require('./models/tvshow');
// var Episode = require('./models/episode');
// var Season = require('./models/season');
var TvShow = require('./models/tvshow');
var mongoose = require('./config/connection');
var exampleVideoLocation = "http://static.videogular.com/assets/videos/videogular.mp4";

var saveCallback = (err) => {
  if(err)
    console.log(err)
  else
    console.log('Saved...')
}

// TvShow.find({}, (err, shows) => {
//   if(err) console.log(err)
//   else {
//     shows.forEach(element => {
//       element.seasons.forEach(episode => {
//         console.log(episode);
//       })
//     });
//   }
// })

// var castlerock = new TvShow({
//   title: "Castle Rock",
//   synopsis: "After watching the first season I'm not really sure. Maybe the devil. Alternate realities possibly? Still pretty cool. Confusing though.",
//   posterLocation: "https://image.ibb.co/nF7Uqq/theaffair.jpg",
//   horizontalPosterLocation: "tbd",
//   genre: 'horror',
//   seasons: [
//     {
//       seasonNumber: "Season One",
//       episodes: [
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E01.Severance.mkv',
//           name: "Severance"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E02.Habeas.Corpus.mkv',
//           name: "Habeas Corpus"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E03.Local.Color.mkv',
//           name: "Local Color"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E04.The.Box.mkv',
//           name: "The Box"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E05.Harvest.mkv',
//           name: "Harvest"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E06.Filter.mkv',
//           name: "Filter"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E07.The.Queen.mkv',
//           name: "The Queen"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E08.Past.Perfect.mkv',
//           name: "Past Perfect"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E09.Henry.Deaver.mkv',
//           name: "Henry Deaver"
//         },
//         {
//           location: '/assets/tvshows/castlerock/s01/Castle.Rock.S01E10.Romans.mkv',
//           name: "Romans"
//         }
//       ]
//     }
//   ]
// })

// castlerock.save(saveCallback);

// var theaffair = new TvShow({
//   title: "The Affair",
//   synopsis: "Not really sure. For my wife. Enjoy boo.",
//   posterLocation: "https://image.ibb.co/hYJF1V/the-affair-poster-cropped.jpg",
//   horizontalPosterLocation: "tbd",
//   genre: 'drama',
//   seasons: [
//     {
//       seasonNumber: "Season One",
//       episodes: [
//         {
//           location: exampleVideoLocation,
//           name: "Episode One"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Two"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Three"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Four"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Five"
//         }
//       ]
//     },
//     {
//       seasonNumber: "Season Two",
//       episodes: [
//         {
//           location: exampleVideoLocation,
//           name: "Episode One"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Two"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Three"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Four"
//         },
//         {
//           location: exampleVideoLocation,
//           name: "Episode Five"
//         }
//       ]
//     }
//   ]
// })

// theaffair.save(saveCallback);



// TvShow.findOne({title: "Castle Rock"}, (err, tvshow) => {
//   if(err) console.log(err)
//   else {
//    tvshow.posterLocation = "https://image.ibb.co/fBdYiA/castlerock.jpg";
//    tvshow.horizontalPosterLocation = "https://image.ibb.co/ey1ZtA/castle-rock.jpg"
//       // tvshow.synopsis = "Get ready for some serious drama, ladies";
//    tvshow.save(saveCallback);
//   }
// })

  // var admin = User({
  //     username: 'admin',
  //     password: 'password',
  //     fullAccess: true
  // });

  // admin.save((err) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('user saved')
  //   }
  // })



//   User.findOne({username: 'blainearnau@gmail.com'}, (err, user) => {

//     if(!err) {
//         console.log(user.username)
//         user.fullAccess = false;
//         user.save();
//         console.log(user.fullAccess)
//     } else {
//         console.log(err)
//     }
//   });

  // var users = User.find({}, (err, users) => {
  //     console.log(' ')
  //     console.log('Here are all users..')

  //     if(err) {
  //       console.log('No users found')
  //       return;
  //     }

  //     users.forEach((user) => {
  //       console.log('username:' + user.username);
  //       console.log('full access:' + user.fullAccess);
  //       console.log('   ');
  //       if(user.username !== adminUser.username && !user.fullAccess === undefined) {
  //           user.fullAccess = false;
  //           user.save((err) => {
  //               if(!err) {
  //                   console.log('Updated full access off for ' + user.username);
  //               }
  //           })
  //       }
  //       })
  // });


  // MOVIES


  // Movie.findOne({title: "Solo"}, (err, movie) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('Movie found. Updating: ' + movie);
  //     movie.location = '/assets/movies/solo/solo.mp4'

  //     movie.save(saveCallback);
  //   }
  // })

  // TvShow.find({},(err, movies) => {
  //   if(err) console.log(err);
  //   else {
  //     movies.forEach(movie => {
  //       console.log(movie);
  //     })
  //   }

  // })

 

// ADD A MOVIE
  // var theconjuring = Movie({
  //   location: exampleVideoLocation,
  //   genre: 'horror',
  //   title: "The Conjuring",
  //   director: "James Wan",
  //   posterLocation: "https://image.ibb.co/jr5frL/theconjuring.jpg",
  //   synopsis: "Ghosts man! But posessions too! And jump scares! Gets you so good!"
  // })

  // theconjuring.save(err => {
  //   if (err)
  //     console.log(err)
  //   else
  //     console.log('saved the conjuring')
  // })

  // var insidious = Movie({
  //   location: exampleVideoLocation,
  //   genre: 'horror',
  //   title: "Insidious",
  //   director: "James Wan",
  //   posterLocation: "https://image.ibb.co/fQv3PU/insidious.jpg",
  //   synopsis: "This movie also is about ghosts"
  // })

  // insidious.save(err => {
  //   if (err)
  //     console.log(err)
  //   else
  //     console.log('saved insidious')
  // })

  // var solo = Movie({
  //   location: exampleVideoLocation,
  //   title: "Solo",
  //   director: "Ron Howard",
  //   posterLocation: "https://image.ibb.co/bGALY0/Solo-character-poster-2.jpg",
  //   synopsis: "Should be called Chewbaca. Young Han is lame and young Chewie rules.",
  //   genre: 'scifi'
  // })

  //   var mandy = Movie({
  //   location: "/assets/movies/mandy/mandy.mp4",
  //   title: "Mandy",
  //   director: "Panos Cosmatos",
  //   posterLocation: "https://image.ibb.co/e1xra0/mandy.jpg",
  //   synopsis: "Stylish revenge film. Think John Carpenter meets Fear and Loathing",
  //   genre: 'action'
  // })

  // mandy.save(saveCallback);

  var theequalizer2 = Movie({
    location: "/assets/movies/theequalizer2/theequalizer2.mp4",
    title: "The Equalizer 2",
    director: "Antoine Fuqua",
    posterLocation: "https://image.ibb.co/gsBfs0/theequalizer2.jpg",
    synopsis: "Robert McCall serves an unflinching justice for the exploited and oppressed, but how far will he go when that is someone he loves?",
    genre: 'action'
  })

  theequalizer2.save(saveCallback);
  
  // missionimpossible.save(err => {
  //   if(err)
  //     console.log(err)
  //   else
  //     console.log('saved solo')
  // })

  // var thenun = Movie({
  //   location: "/assets/movies/thenun/thenun.avi",
  //   title: "The Nun",
  //   director: "Corin Hardy",
  //   posterLocation: "https://image.ibb.co/kZppXf/thenun.jpg",
  //   synopsis: "Satanic nun! Sounds horrifying!",
  //   genre: 'horror'
  // });

  // var crazyrichasians = Movie({
  //   location: "/assets/movies/crazyrichasians/crazyrichasians.avi",
  //   title: "Crazy Rich Asians",
  //   director: "Jon M. Chu",
  //   posterLocation: "https://image.ibb.co/bTn9AA/crazyrichasians.jpg",
  //   synopsis: "This contemporary romantic comedy, based on a global bestseller, follows native New Yorker Rachel Chu to Singapore to meet her boyfriend's family.",
  //   genre: 'Comedy'
  // });
  
  // crazyrichasians.save(saveCallback);

  // var icanonlyimagine = Movie({
  //   location: "/assets/movies/icanonlyimagine/icanonlyimagine.mp4",
  //   title: "I Can Only Imagine",
  //   director: "Andrew Erwin",
  //   posterLocation: "https://image.ibb.co/fOg83V/icanonlyimagine.jpg",
  //   synopsis: "The inspiring and unknown true story behind MercyMe's beloved, chart topping song that brings ultimate hope to so many is a gripping reminder of the power of true forgiveness.",
  //   genre: 'Drama'
  // });

  // icanonlyimagine.save(saveCallback);




  
  // newMovie.save((err) => {
  //   if(err) {
  //     console.log('there was an error saving this movie.')
  //   } else {
  //     console.log('Added ' + newMovie.title)
  //   }
  // })

  // Movie.findOne({title: "Insidious"}, (err, movie) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('Movie found. Updating: ' + movie);
  //     movie.location = 'http://static.videogular.com/assets/videos/videogular.mp4'
  //     movie.save(err => {
  //       if(err)
  //         console.log('Problem saving. Err: ' + err)
  //       else
  //         console.log('updated move: ' + movie.title)
  //     })
  //   }
  // })

  // Movie.findOne({title: "Solo"}, (err, movie) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('Movie found. Updating: ' + movie);
  //     movie.location = 'http://static.videogular.com/assets/videos/videogular.mp4'
  //     movie.save(err => {
  //       if(err)
  //         console.log('Problem saving. Err: ' + err)
  //       else
  //         console.log('updated move: ' + movie.title)
  //     })
  //   }
  // })

  // Movie.findOne({title: "The Conjuring"}, (err, movie) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('Movie found. Updating: ' + movie);
  //     movie.location = 'http://static.videogular.com/assets/videos/videogular.mp4'
  //     movie.save(err => {
  //       if(err)
  //         console.log('Problem saving. Err: ' + err)
  //       else
  //         console.log('updated move: ' + movie.title)
  //     })
  //   }
  // })

  // GET ALL MOVIES

  // Movie.find(function (err, movie) {
  //   if (err) Console.log(err)
  //   console.log('movies found')
  //   console.log(movie);
  // });

  // Add a TV Show

  


  // var seasons = [
  //   new Season({
  //     seasonNumber: "Season One",
  //     episodes: episodes
  //   })
  // ]


  // var castlerock = new TvShow({
  //   title: "Castle Rock",
  //   synopsis: "After watching the first season I'm not really sure. Maybe the devil. Alternate realities possibly? Still pretty cool. Confusing though.",
  //   genre: "horror",
  //   posterLocation: "https://image.ibb.co/ey1ZtA/castle-rock.jpg",
  //   seasons: seasons
  // })

  // castlerock.save(err => {
  //   if(err)
  //     console.log(err)
  //   else
  //     console.log("Castle Rock saved.")
  // })


