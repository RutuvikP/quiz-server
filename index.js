const express=require('express');
const cors=require('cors');
const { connection } = require('./configs/db');
const { userRoutes } = require('./routes/User.routes');
const { authenticate } = require('./middlewares/authenticate');
const { quizRoutes } = require('./routes/Quiz.routes');

const app=express();
app.use(cors());
app.use(express.json());

app.use("/user",userRoutes);
app.use(authenticate);
app.use('/quiz',quizRoutes);

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB!!")
    } catch (error) {
        console.log("Something went wrong!!")
    }
    console.log("Server is Running on 8080");
})