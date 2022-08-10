const express = require('express');
const app = express();
const mongoose = require("./db/connection")
const AuthRouter = require("./routes/AuthRoutes")

app.use(express.json());

app.use("/api/user", AuthRouter)


const {PORT = 4000} = process.env
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
