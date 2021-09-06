const Profile = require("../models/users");
const passport = require("passport");
const e = require("connect-flash");




const login = function (req, res) {


   if (!req.isAuthenticated()) {
     res.render("login", {
       userisloggedin: false,
       Admin: false,
       success: req.flash("success"),
       danger: req.flash("error"),
     });
     return;
   } 

  Profile.findOne({_id:req.user._id},function(err,user){
     
        if(user.isAdmin=="true")
        {
             res.render("login", {
               userisloggedin: true,
               Admin: true,
               success: req.flash("success"),
               danger: req.flash("error"),
             });
        }
        else
        {
            res.render("login", { 
              userisloggedin: true, 
              Admin: false ,
              success: req.flash("success"),
              danger: req.flash("error"),
             });
        }
  })
   

};

const postlogin = function (req, res) {


   if(req.body.btn=="signin")
   {
   const user = new Profile({
     username: req.body.username,
     password: req.body.password,
   });



   passport.authenticate("local", function (err, user) {
     if (err) {
       req.flash("error","Error:", err.message);
       return res.redirect("/login");
     }
     if (!user) {
       req.flash("error", "Error: Invalid credentials !");
       return res.redirect("/login");
     }
     req.logIn(user, function (err) {
       if (err) {
         req.flash("error", "Error:", err.message);
         return res.redirect("/login");
       }
      if(req.user.isAdmin=="true")
          {
          res.redirect("/dashboard");
          }
          else
          {
              res.redirect("/studentdashboard");
          }
     });
   })(req, res);




  }
  else if(req.body.btn=="signup")
  {


    if(req.body.token!=process.env.SIGNUP_TOKEN)
    {
       req.flash("error", `Error: Yoh have entered Wrong Token ! Please contact admin for token`);
      return  res.redirect("/login");

    }
    
    if (req.body.password !==req.body.confirm) {
      req.flash(
        "error",
        `Error: Password don't match !`
      );
      return res.redirect("/login");
    }

     Profile.register(
       { username: req.body.username },
       req.body.password,
       function (err, user) {
         if (err) {
           console.log(err);
           
            res.redirect("/login");
         } else {
           passport.authenticate("local")(req, res, function () {
             
             console.log("Successfully created user");
              if (req.user.isAdmin == "true") {
                res.redirect("/dashboard");
              } else {
                res.redirect("/studentdashboard");
              }
           });
         }
       }
     );
  }
  

};

module.exports = {login,postlogin};