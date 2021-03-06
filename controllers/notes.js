/*controller for notes*/

var Note = require("../models/Note");
var makeDate = require("../models/date");

module.exports = {
	get: function(data, cb){
		Note.find({
			_headlineId: data._id}, cb);
	},

	/* save a note*/
	save: function(data, cb){
		var newNote = {
			_headlineId: data._id,
			date: makeDate(),
			noteText: data.noteText
		};
		/*save the newNote we made to mongoDB w/mongoose's save fun*/
		Note.create(newNote, function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				console.lg(doc);
				cb(doc);
			}
		});
	},
	delete: function(data, cb){
		Note.remove({
			_id: data._id
		}, cb);
	}
};

