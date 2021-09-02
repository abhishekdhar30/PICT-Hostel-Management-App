
const viewattendance=function(req,res){

   if (!req.isAuthenticated()) {
     res.redirect("/login");
     return;
   }
 
    
   res.render("students/viewattendance", {
     userisloggedin: true,
     Admin: false,
   });

  
}


module.exports=viewattendance