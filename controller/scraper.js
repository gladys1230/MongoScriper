//require cheerio
var cheerio = require("cheerio");

//get html
var request = require("request");

//use article model
var Article = require("../models/Article");

//define the site we want to scrape
var website = 'https://www.wired.com/latest-news';

function scrapeWeb(callback){
	request(website, function(error, response, html){
		if(error) console.log("Error Scraping", error);

		//then, we load that into cheerio and save it to $ for a shorthand selector
		var $ = cheerio.load(html);

		//target articles by tag
		$("ul.col li a").each(function(i, element){
			//add the text and href of every link, and save them as properties of the result obj

			var title = $(this).children("div").children("h2").text();
			var link = $(this).attr("href");

			var scrapeArticle = new Article({
				title: title,
				link: link
			});

			//save the Article
			scrapeArticle.save(function(error){
				if(error){
					console.log("unable to save article", error);
				}
			});
		});

		callback();
	});
}
//expot the scraps
exports.scrapedWeb = scrapedWeb;