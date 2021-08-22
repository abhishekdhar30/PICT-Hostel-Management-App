
const express = require("express");
const addstudent = require("../controllers/addstudent");
const analysis = require("../controllers/analysis");
const attendance = require("../controllers/attendance");
const register = require("../controllers/register");
const login = require("../controllers/login");
const home = require("../controllers/home");


//set up express router
const router=express.Router();


router.route("/attendance").get(attendance);

router.route("/").get(home);
router.route("/login").get(login);

router.route("/analysis").get(analysis);

router.route("/addstudent").get(addstudent);
router.route("/register").get(register);


module.exports = router;