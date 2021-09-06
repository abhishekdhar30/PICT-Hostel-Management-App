
const express = require("express");
const {addstudent, postaddstudent} = require("../controllers/admin/addstudent");
const {analysis, postanalysis} = require("../controllers/admin/analysis");
const {attendance, postattendance} = require("../controllers/admin/attendance");
const {payment,postpayment}=require("../controllers/admin/payment")

const {login, postlogin} = require("../controllers/login");
const home = require("../controllers/home");
const viewattendance = require("../controllers/students/viewattendance");
const {admin, isauthenticated} = require("../middleware/auth");
const dashboard = require("../controllers/admin/dashboard");
const {addadmin, postaddadmin} = require("../controllers/admin/addadmin");
const { edit, postedit } = require("../controllers/admin/edit");
const { changeprofile, postchangeprofile } = require("../controllers/changeprofile");

const studentdashboard=require("../controllers/students/studentdashboard");
const { paymentgateway, postpaymentgateway } = require("../controllers/students/viewpayment");
const verify = require("../controllers/students/verify");


//set up express router
const router=express.Router();


//Common Pages

router.route("/").get(home);
router.route("/login").get(login).post(postlogin);
router.route("/changeprofile").get(isauthenticated,changeprofile).post(isauthenticated,postchangeprofile);
router.get("/logout", function (req, res) {

   req.flash("success", "You have successfully Logged Out !");
  req.logout();
  res.redirect("/login");
});





//Admin Pages
router.route("/analysis").get(isauthenticated, admin, analysis).post(isauthenticated, admin, postanalysis);
router.route("/addstudent").get(isauthenticated,admin, addstudent).post(isauthenticated,admin,postaddstudent);
router.route("/attendance").get(isauthenticated,admin, attendance).post(isauthenticated,admin,postattendance);
router.route("/payment").get(isauthenticated,admin, payment).post(isauthenticated,admin,postpayment);
router.route("/addadmin").get(isauthenticated,admin, addadmin).post(isauthenticated,admin,postaddadmin);
 router.route("/edit").get(isauthenticated,admin, edit).post(isauthenticated,admin,postedit);
 router.route("/dashboard").get(isauthenticated, admin, dashboard);


//Students Pages
router.route("/viewattendance").get(isauthenticated,viewattendance);
router.route("/studentdashboard").get(isauthenticated,studentdashboard);

router.route("/paymentgateway").get(isauthenticated,paymentgateway).post(isauthenticated,postpaymentgateway);

router.route("/verify").post(isauthenticated,verify);


module.exports = router;