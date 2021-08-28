const Profile = require("../models/users");
 const passport = require("passport");



const register = function (req, res) {


  if (!req.isAuthenticated()) {
    res.render("register", {
      userisloggedin: false,
      Admin: false,
    });
    return;
  }

  Profile.findOne({ _id: req.user._id }, function (err, user) {
    if (user.isAdmin == "true") {
      res.render("register", { userisloggedin: true, Admin: true });
    } else {
      res.render("register", { userisloggedin: true, Admin: false });
    }
  });

};

const postregister = function (req, res) {
  Profile.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("Successfully created user");
          res.redirect("/register");
        });
      }
    }
  );

  // //  console.log(req.body);
  // res.redirect("/register");
};

module.exports = { register, postregister };
