const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./db/db');
const cookieParser=require('cookie-parser');
const userRoutes=require('./src/routes/user.routes');
const captainRoutes=require('./src/routes/captain.routes');
connectDB();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/captain',captainRoutes);

module.exports=app;