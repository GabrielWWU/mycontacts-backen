const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: [true, "Please add the user name"]
  },
  email:{
    type: String,
    required: [true, "Please add the email"],
    unique: [true, "Email already taken"] // unique email address
  },
  pwd:{
    type: String,
    required: [true, "Please add pwd"]
  }
},{
  timestamps : true
})

module.exports = mongoose.model("User", userSchema)