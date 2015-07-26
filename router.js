var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring")
var commonHeaders = {'Content-Type' : 'text/html'};

// Handle the http route GET / and POST / i.e. home.
	function home(request, response) {
	//if url == "/" && GET
	if(request.url === "/") {
		if(request.method.toLowerCase() === "get") { 
		//show search field 
		response.writeHead(200, commonHeaders);
  		renderer.view("header",{},response);
  		renderer.view("search",{},response);
  		renderer.view("footer",{},response);
		response.end();
	} else {
		//if url == '/' && POST
			//get post data from body
			request.on("data", function(postBody) {
				//extract the username
				console.log(postBody.toString());
				var query = querystring.parse(postBody.toString());
				response.writeHead(303,{"Location": "/" + query.username});
				response.end();
			});
			
			//redirect to /username

	}
}
	
}
//  Handle the http route GET / username
	function user(request,response) {

	//if url == "/...."
	var username = request.url.replace("/", "");
		if(username.length > 0) { 
			response.writeHead(200, commonHeaders);
  			rendereer.view("header",{},response);
  			//get json from Treehouse
  			var studentProfile = new Profile(username);
  			//on "end"
  			studentProfile.on("end", function(profileJSON) {
  				//show profile

  				//show value that we need.
  				var values = {
  						avatarUrl: profileJSON.gravatar.url,
  						username: profileJSON.profile_name,
  						badges: profileJSON.badges.length,
  						javascriptPoints: profileJSON.points.Javascript
						}
				//simple response
				rendereer.view("profile",values,response);
				rendereer.view("footer",{},response);
				response.end();
  			});
  				//on "error"
  			studentProfile.on("error", function(error) {
  				// show error
  				rendereer.view("error",{errorMessage: error.message},response);
				rendereer.view("search",{},response);
				rendereer.view("footer",{},response);
				response.end();
  			} );
				
  		response.write(username + "\n")
  		response.end("Footer\n")
		}
	}
		
			
				
			

module.exports.home = home;
module.exports.user = user;