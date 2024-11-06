const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://new:new@data.rnukr.mongodb.net/?retryWrites=true&w=majority&appName=Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Order Schema
const orderSchema = new mongoose.Schema({
  shopName: String,
  product: String,
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// POST route to save an order
app.post('/orders', async (req, res) => {
  const { shopName, product, quantity, price } = req.body;

  try {
    const newOrder = new Order({ shopName, product, quantity, price });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save order', error });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
