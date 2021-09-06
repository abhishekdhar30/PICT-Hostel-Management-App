const User = require("../../models/addstudentModels");
const Attendance = require("../../models/attendance");
const { ValidateName, ValidatePhone, ValidateEmail } = require("../../validations/validation");


const edit = function (req, res) {
 

  User.find({}, function (err, users) {
    if (err) console.log(err);
    if (users) {
      res.render("admin/edit", {
        users: users,
        Admin: "true",
        displayusername: req.user.username,
        success: req.flash("success"),
        danger: req.flash("error"),
      });
    } else res.render("admin/edit", {
      users: "NULL",
      Admin: "true",
      displayusername: req.user.username,
      success: req.flash("success"),
      danger: req.flash("error"),
    });
  });
};

const postedit = async function (req, res) {
  //  console.log(req.body);
 const {_id,name,city,contact,fcontact,email,femail,room,address}=req.body;
  //  console.log(typeof(_id));
   if(req.body.delete&&typeof(_id)=="string")
   {
      await User.deleteOne({ _id: _id});
      Attendance.find({}, function(err,data){
            for (const [key, value] of data.attendance) {
              if (_id == key) {
               
                data.attendance.delete(_id);

                var myquery = { _id: data._id };
                var newvalues = {
                  $set: { attendance: data.attendance },
                  };
                Attendance.updateOne(myquery, newvalues, function (err, res) {
               if (!err) {
                console.log("Documents updated successfully");
               }
                });



              }
            }
             req.flash(
               "success",
               `You have successfully deleted the details of ${email} !`
             );
         console.log(data);
          res.redirect("/edit");
      })
      
   } 
   else if(req.body.delete)
   {
      await User.deleteOne({_id:_id[req.body.delete]});
      
      Attendance.find({},  async function (err, data) {
        if(data){
          for(let i=0;i<data.length;i++){
           for (const [key, value] of data[i].attendance) {
          if (_id[req.body.delete] == key) {
            //  console.log(data[i].attendance);
              data[i].attendance.delete(_id[req.body.delete]);
              // console.log(data[i].attendance);

              var myquery = { _id:data[i]._id };
              var newvalues = {
                $set: { attendance: data[i].attendance },
              };
              Attendance.updateOne(myquery, newvalues, function (err, res) {
                if (!err) {
                  console.log("Documents updated successfully");
                }
              });
           }
            }
          }

        }
      });
       req.flash(
         "success",
         `You have successfully deleted the details of ${email[req.body.delete]} !`
       );
        res.redirect("/edit");

   }


  if (req.body.edit&&typeof(_id)=="string") {




     if (
       email.length == 0 ||
       name.length == 0 ||
       room.length == 0 ||
       address.length == 0 ||
       city.length == 0 ||
       contact.length == 0 ||
       fcontact.length == 0 ||
       femail.length == 0
     ) {
       req.flash(
         "error",
         ` Error Form Submission: Input marked as * cannot be empty ! `
       );

       res.redirect("/edit");
     } else if (!ValidateName(name)) {
       req.flash(
         "error",
         "Error: Invalid name..It must only contains (a-z, A-Z) !"
       );

       res.redirect("/edit");
     } else if (!ValidateName(city)) {
       req.flash(
         "error",
         "Error: Invalid city..It must only contains (a-z, A-Z) !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(contact)) {
       req.flash(
         "error",
         "Error: Invalid contact number..It must only contains digits !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(fcontact)) {
       req.flash(
         "error",
         "Error: Invalid father's contact number..It must only contains digits !"
       );

       res.redirect("/edit");
     } else if (!ValidateEmail(email)) {
       req.flash(
         "error",
         "Error: Invalid email..It must contains('@' and '.') !"
       );

       res.redirect("/edit");
     } else if (!ValidateEmail(femail)) {
       req.flash(
         "error",
         "Error: Invalid Father's email..It must contains('@' and '.') !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(room)) {
       req.flash(
         "error",
         "Error: Invalid Room No..It must only contains digits !"
       );

       res.redirect("/edit");
     } 
     
     else {
       var myquery = { _id: _id };
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

       req.flash("success", `You have successfully edited the details !`);
       res.redirect("/edit");
     }


  } 
  else if (req.body.edit) {


    

     if (
       email[req.body.edit].length == 0 ||
       name[req.body.edit].length == 0 ||
       room[req.body.edit].length == 0 ||
       address[req.body.edit].length == 0 ||
       city[req.body.edit].length == 0 ||
       contact[req.body.edit].length == 0 ||
       fcontact[req.body.edit].length == 0 ||
       femail[req.body.edit].length == 0
     ) {
       req.flash(
         "error",
         ` Error Form Submission: Input marked as * cannot be empty ! `
       );

       res.redirect("/edit");
     } else if (!ValidateName(name[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid name..It must only contains (a-z, A-Z) !"
       );

       res.redirect("/edit");
     } else if (!ValidateName(city[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid city..It must only contains (a-z, A-Z) !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(contact[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid contact number..It must only contains digits !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(fcontact[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid father's contact number..It must only contains digits !"
       );

       res.redirect("/edit");
     } else if (!ValidateEmail(email[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid email..It must contains('@' and '.') !"
       );

       res.redirect("/edit");
     } else if (!ValidateEmail(femail[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid Father's email..It must contains('@' and '.') !"
       );

       res.redirect("/edit");
     } else if (!ValidatePhone(room[req.body.edit])) {
       req.flash(
         "error",
         "Error: Invalid Room No..It must only contains digits !"
       );

       res.redirect("/edit");
     } else {
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

       req.flash("success", `You have successfully edited the details !`);

       res.redirect("/edit");
     }
  }
  


  // res.redirect("/edit");
};

module.exports = { edit, postedit };
