const mongoose = require("mongoose") // because it's mongoose that allows us to create these models and schemas for our data in the database. mongodb alone is schema-less.

const Schema = mongoose.Schema
// Schema is a function to create a new schema.

const workoutSchema = new Schema({
    // We pass in as an argument an object where we define the schema (what should a typical workout object or document look like)
    // (the first argument describes how the object looks)
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: { // Associating every workout with a user.
        type: String,
        required:true
    }
    // The next step is to assign the workouts for user when we're creating it.
}, {
    // As a 2nd argument, we're going to pass through another object which is going to have a timestamps property and we'll set that as true.
    timestamps: true // what this does is when we try to create a new document, it automatically adds a createdAt property for us, to say when the document was created. It also adds an updated property as well that says when it was last updated.
})
// So, if we try to save a new workout document where one of these fields is missing, it's not gonna allow us to do that, it enforces the above schema for us, which's nice.

// Now what we need to do is make a model based on the above schema.
// In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document. It's a way to express expected properties and values as well as constraints and indexes. A model defines a programming interface for interacting with the database (read, insert, update, etc). So a schema answers "what will the data in this collection look like?" and a model provides functionality like "Are there any records matching this query?" or "Add a new document to the collection".

module.exports = mongoose.model("Workout", workoutSchema )

