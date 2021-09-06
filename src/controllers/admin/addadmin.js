const User = require("../../models/addstudentModels");
const Profile = require("../../models/users")

const addadmin = function (req, res) {


   Profile.find({},function(err,profiles){
         if(err) console.log(err);
          if(profiles){

               
                       res.render("admin/addadmin", {
                         profiles: profiles,
                         currentuser:req.user._id,
                         Admin: "true",
                         displayusername: req.user.username,
                         success: req.flash("success"),
                         danger: req.flash("error"),
                       });
                  
                    
            
          }
         else{
            res.render("admin/addadmin", {
              profiles: "NULL",
              Admin: "true",
              displayusername: req.user.username,
              success: req.flash("success"),
              danger: req.flash("error"),
            });
         }  
   })

}


const postaddadmin = function (req, res) {
    // console.log(req.body);

    const {_id,role}=req.body;

    if(typeof(role)=="string")
    {
        if(role!="select")
        {
         var myquery = { _id:_id };
          var newvalues = {
             $set: { isAdmin:role},
         };
          Profile.updateOne(myquery, newvalues, function (err, res) {
          if (!err) 
           {console.log("Documents updated successfully");}
         });
            
       }
    }




    else
    {
           for(let i=0;i<(role.length);i++)
           {
             if (role[i] != "select") {
               var myquery = { _id:_id[i] };
               var newvalues = {
                 $set: { isAdmin: role[i] },
               };
               Profile.updateOne(myquery, newvalues, function (err, res) {
                 if (!err) {
                   console.log("Documents updated successfully");
                 }
               });
             }
           }
    }

 req.flash("success", `You have successfully updated the Admin section !`);


  res.redirect("/addadmin");
}




module.exports={addadmin,postaddadmin};