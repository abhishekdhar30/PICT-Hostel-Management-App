
const viewattendance=function(req,res){

    if (!req.isAuthenticated()) {
      res.render("students/viewattendance", {
        userisloggedin: false,
        Admin: false,
      });
      return;
    }
 
    
   res.render("students/viewattendance", {
     userisloggedin: true,
     Admin: false,
   });

  
}


module.exports=viewattendance