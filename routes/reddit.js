var express = require('express');
var request = require('request');
var router = express.Router();
var entries =[];
var numberOfEntries = 10;

router.get('/', function(req,res){
	var message = '';
	for(var i = 0; i< entries.length; i++){
		// message += '<img src="' + myImage[i] + '"/><br/><h1>This post has a score of ' + score[i] + ' and ' + numComments[i] +' comments</h1><hr>';
		message += '<img src="' + entries[i].myImage + '"/><br/><h1>This post has a score of ' + entries[i].score + ' and ' + entries[i].numComments +' comments</h1><hr>';
	}
	res.send(message);
});

request('http://reddit.com/r/funny.json', function(err, response, body){
	if(err) {
		throw err;
	}

	// convert JSON to a JS object

	var myResult = JSON.parse(body);
	//drill in to get specific pieces of data
	for(var i = 0; i<numberOfEntries; i++){
		//Create a new object to store the data
		
		var singleEntry ={};
		singleEntry.score = myResult.data.children[i].data.score;
		singleEntry.numComments = myResult.data.children[i].data.num_comments;
		singleEntry.myImage = myResult.data.children[i].data.thumbnail;
		
		//push the object into an entries array
		entries.push(singleEntry);
	}


	console.log('score: ' + entries[0].score);
	console.log('numComments: ' + entries[0].numComments);
	console.log('myImage: ' + entries[0].myImage);
});


module.exports = router;