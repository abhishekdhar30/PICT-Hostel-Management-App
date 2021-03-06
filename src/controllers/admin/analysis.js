const Attendance = require("../../models/attendance");
const User=require("../../models/addstudentModels");
const storage = require("node-sessionstorage");
const moment=require("moment");


storage.setItem("userInfo", {
  date:Date().toString().substring(0, 15),
});


const analysis = function (req, res) {

 
const data = storage.getItem("userInfo");

   



 User.find({}, function (err, user) {
   if (err) {
     
     console.log(err);
    
   } else {
    
     console.log(data.date);
     Attendance.findOne({ date: data.date }, function (err, person) {
       if (err) {
         console.log(err);
       } else {
          console.log(user);

        if(person&&user.length!=0)
        {
          console.log("chal");
         res.render("admin/analysis", {
           dailyattendance: person.attendance,
           users: user,
           date: data.date,
           Admin: "true",
           displayusername: req.user.username,
           success: req.flash("success"),
           danger: req.flash("error"),
         });
        }
       
       else if(person)
       {
        
          res.render("admin/analysis", {
            dailyattendance: person.attendance,
            date: data.date,
            users: "NULL",
            Admin: "true",
            displayusername: req.user.username,
            success: req.flash("success"),
            danger: req.flash("error"),
          });
       }
       else if(user.length!=0)
       {
         
         res.render("admin/analysis", {
           users: user,
           date: data.date,
           dailyattendance: "NULL",
           Admin: "true",
           displayusername: req.user.username,
           success: req.flash("success"),
           danger: req.flash("error"),
         });
       }
       else
       {
         
          res.render("admin/analysis", {
            users: "NULL",
            date: data.date,
            dailyattendance: "NULL",
            Admin: "true",
            displayusername: req.user.username,
            success: req.flash("success"),
            danger: req.flash("error"),
          });
       }
      }

       
     });

   }
 });


  
};

const postanalysis = async function (req, res) {
  // console.log(req.body);

 if(req.body.btn==1)
 { 
  let datee=req.body.searcheddate
let converteddate = moment(datee).toString().substring(0, 15);

storage.setItem("userInfo", {
  date: converteddate,
});
   
 req.flash("success", `You have successfully Changed the date for Analysis !`);
 }


else if(req.body.btn==2)
{

  let noOfdays = (req.body.noofdays);
  let converteddays = noOfdays.toLowerCase();

  if(converteddays=="delete")
  {
     await Attendance.deleteMany({});
  }
  else{
  const days = req.body.noofdays;
  console.log(days);
  var date = new Date();
  var deletionDate = new Date(date.setDate(date.getDate() - days));
  await Attendance.deleteMany({
    createdAt: { $lt: deletionDate },
  });
  }
   req.flash("success", `Records are deleted successfully !`);
}


  res.redirect("/analysis");
};



module.exports = { analysis, postanalysis };
