const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    location: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
  });

  const SeasonSchema = new Schema({
    seasonNumber: {
      type: String,
      required: false
    },
    episodes: {
      type: [EpisodeSchema],
    }
  });

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
      type: [SeasonSchema]
    }

});

module.exports = mongoose.model('TvShow', TvShowSchema );