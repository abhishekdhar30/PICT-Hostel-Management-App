const Profile = require("../models/users");

const home = function (req, res) {
  
  if (!req.isAuthenticated()) {
    res.render("home", {
      userisloggedin: false,
      Admin: false,
    });
    return;
  }

  Profile.findOne({ _id: req.user._id }, function (err, user) {
    console.log(user.isAdmin);
    if (user.isAdmin == "true") {
      res.render("home", { userisloggedin: true, Admin: true });
    } else {
      res.render("home", { userisloggedin: true, Admin: false });
    }
  });

};

module.exports = home;
