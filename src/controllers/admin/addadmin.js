const User = require("../../models/addstudentModels");
const Profile = require("../../models/users")

const addadmin = function (req, res) {

 if (!req.isAuthenticated()) {
   res.redirect("/login");
   return;
 }

   Profile.find({},function(err,profiles){
         if(err) console.log(err);
          if(profiles){

                 Profile.findOne({ _id: req.user._id }, function (err, data) {
                    if(data)
                    {
                       res.render("admin/addadmin", {
                         profiles: profiles,
                         Admin: "true",
                         displayusername: data.username,
                       });
                    }
                    else{
                       res.render("admin/addadmin", {
                         profiles: profiles,
                         Admin: "true",
                         displayusername: "Unauthorized",
                       });
            
                    }
                  })
          }
         else{
            res.render("admin/addadmin", {
              profiles: "NULL",
              Admin: "true",
              displayusername:"No data available",
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




  res.redirect("/addadmin");
}




module.exports={addadmin,postaddadmin};