// We don't have access to the app inside this file. How do we create the routes? The way that we do it is by using the Express router.
const express = require("express")
// const Workout = require("../models/workoutModel")
// Relative path
// Relative paths make use of two special symbols, a dot (.) and a double-dot (..), which translate into the current directory and the parent directory. Double dots are used for moving up in the hierarchy. A single dot represents the current directory itself.
const router = express.Router() // this will create an instance of the router for us.

const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController")
const requireAuth = require("../middleware/requireAuth")

// After we instantiate the router, we want to say:
router.use(requireAuth) // Eequire auth for all workout routes. What this will do is that it'll fire the requireAuth midlleware function before all of the stuff that's below (the different route handlers) because we want to protect all of the following routes. Only authenticated users can access the following routes.

// GET all workouts
router.get("/", getWorkouts)

// GET a single workout
router.get("/:id", getWorkout)

// POST a new workout
router.post("/", 
    // async (req, res) => {
    // const {title, load, reps} = req.body
    // try{
        // We'll use the "Workout" model to create a new workout document inside the workouts collection. Let's go ahead and import that model.
        // const workout = await Workout.create({title, load, reps})
        // Workout.create() is asynchronous. We'll change the route handler function to be asynchronous and await. We're now storing the response of Workout.create() in workout constant. Normally, when we create a new document, once that's been created, the response we get is the new document that was just created along with the id of that document.
//         res.status(200).json(workout)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }
createWorkout)
// If we want to add a new workout to the database, we have to send the data for that workout document. We can access that from the req object. But we can only access that if we use a bit of middleware in an express app and that middleware is express.json. Going ahead and coding it.

// DELETE a workout
router.delete("/:id", deleteWorkout)

// UPDATE a workout
router.patch("/:id", updateWorkout)

// Once we've created all of our routes, we can export the router and the way we do that is:
module.exports = router
// Inside the server.js file, we could require this router.