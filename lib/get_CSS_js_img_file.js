'use strict';

var fs = require('fs');

module.exports = function(req, res) {

  // read file  '../data-json.html'
  if (req.method === 'GET') {

    if (req.url === "/") {

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      });

    } else {

      var splitUrl = req.url.split(".");


      var fileExtension = splitUrl[splitUrl.length - 1];


      switch (fileExtension) {
        case "css":
          res.writeHead(200, {
            'Content-Type': 'text/css',
            'Access-Control-Allow-Origin': '*'
          });

          break;
        case "js":
          res.writeHead(200, {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*'
          });
          break;
        case "png":
          res.writeHead(200, {
            'Content-Type': 'img/png',
            'Access-Control-Allow-Origin': '*'
          });
          break;
        case "html":
          res.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
          });
          break;
        default:
          //Statements executed when none of the values match the value of the expression
      };

    };  // end of if else

    var file;

    if (req.url === "/") {
      file = "index.html";
    } else {
      file = req.url.slice(1);
    };


    // fix to read JSON file here
    var fileContent = fs.readFileSync(file);

    res.write(fileContent);

    res.end();
  } // end of GET

};
