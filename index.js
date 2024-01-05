require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/userRoutes')
const path =require(`path`)
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,`build`)))

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.get(`*`,(req,res)=>res.sendFile(path.resolve(`build`,`index.html`)))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
