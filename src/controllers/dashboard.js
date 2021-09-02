const User = require("../models/addstudentModels");
const Attendance = require("../models/attendance");
const Profile=require("../models/users")



const dashboard = function (req, res) {

  
   if (!req.isAuthenticated()) {
     res.redirect("/login");
     return;
   }


 User.find({}, function (err, user) {
   if (err) {
     console.log(err);
   } else {
     const date = Date().toString().substring(0, 15);
     Attendance.findOne({ date: date }, function (err, person) {
       if (err) {
         console.log(err);
       } else {

        Profile.findOne({ _id: req.user._id }, function (err, profiles) {

          if(profiles)
          {
             
                  if (person && user) {
                     res.render("dashboard", {
                      dailyattendance: person.attendance,
                      users: user,
                      Admin:profiles.isAdmin
                     });
                  } else {
                     res.render("dashboard", {
                       users: "NULL",
                       dailyattendance: "NULL",
                       Admin: profiles.isAdmin,
                     });
                  }
           
          }

          else
          {
            //users he nhi hai toh redirect login pe he krana h
             res.redirect("/login");
          }


        });


        }


     });
   }
 });



    
}

module.exports=dashboard;