const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://gqpw9nkltw:gqpw9nkltw@cy8nf5d6kj.l2errdm.mongodb.net/sm2?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("server is running on port 3000");
});

const userSchema = new mongoose.Schema({
  AccessToken: String,
  Username: String,
  Email: String,
  Phone_Number: Number,
  Role: {
    type: String,
    enum: ['user', 'admin', 'manager', 'guest'],
    default: 'user',
  },
  First_Name: String,
  Last_Name: String,
  Image: String,
  Last_Login: Date,
});

const User = mongoose.model('User', userSchema);

app.post('/createOrLogin', async (req, res) => {
  try {
    const { Email, Username, First_Name, Last_Name, Image, AccessToken } = req.body;

    if (!AccessToken) {
      return res.status(400).json({ error: 'Access Token is required' });
    }

    let user = await User.findOne({ Email });

    if (user) {
      user.Last_Login = new Date();
      await user.save();
      res.status(200).json({ message: 'User login successful', user });
    } else {
      user = new User({
        AccessToken,
        Username,
        Email,
        Phone_Number: 0,
        Role: 'user',
        First_Name,
        Last_Name,
        Image,
        Last_Login: new Date(),
      });

      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating or logging in the user' });
  }
});

const itemRatingSchema = new mongoose.Schema({
  FoodItem: {
    type: String,
  },
  Rating: {
    type: Number,
    default: 0,
  },
  User: {
    type: String,
  },
});

const ItemRating = mongoose.model('ItemRating', itemRatingSchema);
app.post('/addRating', async (req, res) => {
  try {
    const { FoodItem, Rating, User } = req.body;

    if (!FoodItem || !Rating || !User) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if a rating already exists for this FoodItem and User
    const existingRating = await ItemRating.findOne({ FoodItem, User });

    if (existingRating) {
      // If a rating exists, update it
      existingRating.Rating = Rating;
      await existingRating.save();

      res.status(200).json({ message: 'Rating updated successfully', itemRating: existingRating });
    } else {
      // If no rating exists, create a new one
      const itemRating = new ItemRating({
        FoodItem,
        Rating,
        User,
      });

      await itemRating.save();

      res.status(201).json({ message: 'Rating added successfully', itemRating });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding or updating the rating' });
  }
});


const foodItemSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Calories: {
    type: Number,
  },
  Category: {
    type: Number,
    required: true,
  },
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

// Add a route to fetch all food items
app.get('/foodItems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json({ foodItems });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching food items' });
  }
});

// Define a new route to retrieve all ratings
app.get('/ratings', async (req, res) => {
  try {
    const ratings = await ItemRating.find();
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ratings' });
  }
});
