//need two PUTs to update the thumbs down
//clicks have to be server side!!
//be aware of the difference between client-side and server-side



const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://melissa91:ilovemongodb1@cluster0-6nyz0.mongodb.net/test?retryWrites=true&w=majority"; //mongo atlas url
const dbName = "practice-mongodb";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs') //says what templating language to use
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) //client-side code

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({msg: req.body.msg, completed: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
    completed: true,
    msg: req.body.msg +' completed'
    }
  }, {
    sort: {_id: -1}, //searches top to bottom
    upsert: true //it inserts a document if you can't find it
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
