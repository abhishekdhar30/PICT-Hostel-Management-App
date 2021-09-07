
const Profile=require("../models/users");

const admin = async(req, res, cb) => {
   const user = await Profile.findById(req.user._id);
 
  if (user && user.isAdmin=="true") {
     cb(null);
  } else {
     res.render("404");
      
  }
};



const isauthenticated = async (req, res, cb) => {
 if (!req.isAuthenticated()) {
   req.flash(
     "error",
     "Error: User is not authenticated ! You have to first login to get access to the page"
   );
   res.redirect("/login");
 }
 else
 {
    cb(null);
 }

};



module.exports= {admin,isauthenticated} ;
