//global bootbox
$(document).ready(function(){
	var articleContainer = $(".article-container");
	$(document).on("click", ".btn.save", handleArticleSave);
	$(document).on("click", ".scrape-new", handleArticleScrape);

	//once page is ready, run the initPage function to kick things started
	initPage();

	function initPage(){
		articleContainer.empty();
		$.get("/api/headlines?saved=false")
		.then(function(data){
			if(data && data.length){
				renderArticles(data);
			}else{
				renderEmpty();
			}
		});
	}
	function renderArticles(articles){
		var articlepanels = [];
		for(var i = 0; i < articles.length; i++){
			articlePanels.push(createPanel(articles[i]));
		}
		articleContainer.append(articlePanels);
	}

	function createPanel(article){
		var panel =
		$(["<div class ='panel panel-default'>",
			"<div class='panel-heading'>",
			"<h3>",
			article.headline,
			"<a class ='ben btn-success save'>",
			"Save Article",
			"</a>",
			"</h3>",
			"</div>",
			"<div class='panel-body'>",
			article.summary,
			"</div>",
			"</div>"].join(""));
			panel.data("_id", article._id);
			return panel;
	}

	function renderEmpty() {
    // This function renders some HTML to the page explaining we don't have any articles to view
    // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join(""));
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave(){
  	var articleToSave = $(this).parents(".panel").data();
  	articleToSave.saved = true;
  	$.ajax({
  		method: "PATCH",
  		url: "/api/headlines",
  		data: articleToSave
  	})
  	.then(function(data){
  		if(data.ok){
  			initPage();
  		}
  	});
  }
  function handleArticleScrape(){
  	$.get("/api/fetch")
  	.then(function(data){
  		initPage();
  		bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
  	});
  }
});