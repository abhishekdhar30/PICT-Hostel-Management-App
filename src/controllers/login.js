const Profile = require("../models/users");
const passport = require("passport");




const login = function (req, res) {


   if (!req.isAuthenticated()) {
     res.render("login", {
       userisloggedin: false,
       Admin: false,
     });
     return;
   } 

  Profile.findOne({_id:req.user._id},function(err,user){
     
        if(user.isAdmin=="true")
        {
             res.render("login", { userisloggedin :true, Admin: true,});
        }
        else
        {
            res.render("login", { userisloggedin: true, Admin: false });
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

   req.login(user, function (err) {
     if (err) {console.log(err);
     res.redirect("/login");}
     else {
       passport.authenticate("local")(req, res, function () {
         console.log("Successfully login");
       
          res.redirect("/dashboard");
       });
     }
   });
  }
  else if(req.body.btn=="signup")
  {
     Profile.register(
       { username: req.body.username },
       req.body.password,
       function (err, user) {
         if (err) {
           console.log(err);
           
            res.redirect("/login");
         } else {
           passport.authenticate("local")(req, res, function () {
             
             res.redirect("/dashboard");
             console.log("Successfully created user");
           });
         }
       }
     );
  }
  

};

module.exports = {login,postlogin};