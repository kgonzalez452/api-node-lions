var express = require('express');
var app = express();
var morgan = require('morgan');
// var _ = require('lodash');
const port = 3030;
const host = '127.0.0.1';

var lions = [
  {
    id: 1,
    name: 'Simba',
    pride: 'The cool cats',
    age: 3,
    gender: 'male'
  },
  {
    id: 2,
    name: 'Mufasa',
    pride: 'The cool csats',
    age: 4,
    gender: 'male'
  }
];
var id = 2;
  
var updateId = function (req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }

  next();
}

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.param('id', (req, res, next, id) => {
  var lion = lions.find(lion => {
    return lion.id == req.params.id;
  });

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

app.get('/lions', (req, res) => { // GET lions
  res.json(lions);
});

app.get('/lions/:id', (req, res) => { // GET lion.id
  // var lion = lions.find(lion => {
  //   return lion.id == req.params.id;
  // });
  var lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, (req, res) => { // POST lion.id
  var lion = req.body;
  // id++;
  // lion.id = id + '';

  lions.push(lion);

  res.json(lion)
});

//helper function for patch
function findLionIndex(id) {
// findIndex stuff
  return lionIndex;
}


app.put('/lions/:id', (req, res) => { // PUT/REPLACE lion.id
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var lion = lions.findIndex(lion => lion.id == req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = Object.assign(lions[lion], update);
    //_.assign(lions[lion], update);
    res.json(updatedLion)
  }
  console.log(lion);
});

app.delete("/lions/:id", (req, res) => { // DELETE lion.id
  var lion = lions.findIndex(lion => lion.id == req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res, json(deletedLion);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
})

app.listen(port, host, function () {
  console.log("Listening on http://localhost:", port);
})