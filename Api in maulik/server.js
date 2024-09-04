require('dotenv').config();
const express = require('express');
const app = express();
const Admin = require('./app/routes/adminRoute');
const User = require('./app/routes/userRoute');

app.use(express.json());


const port = process.env.PORT;

app.use('/admin', Admin)
app.use('/user', User)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});