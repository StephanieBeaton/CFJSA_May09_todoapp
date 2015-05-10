'use strict';

var http = require('http');
var unicornRoutes = require('./lib/unicorn_routes');

var routes = {};
routes['/data/data.json'] = unicornRoutes;

var server = http.createServer(function(req, res) {

  console.log("req.url = " + req.url);

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
