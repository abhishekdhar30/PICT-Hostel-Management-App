const mongoose = require("mongoose");

//structure of database
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    room:{
      type:String,
    },
    status:{
      type:String,
    },
    fathersemail:{
      type:String,
    },
    email:{
      type:String,
    },
    address:{
      type:String
    },
    city:{
      type:String
    },
    contact:{
      type:String
    },
    fatherscontact:{
      type:String
    }
   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
