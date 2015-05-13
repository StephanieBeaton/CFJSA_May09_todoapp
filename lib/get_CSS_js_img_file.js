'use strict';

var fs = require('fs');

module.exports = function(req, res) {
  console.log("inside get_CSS_js_img_html.js");
  console.log("req.method = " + req.method);

  console.log("req.url = " + req.url);

  console.log("res = " + res);

  // read file  '../data-json.html'
  if (req.method === 'GET') {

    if (req.url === "/") {

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      });

    } else {

      var splitUrl = req.url.split(".");

      console.log("splitUrl = " + splitUrl);

      var fileExtension = splitUrl[splitUrl.length - 1];

      console.log("fileExtension = " + fileExtension);

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
      file = "data-json.html";
    } else {
      file = req.url.slice(1);
    };

    console.log("file = " + file);

    // fix to read JSON file here
    var fileContent = fs.readFileSync(file);

    res.write(fileContent);

    res.end();
  } // end of GET

};
