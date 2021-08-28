
const express = require("express");
const {addstudent, postaddstudent} = require("../controllers/admin/addstudent");
const {analysis, postanalysis} = require("../controllers/admin/analysis");
const {attendance, postattendance} = require("../controllers/admin/attendance");
const {register, postregister} = require("../controllers/register");
const {login, postlogin} = require("../controllers/login");
const home = require("../controllers/home");


//set up express router
const router=express.Router();


router.route("/attendance").get(attendance).post(postattendance);

router.route("/").get(home);
router.route("/login").get(login).post(postlogin);

router.route("/analysis").get(analysis).post(postanalysis);

router.route("/addstudent").get(addstudent).post(postaddstudent);
router.route("/register").get(register).post(postregister);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});


module.exports = router;