/*
	topic: node.js
	date: November, 8, 2009
	node.js in brief
	• Server side javascript
	• Built on Google's V8
	• Evented, Non Blocking I/O
	  similar to eventMachine or Twisted
	• commonJS Module system
*/

// many web applcation have code like this:

var result = db.query("SELECT * FROM t");
// use result

// What is softwere doing while it
// queries the database ?

// in many case waiting for the response


// But a code like this

db.query("SELECT * FROM t", function(result){
	// use result
});

// allows the program to return to the
// event loop immidiately

// when this happens make that request and continue doing other things
// when the request comes back after million of clock cycles later
// you can execute the callback later

