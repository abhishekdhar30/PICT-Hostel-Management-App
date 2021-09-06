const Profile = require("../models/users");

const changeprofile = function (req, res) {
    
   
        Profile.findOne({ _id: req.user._id }, function (err, profiles) {
          if (err) console.log(err);
          if (profiles) {
            res.render("changeprofile", {
              displayusername: profiles.username,
              Admin: profiles.isAdmin,
              user: profiles,
              success: req.flash("success"),
              danger: req.flash("error"),
            });
          } else {
            res.render("changeprofile", {
              displayusername: "No data available",
              Admin: profiles.isAdmin,
              user: "",
              success: req.flash("success"),
              danger: req.flash("error"),
            });
          }
        });
 
};


const postchangeprofile = function (req, res) {

   // console.log(req.body);

      if(req.body.password!==req.body.confirmpassword)
      {
           console.log("error");
            req.flash("error", "Password don't match !");
            return  res.redirect("/changeprofile");
      }
      else
      {

            Profile.findByUsername(req.body.username).then(
              function (sanitizedUser) {
                if (sanitizedUser) {
                  sanitizedUser.setPassword(req.body.password, function () {
                    sanitizedUser.save();
                      console.log("password reset successful'");
                  });
                } else {
                  // console.log('This user does not exist');
                   req.flash("error", "User does not exist!");
                      return  res.redirect("/changeprofile");
                //   return res.redirect("/forget");
                }
              },
              function (err) {
                // console.log(err);
                if (err)
                console.log(err);
                  req.flash("error", "Error occured! Please contact developer");
                     return  res.redirect("/changeprofile");
              }
            );

            var myquery = { _id: req.user._id };
            var newvalues = {
              $set: {
                name: req.body.name,
                contact: req.body.contact,
                city: req.body.city,
              },
            };
            Profile.updateOne(myquery, newvalues, function (err, res) {
              if (!err) {
                
          
                console.log("Documents updated successfully");
                  
              }
               
            });

      }

 req.flash("success", `You have successfully updated your Profile !`);
  res.redirect("/changeprofile");

};

module.exports={postchangeprofile,changeprofile}