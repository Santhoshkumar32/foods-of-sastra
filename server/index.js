import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';

const app=express();
dotenv.config();



app.use(bodyParser.json({limit: "30mb",extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true }));
app.use(cors());

app.get('/', (req,res)=> res.status(200).json({"status":"Landing page"}));
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT=process.env.port || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology : true})
            .then(()=> app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)}))
            .catch((error)=>{console.log(error.message)});



//mongodb setup