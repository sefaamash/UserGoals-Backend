//Bringing in libraries
const express = require("express");
const dotenv = require("dotenv").config();
const color = require("colors");
const { errhand } = require("./middleware/errormiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000; //TO ACESS ENVIROMENT VARIABLES or .env we use process keyword so to acess port value in env file we use process.env.PORT
connectDB.connectDB();
const app = express();

app.use(express.json());
//this lineindictes that data that will come from frontend will be in specific format for eg json or objct form
app.use(
  express.urlencoded({
    urlencoded: false,
  })
);

//api goals api route
app.use("/api/goals", require("./Routes/goalRoutes"));
//User Routes
app.use("/api/users", require("./Routes/userroutes"));

//Using error handler
app.use(errhand);

//running the server
app.listen(port, () => console.log("Server started running on port " + port)); //This line says run the server on port 5000 and wheever the server run print the arrow function message in consoile

//Cookies in JavaScript | How do Cookies work in JavaScript? Cookies in JavaScript is a set of data stored in the browser that is fetched whenever a web page is loaded, and the content of this cookie will be used to reload the web page whenever there is a connectivity issue or the server is not reachable.
