const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt") // um pwd zu entschlüsseln 
const jwt = require("jsonwebtoken")
//@desc e.g. Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, pwd } = req.body;
  if (!username || !email || !pwd) {
    res.status(400);
    throw new Error("The fields username, email and pwd are mandatory!");
  }

  const existentEmail = await User.findOne({ email });
  if (existentEmail) {
    res.status(400);
    throw new Error("Email is already taken");
  }

  // hash pwd
  const hashedPwd = await bcrypt.hash(pwd, 10);
  console.log("Hashed Pwd: ", hashedPwd);

  const user = await User.create({
    username,
    email,
    pwd: hashedPwd
  })

  if(user){
      res.status(201).json({
        _id: user._id,
        email: user.email
      })
  }else {
    throw new Error("user data is not valid ")
  }
  res.status(201).json({ message: "User registered successfully"});
})

const loginUser = asyncHandler(async (req, res) => {
  const {email, pwd} = req.body;

  if(!email || !pwd){
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(pwd, user.pwd))){ // user existiert und das pwd passt auch 
    const accessToken = jwt.sign({
      user:{
        username: user.username,
        email: user.email,
        id: user.id
      }
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min"}
  );
      res.status(200).json({accessToken})
  }else {
    res.status(401)
    throw new Error("email or pwd is wrong")
  }

  res.json({message:"Login the user"})
})

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  currentUser
}