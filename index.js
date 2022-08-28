const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config({
    path:"./config.env"
})

const mongoose=require("mongoose");
require("./db/connection");
const PORT=process.env.PORT;

const validator=require("validator");
const parser=require("body-parser");
const path=require("path");
const res = require("express/lib/response");
app.use(parser.urlencoded({extended:true}));
const staticpath=path.join(__dirname,"/public");
app.use(express.static(staticpath));

const schema=new mongoose.Schema({
    Department:{
        type: String,
        required:true,
    },
    Doctor:{
        type: String,
        required:true,
    },
    Visited:{
        type: String,
        required:true,
    },
    Date_of_birth:{
         type:Date,
         required:true,
    },
    Name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    Email:{
        type:String,
        required:true,
        unique:[true,"Enter Correct Email ID..."],
    },
    Number:{
        type:Number,
        required:true,
        unique:[true,"Plz...Enter Correct Contact Number..."],
        min:10,
        trim:true
    },
    Message:{
        type:String,
        required:true,
    }
});

const Hospital=new mongoose.model("Hospital",schema);

app.post("/",async (req,res)=>{
    try{
        const Document=new Hospital({
            Department:req.body.department,
            Doctor:req.body.doctor,
            Visited:req.body.visited,
            Date_of_birth:req.body.dob,
            Name:req.body.name,
            Email:req.body.email,
            Number:req.body.contact,
            Message:req.body.message
        })
        const doc=await Document.save();
        console.log(doc);
        res.redirect("/");
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
   
})

app.listen(PORT,()=>{
    console.log("listening...");
})