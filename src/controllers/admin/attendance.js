const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const moment = require("moment");
const sendingMail = require("../../nodemailer/mail");

const attendance = function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  }

  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      const date = Date().toString().substring(0, 15);
      Attendance.findOne({ date: date }, function (err, person) {
        if (err) {
          console.log(err);
        } else {
          if (person && user) {
            res.render("admin/attendance", {
              dailyattendance: person.attendance,
              users: user,
              Admin: "true",
            });
          } else if (person) {
            res.render("admin/attendance", {
              dailyattendance: person.attendance,
              users: "NULL",
              Admin: "true",
            });
          } else if (user) {
            res.render("admin/attendance", {
              users: user,
              dailyattendance: "NULL",
              Admin: "true",
            });
          } else {
            res.render("admin/attendance", {
              users: "NULL",
              dailyattendance: "NULL",
              Admin: "true",
            });
          }
        }
      });

      // res.render("admin/attendance", { users: user });
    }
  });
};

const postattendance = async function (req, res) {
  const date = Date().toString().substring(0, 15);
   console.log(req.body);

 const { roomno, name, contact } = req.body;

 let emails = req.body.email;
 let status = req.body.status;
 let id = req.body._id;

  const attendance = await Attendance.findOne({
    date: date,
  });

  if (attendance) {
    const allAttendance = attendance.attendance;

    if (typeof(id) == "string") {
      let count = 0;
      for (const [key, value] of allAttendance) {
        if (id === key) {
          allAttendance.set(key, status);
          count = 1;
        }
      }

      if (count === 1) {
        allAttendance.set(id, status);
      }
    } else {
      let f = 0;
      for (const [key, value] of allAttendance) {
        for (let i = 0; i < id.length; i++) {
          if (id[i] === key) {
            allAttendance.set(key, status[i]);
            f = 1;
          }
        }
      }
      if (f === 1) {
        for (let i = 0; i < id.length; i++) {
          allAttendance.set(id[i], status[i]);
        }
      }
    }

    attendance.attendance = allAttendance;
    await attendance.save();
  } else {
    const newAttendance = new Attendance({
      date: date,
      attendance: {},
      details:[]
    });

    // console.log(typeof(emails));

    if (typeof(id) == "string") {
      newAttendance.attendance.set(id, status);
      //  newAttendance.details.push({
      //    _id: id,
      //    email: emails,
      //    roomno: roomno,
      //    name: name,
      //    contact: contact,
      //  });

    } else {
      for (let i = 0; i < id.length; i++) {
        newAttendance.attendance.set(id[i], status[i]);
        //  newAttendance.details.push({
        //    _id: id[i],
        //    email: emails[i],
        //    roomno: roomno[i],
        //    name: name[i],
        //    contact: contact[i],
        //  });
      }
    }

    newAttendance.save();
  }

  // User.find({}, function (err, users) {
  //   users.forEach(function (user) {
  //     let dt1 = user.createdAt;

  //     let dt2 = new Date();

  //     let diff = Math.floor(
  //       (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
  //         Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
  //         (1000 * 60 * 60 * 24)
  //     );
  //     diff = diff - user.count;
  //     if (diff == 30) {
  //       sendingMail(user.fathersemail);
  //       User.updateOne(
  //         { email: user.email },
  //         { $set: { count: user.count + 30 } },
  //         function (err, res) {
  //           if (!err) {
  //             console.log("");
  //           } else console.log(err);
  //         }
  //       );
  //     }
  //   });
  // });
  res.redirect("/attendance");
};

module.exports = { attendance, postattendance };
