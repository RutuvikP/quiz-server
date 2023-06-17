const {Router}=require('express');
const { QuizModel } = require('../models/Quiz.model');

const quizRoutes=Router();

// for getting all quizes
quizRoutes.get("/",async(req,res)=>{
    try {
        const quizes=await QuizModel.find()
        res.send(quizes)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

// for creating quiz
quizRoutes.post("/add",async(req,res)=>{
    try {
        const quiz=new QuizModel(req.body)
        await quiz.save();
        res.send({"msg":"New Quiz Added !!"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

// patch request
quizRoutes.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    const quiz=await QuizModel.findOne({_id:id})
    if(quiz){
        if(quiz.authorID==req.body.authorID){
            await QuizModel.findByIdAndUpdate({_id:id},req.body)
            res.send({"msg":"Quiz Updated!!"})
        }else{
            res.send({"msg":"Not Autorized To Update This!!"})
        }
    }else{
        res.send({"msg":"Quiz Not Found!!"})
    }
})

// delete request
quizRoutes.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const quiz=await QuizModel.findOne({_id:id})
    if(quiz){
        if(quiz.authorID==req.body.authorID){
            await QuizModel.findByIdAndDelete({_id:id})
            res.send({"msg":"Quiz Deleted!!"})
        }else{
            res.send({"msg":"Not Autorized To Delete This!!"})
        }
    }else{
        res.send({"msg":"Quiz Not Found!!"})
    }
})

module.exports={quizRoutes};