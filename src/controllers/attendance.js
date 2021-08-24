const User = require("../models/addstudentModels");
const Attendance = require("../models/attendance");


const attendance = function (req, res) {

  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("attendance", { users: user });
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
               count+=1;
              
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
        for (const [key, value] of allAttendance) {
          for (let i = 0; i < emails.length; i++) {
              if (emails[i] === key) {
              allAttendance.set(key, status[i]);
              f+=1;
                
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

  res.redirect("/attendance");
};

module.exports = {attendance,postattendance};
