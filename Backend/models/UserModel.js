const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
      },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        default: null,
    },
    password: {
        type: String,
        required: true,
        max: 2048,
        min: 6,
      },
    authToken: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model("User", userSchema);