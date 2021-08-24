const User = require("../models/addstudentModels");

const addstudent = function (req, res) {
  res.render("addstudent");
};


const postaddstudent = function (req, res) {
  console.log(req.body);
const { name, email, room, status, address, city, contact, fcontact, femail } =
  req.body;

const user = new User({
  name: name,
  email: email,
  room: room,
  status:status,
  address:address,
  city:city,
  contact:contact,
  fatherscontact:fcontact,
  fathersemail:femail,

});

user.save();


  res.redirect("/addstudent")
};


module.exports = {addstudent,postaddstudent};
