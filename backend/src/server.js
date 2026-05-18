//import express from "express"; -to use this, it is necessary to set the type: module into the package.json

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");




dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001

//middleware: function that runs in the middle between the request and the response
app.use(
    cors({
        origin: "http://localhost:5173",
    })
); // Allow request to every single url
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);


// our simple custom middleware 
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Request URL is ${req.url}`);
//     next();
// })



// What is an endpoint ?
// An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.

app.use("/api/notes",notesRoutes);

connectDB().then(()=> {
    app.listen(5001, () => {
        console.log("Server started on PORT:",PORT);
    });
});


// use npm run dev to run the server.js and every change saved it will automatically re start the server 


// mongodb+srv://william_lemus:U0VCTctI0yLwMNAK@cluster0.5zasnqn.mongodb.net/?appName=Cluster0