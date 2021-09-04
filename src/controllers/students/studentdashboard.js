const Attendance = require("../../models/attendance");
const Profile = require("../../models/users");
const User = require("../../models/addstudentModels");

const studentdashboard=function(req,res){
 const date = Date().toString().substring(0, 15);

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    Profile.findOne({ _id: req.user.id }, function (err, user) {
      if (user) {
        User.findOne({ email: user.username }, function (err, addstudent) {
          if (addstudent) {
            Attendance.findOne({date:date}, function (err, allattendance) {
              if (err) console.log(err);

              if (allattendance) {
                let status = "";
               
                  for (const [key, value] of allattendance.attendance) {
                    if (key == addstudent._id) {
                      status=value;
                    }
                  
                }

                res.render("students/studentdashboard", {
                  status: status,
                  Admin: "false",
                  displayusername: req.user.username,
                  amount: addstudent.fee - addstudent.amountpaid,
                  roomno: addstudent.room,
                  fee: addstudent.fee,
                  totalpaid: addstudent.amountpaid,
                });
              } else {
                res.render("students/studentdashboard", {
                  status: "Not Marked Yet!",
                  Admin: "false",
                  displayusername: req.user.username,
                  amount: addstudent.fee - addstudent.amountpaid,
                  roomno: usaddstudenter.room,
                  fee:addstudent.fee,
                  totalpaid:addstudent.amountpaid
                });
              }
            });
          } else {
            res.render("students/studentdashboard", {
              status: "Not Registered!",
              Admin: "false",
              displayusername: req.user.username,
              amount: "Not Registed",
              roomno: "Not Registered",
              fee: "Not Registered",
              totalpaid: "Not Registered",
            });
          }
        });
      } else {
        res.render("students/studentdashboard", {
          status: "Not Registered!",
          Admin: "false",
          displayusername: req.user.username,
          amount: "Not Registed",
          roomno: "NOt Registered",
          fee: "Not Registered",
          totalpaid: "Not Registered",
        });
      }
    });

   
}


module.exports = studentdashboard;