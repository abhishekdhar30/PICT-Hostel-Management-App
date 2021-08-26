
const express = require("express");
const {addstudent, postaddstudent} = require("../controllers/addstudent");
const {analysis, postanalysis} = require("../controllers/analysis");
const {attendance, postattendance} = require("../controllers/attendance");
const register = require("../controllers/register");
const login = require("../controllers/login");
const home = require("../controllers/home");


//set up express router
const router=express.Router();


router.route("/attendance").get(attendance).post(postattendance);

router.route("/").get(home);
router.route("/login").get(login);

router.route("/analysis").get(analysis).post(postanalysis);

router.route("/addstudent").get(addstudent).post(postaddstudent);
router.route("/register").get(register);


module.exports = router;