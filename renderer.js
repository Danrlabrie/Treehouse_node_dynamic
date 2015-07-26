var fs = require("fs");

function mergeValues(values,content) {
	//cycle over keys
		for(var key in values) {
			// replace all {{key}} w/ values from 'values' object
			content = content.replace("{{" + key + "}}", values[key]);
		}
		//return merged content
		return content;
}


function view(templatename,values,response) {
	//Read from the template files
	 var fileContents = fs.readFileSync('./views/' + templatename + 'html', {encoding: "utf8"});
 		 // insert values into the content

	// write out contents to the response
 		 console.log(data);
}
	

module.exports.view = view;