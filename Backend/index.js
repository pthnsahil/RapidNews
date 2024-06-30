const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const UserRoutes=require('./Routes/User');
const NewsRoutes=require('./Routes/News');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '100mb' })); 

mongoose.connect("mongodb://127.0.0.1:27017/News")
        .then(() => { console.log(" DB Connected sucessfully ")})
        .catch(err => console.log(err))

app.use('/news',NewsRoutes);
app.use('/user',UserRoutes);

app.listen(port, () => { console.log(`Server is running on ${port}`);});
