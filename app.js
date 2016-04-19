var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var redditRouter = require('./routes/reddit');

app.get('/', function(req, res){
	res.json({message: 'Hello, world!'});
});
app.use('/reddit', redditRouter);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});