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
    },
    count:{
      type:Number,
      default:0
    }
   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
