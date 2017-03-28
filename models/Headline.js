// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create headline schema
var headlineSchema = new Schema({
  // title is a required string
  headline: {
    type: String,
    required: true,
    unique: true
  },
  // summary is a required string
  summary: {
    type: String,
    required: true
  },
  // date isjust a string
  date: {
    type: Boolean,
    default: false
  }
});

// Create the Headline model with the headlineSchema
var Headline = mongoose.model("Headline", headlineSchema);

// Export the model
module.exports = Headline;
