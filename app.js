// problem: we need a simple way to look at a user's badge ct etc
// solution use node.js to perform the profile lookups and serve our template via html.

//1. Create a web server
var router = require("./router.js");
var http = require('http');
var renderer = require("./renderer.js")
http.createServer(function (request, response) {
  router.home(request,response);
  router.user(request,response);

}).listen(3000);
console.log('Server running at http:<workspace-url>');




