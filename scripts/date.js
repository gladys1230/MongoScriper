//makeDate script

//this function will make a formatted date for out scraped data
var makeDate = function(){
	var d = new Date();

	var formattedDate = "";

	formattedDate += (d.getMonth() + 1) + "_";
	formattedDate += (d.getDate() + "_");
	formattedDate += d.getFullYear();

	return formattedDate;
};

module.export = makeDate;