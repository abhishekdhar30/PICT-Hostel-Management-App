const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const Profile = require("../../models/users");
var randtoken = require("rand-token");
const passport = require("passport");

var sendingMail=require("../../nodemailer/mail");
const userMessage = require("../../nodemailer/messages/user");

const addstudent = function (req, res,err) {

   if (!req.isAuthenticated()) {
     res.redirect("/login");
     return;
   }


  Profile.find({ isAdmin: "true" }, function (err, users) {
    if (err) console.log(err);
    else {
      if (users) {
       
          res.render("admin/addstudent", {
            Admin: "true",
            displayusername: req.user.username,
          });
        
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
    hostelfee,
    amountpaid,
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
    address:address,
    fee:hostelfee,
    amountpaid:amountpaid
  });

  user.save();

  var token = randtoken.generate(64);

    Profile.register({ username: email }, token, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("Successfully created user");
        });
      }
    });


var myquery = { username: email };
var newvalues = {
  $set: {
     name:name,
     contact:contact,
     city:city,
  },
};
Profile.updateOne(myquery, newvalues, function (err, res) {
  if (!err) {
    console.log("Documents updated successfully");
  }
});






let message= await userMessage(email,token);

sendingMail(message);


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
