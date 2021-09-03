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
      res.render("admin/edit", {
        users: users,
        Admin: "true",
        displayusername: req.user.username,
      });
    } else res.render("admin/edit", {
      users: "NULL",
      Admin: "true",
      displayusername: req.user.username,
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
         console.log(data);
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
