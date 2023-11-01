const express = require('express');
const mongoose = require('mongoose');
const app = express();
// Load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3300;
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/api',authRoutes);

app.listen(PORT, function(){
    console.log(`Server running at ${PORT}`);
})