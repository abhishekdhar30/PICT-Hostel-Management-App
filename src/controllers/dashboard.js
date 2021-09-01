const User = require("../models/addstudentModels");
const Attendance = require("../models/attendance");




const dashboard = function (req, res) {

    // User.find({},function(err,users){
    //     if(users)
    //     {
    //         res.render("dashboard", { users:users });
    //     }
    // })

    

  


 User.find({}, function (err, user) {
   if (err) {
     console.log(err);
   } else {
     const date = Date().toString().substring(0, 15);
     Attendance.findOne({ date: date }, function (err, person) {
       if (err) {
         console.log(err);
       } else {
         if (person && user) {
           res.render("dashboard", {
             dailyattendance: person.attendance,
             users: user,
           
           });
         } else if (person) {
           res.render("dashboard", {
             dailyattendance: person.attendance,
             users: "NULL",
             chart: chart,
           });
         } else if (user) {
           res.render("dashboard", {
             users: user,
             dailyattendance: "NULL",
             chart: chart,
           });
         } else {
           res.render("dashboard", {
             users: "NULL",
             dailyattendance: "NULL",
             chart: chart,
           });
         }
       }
     });
   }
 });



    
}

module.exports=dashboard;