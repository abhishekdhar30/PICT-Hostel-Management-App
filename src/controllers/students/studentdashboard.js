const studentdashboard=function(req,res){

    res.render("students/studentdashboard",{Admin:"false",displayusername:req.user.username});
}


module.exports = studentdashboard;