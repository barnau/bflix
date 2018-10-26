var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EpisodeSchema = require('./episode');

var SeasonSchema = new Schema({
  seasonNumber: {
    type: String,
    required: false
  },
  episodes: {
    type: [EpisodeSchema],
    required: true
  }
});

module.exports = mongoose.model('Season', SeasonSchema);
