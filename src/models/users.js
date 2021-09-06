const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
 const passport = require("passport");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: String,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(passportLocalMongoose);



const Profile = mongoose.model("Profile", userSchema);

passport.use(Profile.createStrategy());
passport.serializeUser(Profile.serializeUser());
passport.deserializeUser(Profile.deserializeUser());

module.exports = Profile;