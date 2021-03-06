var express = require('express');
var app = express();
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/db', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM user', function(err, result) {
			done();
			if(err) {
				console.error(err);
				response.send("ERROR " + err);
			}
			else {
				response.send(result.rows);
			}
		});
	});
});

app.get('/', function(request, response) {
  //response.send("Let's sell some stuff!");
  response.sendFile(__dirname+'/index.html');
});

app.get('/login', function(request, response) {
	response.send("OK...");
});

app.post('/login', function(request, response) {
	console.log("someone's trying to login");
	response.send("keep a knockin'");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
