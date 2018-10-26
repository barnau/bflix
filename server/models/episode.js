var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpisodeSchema = new Schema({
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Episode', EpisodeSchema);
