var express = require('express');
var app = express();
var _ = require('lodash');
var port = 3030;
var host = "127.0.0.1";

app.use(express.static('client'));
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());

var lions = [
  {
    'id': 1,
    'name': 'Simba',
    'pride': 'The Cool Cats',
    'age': 3,
    'gender': 'male'
  },
  {
    'id': 2,
    'name': 'Mufasa',
    'pride': 'The Lit Cats',
    'age': 8,
    'gender': 'male'
  },
];
var id = 0;

app.get('/lion', (req, res) => {
  res.json(lions)
})

app.get('/lions/:id', (req, res) => {
  var lion = _.find(lions => {
    return lion.id == req.params.id;
  });

  res.json(lion || {});
});

app.post('/lions', (req, res) => {
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);

  res.json(lion);
});

app.put('/lions/:id', (req, res) => {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var lion = lions.findIndex(lion => lion.id = req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = Object.assign(lions[lion], update);
      // _.assign(lions[lion], update);
    res.json(updatedLion);
  }
  console.log(lion); 
});

app.delete('/lions/:id', (req, res) => {
  var lion = lions.findIndex(lion => lion.id == req.params.id)
  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
    }
});

app.listen(port, host, function () {
  console.log('Listening on http://localhost:', port);
})
// var jsonData = { count: 12, message: 'hey' };

// app.get('/', (req, res) => {
//   // res.sendFile takes an ABSOLUTE path to a file and sets the mime type based on the file extension
//   res.sendFile(__dirname + '/index.html', err => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// app.get('/data', (req, res) => {
//   res.json(jsonData);
// })



// What is an API 
// Application Programming Interface // that endpoint and making the 
// What does it do
