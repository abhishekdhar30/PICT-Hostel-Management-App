const User = require("../models/addstudentModels");
const Attendance = require("../models/attendance");

const addstudent = function (req, res) {
  res.render("addstudent");
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
