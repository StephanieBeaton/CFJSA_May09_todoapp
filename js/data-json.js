


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


      // console.log('array length = ' + responseObject.todos.length);

      // for (var i = 0; i < responseObject.todos.length; i++) { // Loop through object
      //   newContent += '<li>' + responseObject.todos[i].location +  ' ' + responseObject.todos[i].date + '</li>';
      // }

      // newContent += '</ul>';

      // // Update the page with the new content
      // //document.getElementById('content').innerHTML = xhr.responseText;
      // document.getElementById('content').innerHTML = newContent;

      //=================================================

      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
      var newContent2 = '<ul>';
      var newContent;

      console.log('array length = ' + responseObject.todos.length);

      var uniqueId = "9999";

      for (var i = 0; i < responseObject.todos.length; i++) { // Loop through object

        uniqueId = responseObject.todos[i].uniqueId;
        newContent = '';
        newContent += '<li id="listItem&">';
        newContent +=   '<div id="displayToDo&">';
        newContent +=   uniqueId +
                        ' -- ' + responseObject.todos[i].location +
                        ' -- ' + responseObject.todos[i].date;
        newContent +=   '</div>';
        newContent += '<form id="editForm&" method="post">';
        newContent +=   '<label for="todo&">Edit ToDo</label>';
        newContent +=   '<input type="text" id="todo&">';
        newContent +=   '<button id="submitbutton&" name="submitbutton&" type="submit">Save Changes</button>';
        newContent +=   '<button id="cancelbutton&" name="cancelbutton&" type="button">Cancel</button>';
        newContent += '</form>';
        newContent += '<button id="editbutton&" name="editbutton&">Edit ToDo</button>';
        newContent += '<button id="deletebutton&" name="deletebutton&">Delete ToDo</button>';
        newContent += '</li>';

        newContent2 += newContent.replace(/&/gi, uniqueId);

      }

      newContent2 += '</ul>';

      // Update the page with the new content
      //document.getElementById('content').innerHTML = xhr.responseText;
      document.getElementById('content').innerHTML = newContent2;

      // create any JQuery Event Listeners that are required
      // ... for the new html added above
      // Event Delegation   JavaScript & JQuery text  page 268
      // Delegate all button clicks inside <ul> to <ul> element

     //$('#editForm0').on('click', handleSubmitButton);
     //$( "button[name*='submitbutton']" ).on('submit', handleSubmitButton);

     //$( "input[name*='man']" )

     //$('#submitbutton0').on('click', handleSubmitButton);
     $('ul').on('click', "button[name*='submitbutton']" , handleSubmitButton);

     $('ul').on('click', "button[name*='editbutton']" ,   handleEditButton);
     $('ul').on('click', "button[name*='cancelbutton']" , handleCancelButton);
     $('ul').on('click', "button[name*='deletebutton']" , handleDeleteButton);

     $("form[name*='editForm']").hide();

     $("#editForm0001").hide();
     $("#editForm0002").hide();
     $("#editForm0003").hide();
     $("#editForm0004").hide();
     $("#editForm0005").hide();
     $("#editForm0006").hide();
     $("#editForm0007").hide();
     $("#editForm0008").hide();
     $("#editForm0009").hide();
     $("#editForm0010").hide();


      //==================================================


    //}
  };

  xhr1.open('GET', 'http://localhost:3000/data/data.json', true);        // Prepare the request
  xhr1.send(null);                                 // Send the request

  // If you get it on a server, you may need to se the MIME type for JSON on the server (application/JSON).

  // =========================================================

  // Add event listener to trap when clicking "Save New ToDo" button
  // ...to creating a new "event" or "ToDo" or "resource"

  $('#newToDoName').on('submit', function(e) {

     var newObject =
     {
       "location": "Seattle, WA",
       "date": "Jun 30",
       "map": "img/map-ny.png",
       "uniqueId": "9999"
     };

     // stop process from going to a new page
     e.preventDefault();

     console.log("inside call back for submit event");

     // send POST request to the server
     var xhr2 = new XMLHttpRequest();

     xhr2.open('POST', 'http://localhost:3000/data/data.json', true);        // Prepare the request

     newObject.uniqueId = "??";
     // loop thru all the <li>'s and add one to max uniqueId
     //&&
     var maxUniqueId = 0;

     $('ul').children().each(function(){
       console.log(this.id);
       var currId = this.id;
       var uniqueId = Number(currId.substr(currId.length - 4));
       if (maxUniqueId < uniqueId) {
         maxUniqueId = uniqueId;
       }
     });

     var newUniqueId = maxUniqueId + 1;
     newUniqueId = newUniqueId.toString();

     // left pad uniqueId so that it is 4 chars long.
     var pad = "0000";
     var paddedUniqueId = (pad + newUniqueId).slice(-pad.length);

     newObject.uniqueId = paddedUniqueId;


     newObject.location = $('#newNoteBody').val();
     $('#newNoteBody').val('');

     xhr2.send(JSON.stringify(newObject));    // Send the request

     // need to wait for asynch call to server to return the new uniqueId
     // ... for the new Note

     // We don't really need to rebuild the whole <ul>
     // ... we could just add the new <li> to the bottom of the list

     xhr2.onload = function() {                       // When readystate changes
      // The following conditional check will not work locally - only on a server
      //if(xhr.status === 200) {                      // If server status was ok
      console.log("xhr2.responseText = " + xhr2.responseText);
      responseObject = JSON.parse(xhr2.responseText);

      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
      var newContent2 = '<ul>';
      var newContent;

      console.log('array length = ' + responseObject.todos.length);

      var uniqueId = "9999";

      for (var i = 0; i < responseObject.todos.length; i++) { // Loop through object

        uniqueId = responseObject.todos[i].uniqueId;
        newContent = '';
        newContent += '<li id="listItem&">';
        newContent +=   '<div id="displayToDo&">';
        newContent +=   uniqueId +
                        ' -- ' + responseObject.todos[i].location +
                        ' -- ' + responseObject.todos[i].date;
        newContent +=   '</div>';
        newContent += '<form id="editForm&" method="post">';
        newContent +=   '<label for="todo&">Edit ToDo</label>';
        newContent +=   '<input type="text" id="todo&">';
        newContent +=   '<button id="submitbutton&" name="submitbutton&" type="submit">Save Changes</button>';
        newContent +=   '<button id="cancelbutton&" name="cancelbutton&" type="button">Cancel</button>';
        newContent += '</form>';
        newContent += '<button id="editbutton&" name="editbutton&">Edit ToDo</button>';
        newContent += '<button id="deletebutton&" name="deletebutton&">Delete ToDo</button>';
        newContent += '</li>';

        newContent2 += newContent.replace(/&/gi, uniqueId);

      }

      newContent2 += '</ul>';

      // Update the page with the new content
      //document.getElementById('content').innerHTML = xhr.responseText;
      document.getElementById('content').innerHTML = newContent2;


     // need to add Event Listeners for 3 more buttons here
     // ...  cancelbutton0,  editbutton0, deletebutton0

     $('ul').on('click', "button[name*='submitbutton']" , handleSubmitButton);
     $('ul').on('click', "button[name*='editbutton']" ,   handleEditButton);
     $('ul').on('click', "button[name*='cancelbutton']" , handleCancelButton);
     $('ul').on('click', "button[name*='deletebutton']" , handleDeleteButton);

     $("button[name*='editForm']").hide();


     $("#editForm0001").hide();
     $("#editForm0002").hide();
     $("#editForm0003").hide();
     $("#editForm0004").hide();
     $("#editForm0005").hide();
     $("#editForm0006").hide();
     $("#editForm0007").hide();
     $("#editForm0008").hide();
     $("#editForm0009").hide();
     $("#editForm0010").hide();



    };


  });

  // ==========================================================


  function handleSubmitButton(e) {
    // what is "e" ?  Find the button clicked
    console.log("e = " + e.target);

    console.log("e.target.name = " + e.target.name);

     //alert("inside handleSubmitButton");

     var newObject =
     {
       "location": "Seattle, WA",
       "date": "Jun 30",
       "map": "img/map-ny.png",
       "uniqueId": 9999
     };

     var uniqueId = e.target.name.substr(e.target.name.length - 4);

     // left pad uniqueId so that it is 4 chars long.
     var pad = "0000";

     newObject.uniqueId = uniqueId;


     // stop process from going to a new page when submitbutton0 is clicked
     e.preventDefault();

     console.log("inside call back for submitbutton0 click event on ul");

     // send POST request to the server
     var xhr3 = new XMLHttpRequest();

     xhr3.open('PUT', 'http://localhost:3000/data/data.json', true);        // Prepare the request

     newObject.location = $('#todo' + newObject.uniqueId).val();

     console.log("JSON.stringify(newObject) = " + JSON.stringify(newObject));
     xhr3.send(JSON.stringify(newObject));    // Send the request

     // we don't need to wait until the request returns from the Server
     // we know the uniqueId of the note being updated.
     // ... we can just update the html now

     //responseObject.todos[i].location +  ' ' + responseObject.todos[i].date;
     // var location_and_date = $('#displayToDo' + newObject.uniqueId).text();
     // var date = location_and_date.substr(location_and_date.length - "May 01".length);

     // var newText =   "uniqueId : " + newObject.uniqueId
     //              + ' ' + newObject.location
     //              + ' ' + date;

     // $('#displayToDo' + newObject.uniqueId).text(newText);


     xhr3.onload = function() {                       // When readystate changes
        // The following conditional check will not work locally - only on a server
        //if(xhr3.status === 200) {                      // If server status was ok
        console.log("xhr3.responseText = " + xhr3.responseText);

        if(xhr3.status != 200) {
          console.log("handleSubmitButton returned status = " + xhr3.status);
        } else {
          // The following conditional check will not work locally - only on a server
          //if(xhr3.status === 200) {                      // If server status was ok
          console.log("xhr3.responseText = " + xhr3.responseText);
          responseObject = JSON.parse(xhr3.responseText);

          // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
          var newContent2 = '<ul>';
          var newContent;

          console.log('array length = ' + responseObject.todos.length);

          var uniqueId = "9999";

          for (var i = 0; i < responseObject.todos.length; i++) { // Loop through object

            uniqueId = responseObject.todos[i].uniqueId;
            newContent = '';
            newContent += '<li id="listItem&">';
            newContent +=   '<div id="displayToDo&">';
            newContent +=   uniqueId +
                            ' -- ' + responseObject.todos[i].location +
                            ' -- ' + responseObject.todos[i].date;
            newContent +=   '<div>';
            newContent += '<form id="editForm&" method="post">';
            newContent +=   '<label for="todo&">Edit ToDo</label>';
            newContent +=   '<input type="text" id="todo&">';
            newContent +=   '<button id="submitbutton&" name="submitbutton&" type="submit">Save Changes</button>';
            newContent +=   '<button id="cancelbutton&" name="cancelbutton&" type="button">Cancel</button>';
            newContent += '</form>';
            newContent += '<button id="editbutton&" name="editbutton&">Edit ToDo</button>';
            newContent += '<button id="deletebutton&" name="deletebutton&">Delete ToDo</button>';
            newContent += '</li>';

            newContent2 += newContent.replace(/&/gi, uniqueId);

          }

          newContent2 += '</ul>';

          // Update the page with the new content
          //document.getElementById('content').innerHTML = xhr3.responseText;
          document.getElementById('content').innerHTML = newContent2;

         //$( "button[name*='submitbutton']" ).on('submit', handleSubmitButton);

         //$( "input[name*='man']" )

         //$('#submitbutton0').on('click', handleSubmitButton);

         // need to add Event Listeners for 3 more buttons here
         // ...  cancelbutton0,  editbutton0, deletebutton0

         $('ul').on('click', "button[name*='submitbutton']" , handleSubmitButton);
         $('ul').on('click', "button[name*='editbutton']" ,   handleEditButton);
         $('ul').on('click', "button[name*='cancelbutton']" , handleCancelButton);
         $('ul').on('click', "button[name*='deletebutton']" , handleDeleteButton);

         $("form[name*='editForm']").hide();

         $("#editForm0001").hide();
         $("#editForm0002").hide();
         $("#editForm0003").hide();
         $("#editForm0004").hide();
         $("#editForm0005").hide();
         $("#editForm0006").hide();
         $("#editForm0007").hide();
         $("#editForm0008").hide();
         $("#editForm0009").hide();
         $("#editForm0010").hide();

      };

    };


  };  // end of  function handleSubmitButton(e) {


 // ==========================================================

 function handleCancelButton(e) {

   // hide the form for this list item
   // ... including Save button and Cancel button
   console.log("e.target.name = " + e.target.name);

   var uniqueId = e.target.name.substr(e.target.name.length - 4);

   $('#editForm' + uniqueId).hide();


 };  //  function handleCancelButton(e) {

 // ==========================================================

 function handleDeleteButton(e) {

    // delete the ToDo from the JSON file on the server

    console.log("e.target.name = " + e.target.name);

     var deleteObject =
     {
       "uniqueId": "9999",
     };

     deleteObject.uniqueId = e.target.name.substr(e.target.name.length - 4);

     // stop process from going to a new page when submitbutton0 is clicked
     e.preventDefault();

     console.log("inside call back for deletebutton0 click event on ul");

     // send DELETE request to the server
     var xhr3 = new XMLHttpRequest();

     xhr3.open('DELETE', 'http://localhost:3000/data/data.json', true);        // Prepare the request


     console.log("JSON.stringify(deleteObject) = " + JSON.stringify(deleteObject));
     xhr3.send(JSON.stringify(deleteObject.uniqueId));    // Send the request

     // we don't need to wait until the request returns from the Server
     // we know the uniqueId of the note being deleted.
     // ... we can just update the html now

     // remove the li. Use  DOM manipulation
     $li = $('ul').children('#listItem' + deleteObject.uniqueId);

     $li.remove();

     xhr3.onload = function() {                       // When readystate changes
      // The following conditional check will not work locally - only on a server
      //if(xhr.status === 200) {                      // If server status was ok
      console.log("xhr3.responseText = " + xhr3.responseText);

      if(xhr3.status != 200) {
        console.log("handleDeleteButton returned status = " + xhr.status)
      }

    };


 };  //  function handleDeleteButton(e) {

 // ==========================================================

 function handleEditButton(e) {

    // display the form for this list item
    // ... hide all other list item forms

       // hide the form for this list item
   // ... including Save button and Cancel button
   console.log("e.target.name = " + e.target.name);

   var uniqueId = e.target.name.substr(e.target.name.length - 4);

   // $("button[name*='editForm']").hide();
   // $("button[name*='submitbutton']").hide();
   // $("button[name*='cancelbutton']").hide();

   var test = $('#editForm' + uniqueId);
   $('#editForm' + uniqueId).show();

   // hide Edit button
   e.target.hide();


 }  //  function handleEditButton(e) {



}());
