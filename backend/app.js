const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./db/db');
const userRoutes=require('./src/routes/user.routes');
const cookieParser=require('cookie-parser');

connectDB();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.use('/users',userRoutes);

module.exports=app;