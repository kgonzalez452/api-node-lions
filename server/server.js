var express = require('express');
var app = express();
var morgan = require('morgan');
const port = 3030;
const host = '127.0.0.1';

var lionRouter = require('./lions');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We now mount our lion routes
// When a request comes in for /lion we want to use this router >
app.use('/lions', lionRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
})

app.listen(port, host, function () {
  console.log("Listening on http://localhost:", port);
})