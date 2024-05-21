const multer = require("multer");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//Everything we need for the backend to work.

var app = express();
app.use(cors());
app.use(bodyParser.json());

//Enviroment variables to make work easier

var CONNECTION_STRING = "mongodb+srv://lucasgildominguez:lucasgildominguez@cluster.pwxbaqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
var DATABASENAME = "project";
var database;

//Connection with DB (Executed with in terminal with {node index.js})

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) throw error;
        database = client.db(DATABASENAME);
        console.log("MongoDB successful connection");
    });
});

//Login call to server

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await database.collection("users").findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '1h' });
            res.send({ token });
        } else {
            res.status(401).send('Invalid login credentials');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


// Registration route

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await database.collection("users").findOne({ username });

        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await database.collection("users").insertOne({ username, password: hashedPassword });

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//Api to get all the meals data

app.get('/api/project/GetMeals', (request, response) => {
    database.collection("meals").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to get all the drinks data

app.get('/api/project/GetDrinks', (request, response) => {
    database.collection("beverages").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to get the desserts data

app.get('/api/project/GetDesserts', (request, response) => {
    database.collection("dessert").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to get the appetizers data

app.get('/api/project/GetApps', (request, response) => {
    database.collection("appetizers").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to get all the reviews

app.get('/api/project/GetReviews', (request, response) => {
    database.collection("reviews").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to add a new review with all the fields and adding an identifier that relates to the number of reviews done.

app.post('/api/project/AddReview', multer().none(), (request, response) => {
    database.collection("reviews").count({}, function (error, numOfDocs) {
        database.collection("reviews").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            text: request.body.text,
            rating: request.body.rating,
            created: request.body.created
        });
        response.json("Added Review Succesfully");
    })
})

//Api to get all the reserves data.

app.get('/api/project/GetReserves', (request, response) => {
    database.collection("reserves").find({}).toArray((error, result) => {
        response.send(result);
    })
})

//Api to add a new reservation with an id for the number of reserve and the rest of the fields that must be filled.

app.post('/api/project/AddReserve', multer().none(), (request, response) => {
    database.collection("reserves").count({}, function (error, numOfDocs) {
        database.collection("reserves").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            date: request.body.date,
            time: request.body.time,
            numberGuests: request.body.numberGuests,
            reservationId: request.body.reservationId,
            created: request.body.created
        });
        response.json("Added Reserve Successfully");
    })
});


//Api to get all the orders data.

app.get('/api/project/GetOrders', (request, response) => {
    database.collection("orders").find({}).toArray((error, result) => {
        response.send(result);
    })
})



//Api to add a order created via the order tab by a employee of the restaurant // we parse the json data thats been stringyfied in the frontend for proper storage

app.post('/api/project/AddOrder', multer().none(), (request, response) => {
    database.collection("orders").count({}, function (error, numOfDocs) {
        database.collection("orders").insertOne({
            id: (numOfDocs + 1),
            cart: JSON.parse(request.body.cart),
            totalPrice: request.body.totalPrice,
            created: request.body.created
        });
        response.json("Added Order Successfully");
    })
});

//Api to delete a reserve that searches for the reservationId code thats given to the customer to save if he/she/them wants to cancel the reservation

app.delete('/api/project/DeleteReserve', (request, response) => {
    const reservationId = request.query.reservationId;

    if (!reservationId) {
        return response.status(400).json({ error: "Reservation ID is required" });
    }

    database.collection("reserves").deleteOne({ reservationId: reservationId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to cancel the reservation" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Reservation not found" });
        }

        response.json("Reservation Deleted Successfully");
    });
});
