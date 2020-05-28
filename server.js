const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const { mongoURL } = require('./config/keys');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());


require('./config/passport')(passport);


mongoose.set('useFindAndModify', false);
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected To Mongo DB"))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Server is working"));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });