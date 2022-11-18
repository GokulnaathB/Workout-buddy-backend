// This file is kind of like the entry file for the backend application. It's where we're going to register the express app.
// The next thing we need to do is create a package.json file inside the backend folder. This is going to allow us to keep track of dependencies and also register our own custom scripts. npm init -y
// The next step is to install the express package so that we can use that to create an express app. npm i express

// requiring express package to create an express app:
const express = require("express")
const workoutRoutes = require("./routes/workouts") // now we have the workout routes, we can "use" them in our app.
const userRoutes = require("./routes/user")
const mongoose = require("mongoose")
const cors = require('cors')

require("dotenv").config()

// Starting up the express app:
const app = express()
app.use(cors())

// We're to register a little piece of middleware. Middleware is a fancy name for any code that executes between us getting a request on the server and us sending a response. The function that fires when a get request is recognized is technically a middleware.
// We can register some of kind of global middleware in our express app as follows:
app.use(express.json()) // what that does is, any request that comes in, it looks if it has some body, some data that we're sending to the server. If it does, then it parses it and attaches it to the req object so that we can acces it in the request handler.
app.use((req, res, next) => { // this function will fire for every request that comes in. We get access to 3 arguments: req, res, a function called next which we have to run at the end of this middleware in order to move on to the next piece of middleware, which in our case of sending a request to "/" is the associated function that fires up. So, we have to invoke next when we're finished.
    console.log(req.path, req.method)
    next() 
})

// Reacting to requests. To do that, we need to set up a route handler:
// This is going to respond to a get request coming in:
// app.get("/", (req, res) => { // technically, this function is a middleware.
// req: the request object which has information about the request.
// res: the response object which we use to send a response back to the browser or the client.
// res.json({"mssg": "Welcome to the app"}) // this sends back a json string.
// })
// route "/" is for going to the root of the domain.

app.use("/api/workouts", workoutRoutes) // this just attaches all of the routes to the app. Now, what we want to do as well is we want to only fire these routes when we come to a specific path. For example, placing another argument inside use(), "/api/workouts". When we fire a request to this route, only then we can use workoutRoutes and they become relative: when a user goes to /api/workouts/, the function of / will be fired. 
app.use("/api/user", userRoutes)

mongoose.connect(process.env.MONGO_URI) // this will go out and try and connect to the database. It's asynchronous in nature, it takes a little bit of time to do and therefore returns a promise. Let's tack on a dot then method to fire a function when it's complete.
.then(() => {
    // We don't want to start accepting any kind of requests or listening for requests wntil we've connected to the database. So, we do the following:
    app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT)
    })

})
.catch((error) => { // this might happen is the uri is incorrect or if the  credentials are not correct as well.
    console.log(error)
})

// The next thing we want to do is listen for requests, we want to basically listen to a certain port number. (shifted insiden to .then() of mongoose.connect())


// Installing nodemon package so as to automatically restart our server when we make changes in our code.
// https://stackoverflow.com/questions/63423584/how-to-fix-error-nodemon-ps1-cannot-be-loaded-because-running-scripts-is-disabl

// Shutting our server and going to package.json file to create a new script: "dev": "nodemon server.js". Now when we run "npm run dev" command in our terminal, it's the same as running "nodemon server.js". Whenever we make a change, it's gonna re-run the script for us.

// We're hardcoding the port number. We should store any constants like this in an environment variable. The benefit of doing this is that when we eventually push our projects to repositories like on github, the environment variables can remain hidden and they're not visible in the code. Now that might not be a big deal when it comes to the port number for now, but when it comes to more sensitive information like a db connection string or an authentication secret, we don't want them to be visible. So, they're better off going in an environment variables which will remain hidden. They way we're gonna do this is by making a .env file in the backend folder and this is gonna store all environment variables. The idea is that when you're pushing your code up to something like github, you add the .env file to your git ignore file and then this file won't be pushed up. So, everything in here remains private.
// Say we wanna access now these environment variables in our code. How do we do that? We need to do it with the help of a node package called dotenv. dotenv is a package that loads environment variables from a .env file into the process.env object available to us globally in a nodejs environment (process is a global object available to us in node applications).
// We require the package and directly invoke the config method on it once it's been required. This is the method that's going to attach the environment variables for us to the process object.

// When we press enter in the url bar in the browser, it sends a get request. And if we want to send post requests or delete requests, we're gonna have to create some javascript on the frontend to send those requests. (the POST request method requests that a web server accept the data enclosed in the body of the request message, most likely for storing it. It is often used when uploading a file or when submitting a completed web form.)
// Or, before we have that frontend, we could use a tool cald postman to try out those different routes and requests.





