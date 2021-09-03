const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const Profile = require("../../models/users");

const addstudent = function (req, res,err) {

   if (!req.isAuthenticated()) {
     res.redirect("/login");
     return;
   }


  Profile.find({ isAdmin: "true" }, function (err, users) {
    if (err) console.log(err);
    else {
      if (users) {
        res.render("admin/addstudent", { Admin: "true" });
      }
    }
  });

  
};

const postaddstudent = async function (req, res) {
  // console.log(req.body);
  const {
    name,
    email,
    room,
    status,
    address,
    city,
    contact,
    fcontact,
    femail,
  } = req.body;

  const user = new User({
    name: name,
    email: email,
    room: room,
    address: address,
    city: city,
    contact: contact,
    fatherscontact: fcontact,
    fathersemail: femail,
    address:address
  });

  user.save();

  const date = Date().toString().substring(0, 15);

  const attendance = await Attendance.findOne({
    date: date,
  });

  const currentaddeduser=await User.findOne({
    email:email
  })



  //Agr student add krne se pehle he attendance hoo gyi h
  if (attendance&&currentaddeduser) {
    const allAttendance = attendance.attendance;
    const id=currentaddeduser._id;
    allAttendance.set(id, status);

    attendance.attendance = allAttendance;
    await attendance.save();
  } else {
    const id = currentaddeduser._id;
    const newAttendance = new Attendance({
      date: date,
      attendance: {},
    });
    newAttendance.attendance.set(id, status);
    newAttendance.save();
  }

  res.redirect("/addstudent");
};

module.exports = { addstudent, postaddstudent };
