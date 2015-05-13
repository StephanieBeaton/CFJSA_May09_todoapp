'use strict';

var http          = require('http');
var unicornRoutes = require('./lib/unicorn_routes');
var homePageRoute = require('./lib/homepage_route');
var cssRoutes     = require('./lib/css_route');
var jQueryRoutes  = require('./lib/jquery_route');
var dataJSONRoutes = require('./lib/dataJSON_route');
var get_CSS_js_img = require('./lib/get_CSS_js_img_file');

var routes = {};
routes['/data/data.json']      = unicornRoutes;
// routes['/']                    = homePageRoute;
// routes['/data-json.html']      = homePageRoute;
// routes['/css/c08.css']         = cssRoutes;
// routes['/js/jquery-1.11.0.js'] = jQueryRoutes;
// routes['/js/data-json.js']     = dataJSONRoutes;


var server = http.createServer(function(req, res) {

  console.log("req.url = " + req.url);

  var splitUrl = req.url.split(".");

  console.log("splitUrl = " + splitUrl);

  var fileExtension = splitUrl[splitUrl.length - 1];

  console.log("fileExtension = " + fileExtension);


   if (req.url === '/'
    || fileExtension === "css"
    || fileExtension === "js"
    || fileExtension === "img"
    || fileExtension === "html") {

       get_CSS_js_img(req, res);
   };

  if (typeof(routes[req.url]) === 'function') {
    routes[req.url](req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server listening on PORT 3000');
});
