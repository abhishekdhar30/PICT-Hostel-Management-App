const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
     
    },
    email: {
      type: String,
     
    },
    password: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose);



// //for encrpt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// //for decrypt

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Profile = mongoose.model("Profile", userSchema);

module.exports = Profile;