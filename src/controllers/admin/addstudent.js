const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const Profile = require("../../models/users");

const addstudent = function (req, res) {


  if (!req.isAuthenticated()) {
    res.render("admin/addstudent", {
      userisloggedin: false,
      Admin:false
    });
    return;
  } 

  



  
  Profile.find({isAdmin:true},function(err,users){
       if(err) console.log(err);
       else
       {
         if(users)
         {
               res.render("admin/addstudent", { userisloggedin: true,Admin:true });
         }
         else
         {
                res.render("admin/addstudent", {
                  userisloggedin: true,
                  Admin: false,
                });
         }
       }

  })

  //  if (req.isAuthenticated()) {
  //    res.render("admin/addstudent", { userisloggedin: true });
  //  } else res.render("admin/addstudent", { userisloggedin: false });
};


const postaddstudent =async function (req, res) {
  console.log(req.body);
const { name, email, room, status, address, city, contact, fcontact, femail } =
  req.body;

const user = new User({
  name: name,
  email: email,
  room: room,
  address:address,
  city:city,
  contact:contact,
  fatherscontact:fcontact,
  fathersemail:femail,

});

user.save();

const date = Date().toString().substring(0, 15);

 const attendance = await Attendance.findOne({
   date: date,
 });



//Agr student add krne se pehle he attendance hoo gyi h
  if (attendance) {
    const allAttendance = attendance.attendance;

     allAttendance.set(email, status);
    

    attendance.attendance = allAttendance;
    await attendance.save();

  }

  else
  {
     const newAttendance = new Attendance({
       date: date,
       attendance: {},
     });
      newAttendance.attendance.set(email, status);
      newAttendance.save();
  }




  res.redirect("/addstudent")
};


module.exports = {addstudent,postaddstudent};
