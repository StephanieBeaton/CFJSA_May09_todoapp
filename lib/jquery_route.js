'use strict';

var fs = require('fs');

module.exports = function(req, res) {
  console.log("inside jquery_route.js");
  console.log("req.method = " + req.method);

  // read file  '../data-json.html'
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*'
    });

    // fix to read JSON file here
    var fileContent = fs.readFileSync('js/jquery-1.11.0.js')

    res.write(fileContent);

    res.end();
  }

};
