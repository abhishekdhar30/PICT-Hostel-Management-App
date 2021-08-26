const User = require("../models/addstudentModels");
const Attendance = require("../models/attendance");
const moment = require("moment");
const sendingMail=require("../nodemailer/mail")

const attendance = function (req, res) {

  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    } else {


     const date = Date().toString().substring(0, 15);
     Attendance.findOne({ date: date }, function (err, person) {
       if (err) {
         console.log(err);
       } else {
         if (person && user)
             {

              res.render("attendance", {
                dailyattendance: person.attendance,
                users: user,
              });
             }

            else if(person)
            {
               res.render("attendance", {
                 dailyattendance: person.attendance,
                 users:"NULL"
               });
            }
            else if(user)
            {
              res.render("attendance", { users: user,dailyattendance:"NULL"});
            }
            else
            {
           res.render("attendance", { users: "NULL", dailyattendance: "NULL" });
          }
         
       }
     });


      // res.render("attendance", { users: user });
    }
  });




 

 
};


const postattendance = async function (req, res) {
  const date = Date().toString().substring(0, 15);
  // console.log(req.body);

    let emails = req.body.email;
  let status = req.body.status;

  const attendance = await Attendance.findOne({
    date: date,
  });

  if(attendance)
  {
      const allAttendance = attendance.attendance;
        
   
      if(typeof(emails)=="string")
      {
        let count=0; 
           for (const [key, value] of allAttendance) {
             if(emails===key)
             {
               allAttendance.set(key,status);
               count=1;
              
             }
           }

           if(count===1)
           {
             allAttendance.set(emails, status);
           }
         
      }
      else
      {
        let f=0;
        for (const [key, value] of allAttendance) 
        {
          for (let i = 0; i < emails.length; i++) 
          {
              if (emails[i] === key) {
              allAttendance.set(key, status[i]);
              f=1;
                
            }
          }
        }
        if(f===1)
        {
             for (let i = 0; i < emails.length; i++) {
                allAttendance.set(emails[i], status[i]);
             }
        }
      }
        
         attendance.attendance=allAttendance;
         await attendance.save();
             
  

    
  }

  else
  {
  const newAttendance = new Attendance({
    date: date,
    attendance: {},
  });

  // console.log(typeof(emails));

  if(typeof(emails)=="string")
  {
       newAttendance.attendance.set(emails, status);
  }

   else
   {
  for (let i = 0; i < emails.length; i++) {
    newAttendance.attendance.set(emails[i], status[i]);
  }
}

  newAttendance.save();
  }



  User.find({},function(err,users){
    users.forEach(function(user){
      let dt1=user.createdAt;

      let dt2=new Date();
      
       let diff=Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        diff=diff-user.count;
       if(diff==30)
       {
         sendingMail(user.fathersemail);
         User.updateOne(
           { email: user.email },
           { $set: { count: user.count + 30 } },
           function (err, res) {
             if (!err) {
               console.log("");
             } else console.log(err);
           }
         );
       }

    })
  })




  res.redirect("/attendance");
};

module.exports = {attendance,postattendance};
