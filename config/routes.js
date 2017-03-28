//server routes

//bring in the scrape function from our scripts directory
var scrape = require("../scripts/scrape");

//bring headlines and notes from the controller
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.export = function(router) {
    //this route renders the homeage
    router.get("/", function(req, res) {
        res.render("home")
    });

    //this route renders the saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    //this route handles scraping more articles to add to our db
    router.get("api/fetch", function(req, res) {
        //this method inside the headlinesController will try & scrape new articles
        //& save unique ones to the database
        headlinesController.fetch(function(err, docs) {
            //if no articles back, likely there are no new unique articles, send this message back to the user
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "There is no new articles today. Check tomorrow!"
                });
            }
            //otherwise send back a count of how many new articles we got
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles, YEAH!"
                });
            }
        });
    });
    //this route handles getting all headlines from our database
    router.get("api/headlines", function(req, res) {
        /*if the client specifies a saved query parameter, ie"/api/headlines/?saved=true"
        	which is translated to just {saved: true } on req.query,
        	then set the query obj equal to this*/
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        /*runt he headlinesController get method & pass in whether we want saved, unsaved or
          all headlines by default*/
        headlinesController.get(query, function(data) {
            //send the article data back as JSON
            res.json(data);
        });
    });
    //this route handles deleting a specified headline
    router.delete("/api/headlines/:id", function(req, res){
    	var query = {};
    	//set the _id property of the query obj to the id in req.params
    	query._id = req.params.id;

    	/*run the headlinesController delete method & pass in our query obj containint the id of the headline we want to delete*/
    	headlinesController.delete(query, function(err, data){
    		/*send the result back as JSON to be handled client side*/
    		res.json(data);
    	});
    });

    /*this route handles updating a headline, in particular saving one*/
    router.patch("/api/headlines", function(req, res){
    	/*construct a query object to send to the headlinesController with the id of the headline to be saved*/
    	/*we are using req.body here instead of req.params to make this route easier to change if we ever want to update a headline in any way except saving it*/
    	headlinesController.update(req.body, function(err, data){
    		/*send the result back to the user*/
    		res.json(data);
    	});
    });

    /*this route handles getting notes for a particular headline id*/
    router.get("/api/notes/:headline_id?", function(req, res){
    	var query = {};
    	if(req.params.headline_id){
    		query._id = req.params.headline_id;
    	}

    	/*get all notes that match our query using the notesController get mether*/
    	notesController.get(query, function(err, data){
    		/*send the note data back to the user as JSON*/
    		res.json(data);
    	});
    });
    /*this route handles deleting a note of a particular note id*/
    router.delete("/api/notes/:id", function(req, res){
    	var query = {};
    	query._id = req.params.id;

    	/* use the check fun from the headlines controller, this checks all of our articles, sorted by id number */
    	notesController.delete(query, function(err, data){
    		res.json(data);
    	});
    });
    /*this route handles saving a new note*/
    router.post("/api/notes", function(req, res){
    	notesController.save(req.body, function(data){
    		res.json(data);
    	});
    });
};
