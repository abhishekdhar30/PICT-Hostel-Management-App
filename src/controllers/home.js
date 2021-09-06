const Profile = require("../models/users");

const home = function (req, res) {
  

//  Profile.findOne({ _id: req.user._id }, function (err, user) {
//    console.log(user.isAdmin);
//    if (user.isAdmin == "true") {
//      res.render("home", { userisloggedin: req.user, Admin: true });
//    } else {
//      res.render("home", { userisloggedin: req.user, Admin: false });
//    }
//  });


   
    
        res.render("home", { userisloggedin: req.isAuthenticated(),user:req.user});





};

module.exports = home;
