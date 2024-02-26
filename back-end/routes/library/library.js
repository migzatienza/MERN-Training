const express = require("express")

const LibraryRoutes = express.Router()

const dbo = require("../../db/conn")

LibraryRoutes.route("/api/getBooks").get(function (req,res){

    let db_connect = dbo.getDb()

    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }   

    db_connect.collection("Library").find({}).toArray(function (err,result){
        if(err){
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully fetch"
        response.payload = result

        res.json(response)
    })

})

LibraryRoutes.route("/api/storeBooks").post(function (req,res){
    
    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }   

    const payload = req.body.payload

    let myObect = {
        book_name: payload.book_name,
        author : payload.author
    }

    let db_connect = dbo.getDb();
    
    // "INSERT INTO LIBRARY (myObject.keys) VALUES (myObject.value)"
    
    db_connect.collection("Library").insertOne(myObect,function(err,response){
        if(err){
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully added"        

        res.json(response)
    })




})

module.exports = LibraryRoutes;
