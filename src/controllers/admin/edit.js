const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");


const edit = function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  }

  User.find({}, function (err, users) {
    if (err) console.log(err);
    if (users) {
      res.render("admin/edit", { users: users, Admin: "true" });
    } else res.render("admin/edit", { users: "NULL", Admin: "true" });
  });
};

const postedit = async function (req, res) {
   console.log(req.body);
 const {_id,name,city,contact,fcontact,email,femail,room,address}=req.body;
   console.log(typeof(_id));
   if(req.body.delete&&typeof(_id)=="string")
   {
      await User.deleteOne({ _id: _id});
      
   } 
   else if(req.body.delete)
   {
      await User.deleteOne({_id:_id[req.body.delete]});
   }


  if (req.body.edit&&typeof(_id)=="string") {
    var myquery = { _id: _id};
    var newvalues = {
      $set: {
        name: name,
        city: city,
        contact: contact,
        fatherscontact: fcontact,
        email: email,
        fathersemail: femail,
        room: room,
        address: address,
      },
    };
    User.updateMany(myquery, newvalues, function (err, res) {
      if (!err) {
        console.log("Documents updated successfully");
      }
    });
  } else if (req.body.edit) {
    var myquery = { _id: _id[req.body.edit] };
    var newvalues = {
      $set: {
        name: name[req.body.edit],
        city: city[req.body.edit],
        contact: contact[req.body.edit],
        fatherscontact: fcontact[req.body.edit],
        email: email[req.body.edit],
        fathersemail: femail[req.body.edit],
        room: room[req.body.edit],
        address: address[req.body.edit],
      },
    };
    User.updateMany(myquery, newvalues, function (err, res) {
      if (!err) {
        console.log("Documents updated successfully");
      }
    });
  }
  
  

  res.redirect("/edit");
};

module.exports = { edit, postedit };
