const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');

// const verifyToken = require("./routes/verifyToken");

app.get('/', (req, res) => {
  res.send('Welcome to the auth system');
});

// app.get('/api/users/profile', verifyToken,(req, res) => {
//   res.send('This is the user profile');
// });

app.use('/api/users', authRoutes);

mongoose
  .connect(
    'mongodb+srv://recipes_auth:2jLOEkFlpEPemBCJ@cluster0.y5nda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
  .then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => console.log(err));
