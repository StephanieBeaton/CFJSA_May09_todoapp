'use strict';

var fs = require('fs');

module.exports = function(req, res) {

  var input = '';

  if (req.method === 'POST') {

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {


      // fix to concatenate onto JSON file here
      var filename = './data/data.json';
      var fileContent1 = fs.readFileSync(filename);

      var todosObj = JSON.parse(fileContent1);

      var inputObj = JSON.parse(input);

      todosObj.todos.push(inputObj);


      fs.writeFileSync(filename, JSON.stringify(todosObj));

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.write(JSON.stringify(todosObj));
      res.end();
    });
  //};

  }  else if (req.method === 'PUT') {


    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {


      // fix to concatenate onto JSON file here
      var filename = './data/data.json';
      var fileContent1 = fs.readFileSync(filename);

      var todosObj = JSON.parse(fileContent1);

      var inputObj = JSON.parse(input);

  //     // loop thru todosObj.todos array
  //     // .... find the item with matching uniqueId
  //     // .... replace the item in the todosObj.todos array

      var i = 0;
      var found = false;
      while (i < todosObj.todos.length && !found ){
        var event = todosObj.todos[i];
        if (event.uniqueId && (event.uniqueId === inputObj.uniqueId)) {
          found = true;
        } else {
          i++;
        }
      }

      if (found) {
        todosObj.todos[i] = inputObj;
      }


      fs.writeFileSync(filename, JSON.stringify(todosObj));

      // We don't need to send any data back to browser
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.write(JSON.stringify(todosObj));
       res.end();
     });

   } else if (req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      // fix to read JSON file here
      var fileContent2 = fs.readFileSync('./data/data.json');

      res.write(fileContent2);

     res.end();

  } else if (req.method === 'DELETE') {

    // ==============================================


    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {


      var inputObj = JSON.parse(input);

      // fix to concatenate onto JSON file here
      var filename = './data/data.json';
      var fileContent1 = fs.readFileSync(filename);

      var todosObj = JSON.parse(fileContent1);

      //var inputObj = JSON.parse(input);

      // loop thru todosObj.todos array
      // .... find the item with matching uniqueId
      // .... replace the item in the todosObj.todos array

      var i = 0;
      var found = false;
      while (i < todosObj.todos.length && !found ){
        var event = todosObj.todos[i];
        if (event.uniqueId && (event.uniqueId === inputObj)) {
          found = true;
        } else {
          i++;
        }
      }

      if (found) {

        // splice changes the original array
        todosObj.todos.splice(i, 1);    //&&

      }


      fs.writeFileSync(filename, JSON.stringify(todosObj));

      // We don't need to send any data back to browser
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.write(JSON.stringify(todosObj));
       res.end();
     });
  }
  // ==============================================
};
