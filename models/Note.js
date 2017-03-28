// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var noteSchema = new Schema({
  //the headline is the article associate with the note
  _headlineId: {
  	type: Schema.Types.ObjectId,
  	ref: "headline"
  },

  //date is just a string
  date: String,
  noteText: String
});
// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;