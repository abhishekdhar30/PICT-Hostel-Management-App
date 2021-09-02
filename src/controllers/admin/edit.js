const User = require("../../models/addstudentModels");


const edit = function (req, res) {
  if (!req.isAuthenticated()) {
    res.render("admin/edit", {
      userisloggedin: false,
      Admin: false,
      // success: req.flash("success"),
      // danger: "Sorry! You are not Authenticated ! Please Login first",
    });
    return;
  }

  User.find({}, function (err, users) {
    if (err) console.log(err);
    if (users) {
      res.render("admin/edit", { users: users });
    } else res.render("admin/edit", { users: "NULL" });
  });
};

const postedit = function (req, res) {
  console.log(req.body);

//   const { _id, role } = req.body;

//   if (typeof role == "string") {
//     if (role != "select") {
//       var myquery = { _id: _id };
//       var newvalues = {
//         $set: { isAdmin: role },
//       };
//       Profile.updateOne(myquery, newvalues, function (err, res) {
//         if (!err) {
//           console.log("Documents updated successfully");
//         }
//       });
//     }
//   } else {
//     for (let i = 0; i < role.length; i++) {
//       if (role[i] != "select") {
//         var myquery = { _id: _id[i] };
//         var newvalues = {
//           $set: { isAdmin: role[i] },
//         };
//         Profile.updateOne(myquery, newvalues, function (err, res) {
//           if (!err) {
//             console.log("Documents updated successfully");
//           }
//         });
//       }
//     }
//   }

  res.redirect("/edit");
};

module.exports = { edit, postedit };
