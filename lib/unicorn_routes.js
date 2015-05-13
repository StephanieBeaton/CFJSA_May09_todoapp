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
  //};

  }  else if (req.method === 'PUT') {
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

      var inputObj = JSON.parse(input);

  //     // loop thru eventsObj.events array
  //     // .... find the item with matching uniqueId
  //     // .... replace the item in the eventsObj.events array

      var i = 0;
      var found = false;
      while (i < eventsObj.events.length && !found ){
        var event = eventsObj.events[i];
        console.log("inside while loop");
        console.log("event.uniqueId = " + event.uniqueId);
        console.log("inputObj.uniqueId = " + inputObj.uniqueId);
        if (event.uniqueId && (event.uniqueId === inputObj.uniqueId)) {
          found = true;
        } else {
          i++;
        }
      };

      if (found) {
        console.log("found and i = " + i);
        eventsObj.events[i] = inputObj;
      };

      console.log("eventsObj = " + JSON.stringify(eventsObj));

      fs.writeFileSync(filename, JSON.stringify(eventsObj));

      // We don't need to send any data back to browser
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

  } else if (req.method === 'DELETE') {

    // ==============================================

    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {

      console.log("inside req.on");
      console.log("input = " + input);

      var inputObj = JSON.parse(input);

      // fix to concatenate onto JSON file here
      var filename = './data/data.json';
      var fileContent1 = fs.readFileSync(filename);

      console.log("fileContent1 = " + fileContent1);
      var eventsObj = JSON.parse(fileContent1);

      //var inputObj = JSON.parse(input);

      // loop thru eventsObj.events array
      // .... find the item with matching uniqueId
      // .... replace the item in the eventsObj.events array

      var i = 0;
      var found = false;
      while (i < eventsObj.events.length && !found ){
        var event = eventsObj.events[i];
        console.log("event.uniqueId = " + event.uniqueId);
        console.log("input = " + inputObj);
        if (event.uniqueId && (event.uniqueId === inputObj)) {
          found = true;
        } else {
          i++;
        }
      };

      if (found) {
        console.log("splicing ");

        // splice changes the original array
        eventsObj.events.splice(i, 1);    //&&
        console.log("eventsObj = " + JSON.stringify(eventsObj));

      };


      fs.writeFileSync(filename, JSON.stringify(eventsObj));

      // We don't need to send any data back to browser
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.write(JSON.stringify(eventsObj));
       res.end();
     });
  };
  // ==============================================
};
