'use strict';

var fs = require('fs');

module.exports = function(req, res) {
  console.log("inside homepage_route.js");
  console.log("req.method = " + req.method);

  // read file  '../data-json.html'
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*'
    });

    // fix to read JSON file here
    var fileContent = fs.readFileSync('data-json.html')

    res.write(fileContent);

    res.end();
  }

};
