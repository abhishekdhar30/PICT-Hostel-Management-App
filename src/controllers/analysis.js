const Attendance = require("../models/attendance");
const User=require("../models/addstudentModels");
const storage = require("node-sessionstorage");
const moment=require("moment");


storage.setItem("userInfo", {
  date:Date().toString().substring(0, 15),
});


const analysis = function (req, res) {


 User.find({}, function (err, user) {
   if (err) {
     console.log(err);
   } else {
     const data = storage.getItem("userInfo");
     console.log(data.date);
     Attendance.findOne({ date: data.date }, function (err, person) {
       if (err) {
         console.log(err);
       } else {

         res.render("analysis", {
           dailyattendance: person.attendance,
           users: user,
           date: data.date,
         });
        }

       
     });

   }
 });


  
};

const postanalysis = async function (req, res) {
  // console.log(req.body);
  let datee=req.body.searcheddate
let converteddate = moment(datee).toString().substring(0, 15);

storage.setItem("userInfo", {
  date: converteddate,
});


// if(req.body.btn==2)
// {
//   const days = req.body.noofdays;
//   console.log(days);
//   var date = new Date();
//   var deletionDate = new Date(date.setDate(date.getDate() - days));
//   await Attendance.deleteMany({
//     createdAt: { $lt: deletionDate },
//   });
// }


  res.redirect("/analysis");
};



module.exports = { analysis, postanalysis };
