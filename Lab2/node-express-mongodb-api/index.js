const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://dheeraj20051234:FG9xkCcyJLKLWmkS@cluster0.h3ytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const swaggerDocs = require("./swagger"); // Swagger Documentation
swaggerDocs(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});