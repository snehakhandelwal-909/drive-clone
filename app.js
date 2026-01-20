const express= require('express');
const app=express();
const userRouter=require('./routes/user.routes');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv=require('dotenv');
dotenv.config();
app.use('/user',userRouter);
const connectDB=require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const indexRouter=require('./routes/index.routes');
app.use('/',indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});