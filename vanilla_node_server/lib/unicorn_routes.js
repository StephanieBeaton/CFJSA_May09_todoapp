'use strict';

var fs = require('fs');

module.exports = function(req, res) {
  console.log("inside unicorn_routes.js");
  console.log("req.method = " + req.method);

  if (req.method === 'POST') {
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {

      console.log("inside req.on");
      console.log("input = " + input);

      // fix to concatenate onto JSON file here
      var filename = './data/data.json';
      var fileContent1 = fs.readFileSync(filename);

      console.log("fileContent1 = " + fileContent1);
      var eventsObj = JSON.parse(fileContent1);

      if (eventsObj.length) { console.log("eventsObj has length and is an array.")};

      var inputObj = JSON.parse(input);

      eventsObj.events.push(inputObj);

      console.log("eventsObj = " + eventsObj);

      fs.writeFileSync(filename, JSON.stringify(eventsObj));

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.write(JSON.stringify(eventsObj));
      res.end();
    });
  } else if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    // fix to read JSON file here
    var fileContent2 = fs.readFileSync('./data/data.json');

    console.log("fileContent = " + fileContent2);
    //res.write(JSON.stringify({unicorn: "I'm a happy unicorn! Hooray!"}));
    res.write(fileContent2);

    res.end();
  }
};
