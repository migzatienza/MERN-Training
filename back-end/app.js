//INIT VAR
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 5060;
const dbo = require("./db/conn");

var bodyParser = require("body-parser");
const axios = require('axios');
app.use(cors());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(express.json({limit: '50mb'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false}));
var cron = require('node-cron');


try {
    //ROUTES
    //#region Training Management
    //   const authRoute = require("../routes/auth.js");
    //   app.use(authRoute.authRoute);


    const LibraryRoutes = require("./routes/library/library")
    app.use(LibraryRoutes);

} catch (error) {
    console.log(error);
}


app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
        else {
            console.log(`Server is running on port: ${port}`);
        }
    });
});
