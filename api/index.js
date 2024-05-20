var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://lucasgildominguez:lucasgildominguez@cluster.pwxbaqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

var DATABASENAME = "project"
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASENAME)
        console.log("MongoDB sucessfull connection")
    })
})

//HASTA AQUI FUNCIONA

/* Esto seria para el login

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
  
    if (user && user.password === password) {
      const token = jwt.sign({id: user._id}, 'secret-key');
      res.send({token});
    } else {
      res.status(401).send('Invalid login credentials');
    }
  });
*/

app.get('/api/project/GetMeals', (request, response) => {
    database.collection("meals").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.get('/api/project/GetDrinks', (request, response) => {
    database.collection("beverages").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.get('/api/project/GetDesserts', (request, response) => {
    database.collection("dessert").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.get('/api/project/GetApps', (request, response) => {
    database.collection("appetizers").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.get('/api/project/GetReviews', (request, response) => {
    database.collection("reviews").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.post('/api/project/AddReview', multer().none(), (request, response) => {
    database.collection("reviews").count({}, function (error, numOfDocs) {
        database.collection("reviews").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            text: request.body.text,
            rating: request.body.rating
        });
        response.json("Added Review Succesfully");
    })
})

app.post('/api/project/AddReserve', multer().none(), (request, response) => {
    database.collection("reserves").count({}, function (error, numOfDocs) {
        database.collection("reserves").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            date: request.body.date,
            time: request.body.time,
            numberGuests: request.body.numberGuests
        });
        response.json("Added Reserve Succesfully");
    })
})



app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection("meals").deleteOne({
        id: request.query.id
    });
    response.json("Deleted Successfully")
})