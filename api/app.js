var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI', {
	useMongoClient: true
}); // bookAPI is the name of the database that we are connecting to

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res) {
		Book.find(function(err, books) {
			if (err) {
				res.status(500).send(err); // clean way off sending back 500 error
			} else {
				res.json(books);
			}
		});
	});

app.use('/api', bookRouter);


// Route handler
app.get('/', function(req, res) {
	res.send('Welcome to my API!');
});

// Listener
app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});