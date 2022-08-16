const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required()
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });


router.post("/register", async (req, res) => {
    const {error} = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send("Email already exists")

    const usernameExists = await User.findOne({username:req.body.username});
    if (usernameExists) return res.status(400).send("Username already exists");

    const salt = await bcrypt.genSalt(10);  
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
        username: req.body.username
    })
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
        savedUser.authToken = token;
        res.header("auth-token", token).send(savedUser);
    }catch (error){
        res.send(error).status(400)
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.send(error.details[0].message).status(400);
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Email or Password is Incorrect!")

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or Password is Incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    user.authToken = token;
    res.status(200).send({id:user._id, authToken:user.authToken});
});

router.get("/:id", async (req, res) => {
    try {
        if (req.params.id){
            var id = req.params.id;    
            var good_id = new ObjectId(id);
            const username = await User.findById(good_id)
            //console.log(username.username)
            res.status(200).send(username.username)
        }
    }catch(e){
        
    }
})

module.exports = router;