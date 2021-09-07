const Profile = require("../../models/users");
// var randtoken = require("rand-token");
const userMessage = require("../../nodemailer/messages/user");
const sendingMail = require("../../nodemailer/mail");
var generator = require("generate-password");

const changepassword = function (req, res) {


    Profile.find({},function(err,profiles){
    
        if(!err){
         
       res.render("admin/changepassword", {
      Admin: "true",
      displayusername: req.user.username,
      profiles: profiles,
      success: req.flash("success"),
      danger: req.flash("error"),
       
    });
}
})

}



const postchangepassword = async function (req, res) {


let buttonvalue=req.body.mail;
//  var token = randtoken.generate(64);

var password = generator.generate({
  length: 20,
  numbers: true,
});

   Profile.findByUsername(buttonvalue).then(
     function (sanitizedUser) {
       if (sanitizedUser) {
         sanitizedUser.setPassword(password, async function () {
           sanitizedUser.save();
    let message = await userMessage(buttonvalue, password);

    sendingMail(message);
           req.flash("success", `Password of ${buttonvalue} is reset successfully !`);
           return res.redirect("/changepassword");
         });
       } else {
         // console.log('This user does not exist');
         req.flash("error", "User does not exist!");
         return res.redirect("/changepassword");
         //   return res.redirect("/forget");
       }
     },
     function (err) {
       // console.log(err);
       if (err) console.log(err);
       req.flash("error", "Error occured! Please contact developer");
       return res.redirect("/changepassword");
     }
   );




};


module.exports={changepassword,postchangepassword}