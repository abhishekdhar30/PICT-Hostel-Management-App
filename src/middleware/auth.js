
const Profile=require("../models/users");

const admin = async(req, res, cb) => {
   const user = await Profile.findById(req.user._id);
 
  if (user && user.isAdmin=="true") {
     cb(null);
    // next();
  } else {

    res.status(401);
    cb(new Error("Not authorized as an admin"));
  }
};

module.exports= admin ;
