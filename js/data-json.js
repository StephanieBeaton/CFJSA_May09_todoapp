


// IIFE Invoked Function Expression p97
(function() {

  // =========================================================

  // NOTE: If you run this file locally
  // You will not get a server status
  // You can comment out lines 9 and 26 to make it work locally

  var xhr1 = new XMLHttpRequest();                 // Create XMLHttpRequest object

  xhr1.onload = function() {                       // When readystate changes
    // The following conditional check will not work locally - only on a server
    //if(xhr.status === 200) {                      // If server status was ok
      responseObject = JSON.parse(xhr1.responseText);

      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
      // var newContent = '<ul>';


      // console.log('array length = ' + responseObject.events.length);

      // for (var i = 0; i < responseObject.events.length; i++) { // Loop through object
      //   newContent += '<li>' + responseObject.events[i].location +  ' ' + responseObject.events[i].date + '</li>';
      // }

      // newContent += '</ul>';

      // // Update the page with the new content
      // //document.getElementById('content').innerHTML = xhr.responseText;
      // document.getElementById('content').innerHTML = newContent;

      //=================================================

      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
      var newContent2 = '<ul>';
      var newContent;

      console.log('array length = ' + responseObject.events.length);

      for (var i = 0; i < responseObject.events.length; i++) { // Loop through object
        newContent = '';
        newContent += '<li>';
        newContent += responseObject.events[i].location +  ' ' + responseObject.events[i].date;

        newContent += '<form id="editForm&" method="post">';
        newContent +=   '<label for="note&">Edit Note</label>';
        newContent +=   '<input type="text" id="note&">';
        newContent +=   '<button id="submitbutton&" name="submitbutton&" type="submit">Save Changes</button>';
        newContent +=   '<button id="cancelbutton&" name="cancelbutton&" type="button">Cancel</button>';
        newContent += '</form>';
        newContent += '<button id="editbutton&" name="editbutton&">Edit Note</button>';
        newContent += '<button id="deletebutton&" name="deletebutton&">Delete Note</button>';
        newContent += '</li>';

        newContent2 += newContent.replace(/&/gi, i.toString());

      }

      newContent2 += '</ul>';

      // Update the page with the new content
      //document.getElementById('content').innerHTML = xhr.responseText;
      document.getElementById('content').innerHTML = newContent2;

     //$('#editForm0').on('click', handleSubmitButton);
     //$( "button[name*='submitbutton']" ).on('submit', handleSubmitButton);

     //$( "input[name*='man']" )

     $('#submitbutton0').on('click', handleSubmitButton);

      //==================================================


    //}
  };

  xhr1.open('GET', 'http://localhost:3000/data/data.json', true);        // Prepare the request
  xhr1.send(null);                                 // Send the request

  // When working locally in Firefox, you may see an error saying that the JSON is not well-formed.
  // This is because Firefox is not reading the correct MIME type (and it can safely be ignored).

  // If you get it on a server, you may need to se the MIME type for JSON on the server (application/JSON).

  // =========================================================

  $('#newNoteName').on('submit', function(e) {

     var newObject =
     {
       "location": "Seattle, WA",
       "date": "Jun 30",
       "map": "img/map-ny.png"
     };

     e.preventDefault();

     console.log("inside call back for submit event");

     // send POST request to the server
     var xhr2 = new XMLHttpRequest();

     xhr2.open('POST', 'http://localhost:3000/data/data.json', true);        // Prepare the request

     newObject.location = $('#newNoteBody').val();
     xhr2.send(JSON.stringify(newObject));    // Send the request

     xhr2.onload = function() {                       // When readystate changes
      // The following conditional check will not work locally - only on a server
      //if(xhr.status === 200) {                      // If server status was ok
      console.log("xhr2.responseText = " + xhr2.responseText);
      responseObject = JSON.parse(xhr2.responseText);

      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
      var newContent2 = '<ul>';
      var newContent;

      console.log('array length = ' + responseObject.events.length);

      for (var i = 0; i < responseObject.events.length; i++) { // Loop through object
        newContent = '';
        newContent += '<li>';
        newContent += responseObject.events[i].location +  ' ' + responseObject.events[i].date;

        newContent += '<form id="editForm&" method="post">';
        newContent +=   '<label for="note&">Edit Note</label>';
        newContent +=   '<input type="text" id="note&">';
        newContent +=   '<button id="submitbutton&" type="submit">Save Changes</button>';
        newContent +=   '<button id="cancelbutton&" type="button">Cancel</button>';
        newContent += '</form>';
        newContent += '<button id="editbutton&">Edit Note</button>';
        newContent += '<button id="deletebutton&">Delete Note</button>';
        newContent += '</li>';

        newContent2 += newContent.replace(/&/gi, i.toString());

      }

      newContent2 += '</ul>';

      // Update the page with the new content
      //document.getElementById('content').innerHTML = xhr.responseText;
      document.getElementById('content').innerHTML = newContent2;

     //$( "button[name*='submitbutton']" ).on('submit', handleSubmitButton);

     //$( "input[name*='man']" )

     $('#submitbutton0').on('click', handleSubmitButton);


    };


  });

  // ==========================================================


 //   $("button[id*='submitButton']").on('submit', function(e) {
 //   $('#editForm0').on('click', function(e) {

  //$('content').on('submit', handleSubmitButton);

  function handleSubmitButton(e) {
       // what is "e" ?  Find the button clicked
       console.log("e = " + e);
       // currentTarget: button#submitbutton0

       alert("inside handleSubmitButton");

       var newObject =
       {
         "location": "Seattle, WA",
         "date": "Jun 30",
         "map": "img/map-ny.png"
       };

       e.preventDefault();



       console.log("inside call back for click event on ul");

       // send POST request to the server
       var xhr3 = new XMLHttpRequest();

       xhr3.open('POST', 'http://localhost:3000/data/data.json', true);        // Prepare the request

       newObject.location = $('#note&').val();
       xhr3.send(JSON.stringify(newObject));    // Send the request

       // xhr3.onload = function() {                       // When readystate changes
       //  // The following conditional check will not work locally - only on a server
       //  //if(xhr.status === 200) {                      // If server status was ok
       //  console.log("xhr3.responseText = " + xhr3.responseText)
       //  responseObject = JSON.parse(xhr2.responseText);

       //  // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
       //  var newContent2 = '<ul>';
       //  var newContent;

       //  console.log('array length = ' + responseObject.events.length);

       //  for (var i = 0; i < responseObject.events.length; i++) { // Loop through object
       //    newContent = '';
       //    newContent += '<li>';
       //    newContent += responseObject.events[i].location +  ' ' + responseObject.events[i].date;

       //    newContent += '<form id="edit&">';
       //    newContent +=   '<label for="note&">Edit Note</label>';
       //    newContent +=   '<input type="text" id="note&">';
       //    newContent +=   '<button id="submitbutton&" type="submit">Save Changes</button>';
       //    newContent +=   '<button id="cancelbutton&" type="button">Cancel</button>';
       //    newContent += '</form>';
       //    newContent += '<button id="editbutton&">Edit Note</button>';
       //    newContent += '<button id="deletebutton&">Delete Note</button>';
       //    newContent += '</li>';

       //    newContent2 += newContent.replace(/&/gi, i.toString());

       //  }

       //  newContent2 += '</ul>';

        // Update the page with the new content
        //document.getElementById('content').innerHTML = xhr.responseText;
        //document.getElementById('content').innerHTML = newContent2;

    //};
 // ==========================================================


  };
}());
