const Attendance =require("../../models/attendance") 
const Profile = require("../../models/users"); 
const User = require("../../models/addstudentModels"); 
const viewattendance=function(req,res){

   if (!req.isAuthenticated()) {
     res.redirect("/login");
     return;
   }
 
   Profile.findOne({_id:req.user.id},function(err,user){

    if(user){
        User.findOne({email:user.username},function(err,addstudent){

        if(addstudent){

          Attendance.find({},function(err,allattendance){
             if(err) console.log(err);

             if(allattendance)
             {
               let date=[];
               let status=[];
                for(let i=allattendance.length-1;i>=0;i--)
                {
                for (const [key, value] of allattendance[i].attendance) {
                   if(key==addstudent._id)
                   {
                     date.push(allattendance[i].date);
                     status.push(value);
                    //  res.render("students/viewattendance",{date:allattendance[i].date,status:value,Admin:"false"});
                   }
                }
                }

                 res.render("students/viewattendance", {
                   date: date,
                   status: status,
                   Admin: "false",
                 });
             }
             else
             {
               res.render("students/viewattendance", {
                 date: 0,
                 status: 0,
                 Admin:"false"
                });
             }
          })

        }else{
              res.render("students/viewattendance", {
                date: 0,
                status: 0,
                Admin: "false",
              });
          }


        })  
  }
 else{
res.render("students/viewattendance", {
  date: 0,
  status: 0,
  Admin: "false",
});
 }


    
  })

  
}


module.exports=viewattendance