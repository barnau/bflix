var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Season = require('./season');



var TvShowSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
      type: String,
      required: false
    },
    posterLocation: {
      type: String,
      required: true
    },
    horizontalPosterLocation: {
      type: String,
      required: true
    },
    genre: {
        type: String,
        required: true
    },
    seasons: {
      type: [Season]
    }

});



// var SeasonSchema = new Schema({
//   seasonNumber: {
//     type: String,
//     required: false
//   },
//   episodes: {
//     type: [EpisodeSchema],
//     required: true
//   }
// });

module.exports = mongoose.model('TvShow', TvShowSchema);
// module.exports = mongoose.model('Season', SeasonSchema);
// module.exports = mongoose.model('Episode', EpisodeSchema);
