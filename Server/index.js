const logs = require("./CreateLogger.js");

const mongoose = require('mongoose');
const express  = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user",UserRoutes);


dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO;

app.listen(PORT , () => {
    console.log(`Connected to PORT: ${PORT}`);
});


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("C ouldn't Connect to MongoDB");
        console.log(`The error is : ${err}`);
    });