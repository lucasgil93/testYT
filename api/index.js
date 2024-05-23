const multer = require("multer");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var CONNECTION_STRING = "mongodb+srv://lucasgildominguez:lucasgildominguez@cluster.pwxbaqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
var DATABASENAME = "project";
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) throw error;
        database = client.db(DATABASENAME);
        console.log("MongoDB successful connection");
    });
});

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

app.get('/api/project/GetMeals', (request, response) => {
    database.collection("meals").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.get('/api/project/GetDrinks', (request, response) => {
    database.collection("beverages").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.get('/api/project/GetDesserts', (request, response) => {
    database.collection("dessert").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.get('/api/project/GetApps', (request, response) => {
    database.collection("appetizers").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.get('/api/project/GetReviews', (request, response) => {
    database.collection("reviews").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.post('/api/project/AddReview', multer().none(), (request, response) => {
    database.collection("reviews").countDocuments({}, function (error, numOfDocs) {
        database.collection("reviews").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            text: request.body.text,
            rating: request.body.rating,
            created: request.body.created,
            type: "review"
        });
        response.json("Added Review Successfully");
    })
});

app.get('/api/project/GetReserves', (request, response) => {
    database.collection("reserves").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.post('/api/project/AddReserve', multer().none(), (request, response) => {
    database.collection("reserves").countDocuments({}, function (error, numOfDocs) {
        database.collection("reserves").insertOne({
            id: (numOfDocs + 1),
            name: request.body.name,
            date: request.body.date,
            time: request.body.time,
            numberGuests: request.body.numberGuests,
            reservationId: request.body.reservationId,
            created: request.body.created,
            email: request.body.email,
            type: "reserve"
        });
        response.json("Added Reserve Successfully");
    })
});

app.get('/api/project/GetOrders', (request, response) => {
    database.collection("orders").find({}).toArray((error, result) => {
        response.send(result);
    })
});

app.post('/api/project/AddOrder', multer().none(), (request, response) => {
    database.collection("orders").countDocuments({}, function (error, numOfDocs) {
        database.collection("orders").insertOne({
            id: (numOfDocs + 1),
            cart: JSON.parse(request.body.cart),
            totalPrice: request.body.totalPrice,
            created: request.body.created,
            type: "order"
        });
        response.json("Added Order Successfully");
    })
});

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

app.delete('/api/project/DeleteReview', (request, response) => {
    const reviewId = parseInt(request.query.id);

    if (!reviewId) {
        return response.status(400).json({ error: "Review ID is required" });
    }

    database.collection("reviews").deleteOne({ id: reviewId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the review" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Review not found" });
        }

        response.json("Review Deleted Successfully");
    });
});

app.delete('/api/project/DeleteOrder', (request, response) => {
    const orderId = parseInt(request.query.id);

    if (!orderId) {
        return response.status(400).json({ error: "Order ID is required" });
    }

    database.collection("orders").deleteOne({ id: orderId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the order" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Order not found" });
        }

        response.json("Order Deleted Successfully");
    });
});

app.delete('/api/project/DeleteMeal', (request, response) => {
    const mealId = parseInt(request.query.id);

    if (!mealId) {
        return response.status(400).json({ error: "Meal ID is required" });
    }

    database.collection("meals").deleteOne({ id: mealId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the meal" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Meal not found" });
        }

        response.json("Meal Deleted Successfully");
    });
});

app.delete('/api/project/DeleteDrink', (request, response) => {
    const drinkId = parseInt(request.query.id);

    if (!drinkId) {
        return response.status(400).json({ error: "Drink ID is required" });
    }

    database.collection("beverages").deleteOne({ id: drinkId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the drink" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Drink not found" });
        }

        response.json("Drink Deleted Successfully");
    });
});

app.delete('/api/project/DeleteDessert', (request, response) => {
    const dessertId = parseInt(request.query.id);

    if (!dessertId) {
        return response.status(400).json({ error: "Dessert ID is required" });
    }

    database.collection("dessert").deleteOne({ id: dessertId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the dessert" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Dessert not found" });
        }

        response.json("Dessert Deleted Successfully");
    });
});

app.delete('/api/project/DeleteApp', (request, response) => {
    const appId = parseInt(request.query.id);

    if (!appId) {
        return response.status(400).json({ error: "Appetizer ID is required" });
    }

    database.collection("appetizers").deleteOne({ id: appId }, (error, result) => {
        if (error) {
            return response.status(500).json({ error: "Failed to delete the appetizer" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Appetizer not found" });
        }

        response.json("Appetizer Deleted Successfully");
    });
});
