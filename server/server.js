var express = require('express');
var app = express();
var port = 3030;
var host = "127.0.0.1";

var jsonData = { count: 12, message: 'hey' };

app.get('/', (req, res) => {
  // res.sendFile takes an ABSOLUTE path to a file and sets the mime type based on the file extension
  res.sendFile(__dirname + '/index.html', err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/data', (req, res) => {
  res.json(jsonData);
})

app.listen(port, host, function () {
  console.log('Listening on http://localhost:', port);
})

// What is an API 
// Application Programming Interface // that endpoint and making the 
// What does it do
