
const express = require("express");
const {addstudent, postaddstudent} = require("../controllers/admin/addstudent");
const {analysis, postanalysis} = require("../controllers/admin/analysis");
const {attendance, postattendance} = require("../controllers/admin/attendance");
const {payment,postpayment}=require("../controllers/admin/payment")
const {register, postregister} = require("../controllers/register");
const {login, postlogin} = require("../controllers/login");
const home = require("../controllers/home");
const viewattendance = require("../controllers/students/viewattendance");
const admin = require("../middleware/auth");
const dashboard = require("../controllers/dashboard");



//set up express router
const router=express.Router();


//Common Pages
router.route("/register").get(register).post(postregister);
router.route("/").get(home);
router.route("/login").get(login).post(postlogin);
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});
router.route("/dashboard").get(dashboard)


//Admin Pages
router.route("/analysis").get(admin, analysis).post(admin,postanalysis);
router.route("/addstudent").get(admin, addstudent).post(admin,postaddstudent);
router.route("/attendance").get(admin, attendance).post(admin,postattendance);
router.route("/payment").get(admin, payment).post(admin,postpayment);


//Students Pages
router.route("/viewattendance").get(viewattendance);





module.exports = router;