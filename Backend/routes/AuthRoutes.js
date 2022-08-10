const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });


router.post("/register", async (req, res) => {
    const {error} = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10);  
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (error){
        res.status(400).send(error)
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or Password is Incorrect!")

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or Password is Incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;