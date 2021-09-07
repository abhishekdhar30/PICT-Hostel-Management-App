const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const Profile = require("../../models/users");
// var randtoken = require("rand-token");
const passport = require("passport");
var generator = require("generate-password");

var sendingMail = require("../../nodemailer/mail");
const userMessage = require("../../nodemailer/messages/user");
const { ValidateName, ValidatePhone, ValidateEmail } = require("../../validations/validation");

const addstudent = function (req, res, err) {
  Profile.find({ isAdmin: "true" }, function (err, users) {
    if (err) console.log(err);
    else {
      if (users) {
        res.render("admin/addstudent", {
          Admin: "true",
          displayusername: req.user.username,
          success: req.flash("success"),
          danger: req.flash("error"),
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



  if(email.length==0||name.length==0||room.length==0||status.length==0||address.length==0||city.length==0||contact.length==0
    ||fcontact.length==0||femail.length==0||hostelfee.length==0||amountpaid.length==0)
  {
     req.flash(
       "error",
       ` Error Form Submission: Input marked as * cannot be empty ! `
     );

     res.redirect("/addstudent");
  }

  else if(!ValidateName(name))
  {
    req.flash(
      "error",
      "Error: Invalid name..It must only contains (a-z, A-Z) !"
    );

     res.redirect("/addstudent");
  }

  else if(!ValidateName(city))
  {
     req.flash(
       "error",
       "Error: Invalid city..It must only contains (a-z, A-Z) !"
     );

     res.redirect("/addstudent");
  }

  else if (!ValidatePhone(contact)) {
        req.flash(
          "error",
          "Error: Invalid contact number..It must only contains digits !"
        );

        res.redirect("/addstudent");
  } 
  
  else if (!ValidatePhone(fcontact)) {
       req.flash(
         "error",
         "Error: Invalid father's contact number..It must only contains digits !"
       );

       res.redirect("/addstudent");
  } 
  
  else if (!ValidateEmail(email)) {
        req.flash(
          "error",
          "Error: Invalid email..It must contains('@' and '.') !"
        );

           res.redirect("/addstudent");
  } 
  else if (!ValidateEmail(femail)) {
    req.flash("error", "Error: Invalid Father's email..It must contains('@' and '.') !");

    res.redirect("/addstudent");
  } 

  
  else if (!ValidatePhone(room)) {
    req.flash("error", "Error: Invalid Room No..It must only contains digits !");

    res.redirect("/addstudent");
  } 
  
  else if (!ValidatePhone(hostelfee)) {
    req.flash("error", "Error: Invalid Fee field..It must only contains digits !");

    res.redirect("/addstudent");
  } 
  
  else if (!ValidatePhone(amountpaid)) {
    req.flash("error", "Error: Invalid amountpaid field..It must only contains digits !");

    res.redirect("/addstudent");
  } 
  
  
  else {
    Profile.findOne({ username: email }, async function (err, user) {
      

      if (user) {
        req.flash("error", `User already exists !`);
        console.log(user);
        res.redirect("/addstudent");
      } else {
        console.log("yes");
        const user = new User({
          name: name,
          email: email,
          room: room,
          address: address,
          city: city,
          contact: contact,
          fatherscontact: fcontact,
          fathersemail: femail,
          address: address,
          fee: hostelfee,
          amountpaid: amountpaid,
        });

        user.save();

        // var token = randtoken.generate(64);

        var password = generator.generate({
          length: 20,
          numbers: true,
        });

        Profile.register({ username: email }, password, function (err, user) {
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
            name: name,
            contact: contact,
            city: city,
          },
        };
        Profile.updateOne(myquery, newvalues, function (err, res) {
          if (!err) {
            console.log("Documents updated successfully");
          }
        });

        let message = await userMessage(email, password);

        sendingMail(message);

        const date = Date().toString().substring(0, 15);

        const attendance = await Attendance.findOne({
          date: date,
        });

        const currentaddeduser = await User.findOne({
          email: email,
        });

        //Agr student add krne se pehle he attendance hoo gyi h
        if (attendance && currentaddeduser) {
          const allAttendance = attendance.attendance;
          const id = currentaddeduser._id;
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

        req.flash(
          "success",
          `Student is successfully added and Registered..Login credentials are send to ${email} !`
        );

        res.redirect("/addstudent");
      }
    });
  }

};

module.exports = { addstudent, postaddstudent };
