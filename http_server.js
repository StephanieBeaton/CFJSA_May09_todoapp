'use strict';

var http          = require('http');
var CRUDRoutes    = require('./lib/CRUD_routes');
var get_CSS_js_img = require('./lib/get_CSS_js_img_file');

var routes = {};
routes['/data/data.json']      = CRUDRoutes;



var server = http.createServer(function(req, res) {

  var splitUrl = req.url.split(".");

  var fileExtension = splitUrl[splitUrl.length - 1];


   if (req.url === '/'       ||
     fileExtension === "css" ||
     fileExtension === "js"  ||
     fileExtension === "img" ||
     fileExtension === "html") {

       get_CSS_js_img(req, res);
   }

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
