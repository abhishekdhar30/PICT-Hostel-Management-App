const User = require("../../models/addstudentModels");
const Profile=require("../../models/addstudentModels")
const sendingMail = require("../../nodemailer/mail");
const paymentmessage = require("../../nodemailer/messages/paymentmail");

const payment = function (req, res) {



  Profile.find({}, function (err, profiles) {

     if(err) console.log(err);

     if(profiles){

    res.render("admin/payment", {
      Admin: "true",
      displayusername: req.user.username,
      profiles: profiles,
      success: req.flash("success"),
      danger: req.flash("error"),
    });

  }else{

    res.render("admin/payment", {
      Admin: "true",
      displayusername: req.user.username,
      profiles: 0,
      success: req.flash("success"),
      danger: req.flash("error"),
    });


  }

  });


}


const postpayment = async function (req, res) {
//console.log(req.body);

const {_id,newamount,newfee,mail,paymentbtn,email,fathersemail,balance}=req.body;


if(typeof(_id)=="string")
{
    if(paymentbtn){
      var myquery = { _id: _id };
      var newvalues = {
        $inc: { amountpaid:newamount,fee:newfee },
      };
      User.updateMany(myquery, newvalues, function (err, res) {
        if (!err) {
          console.log("Documents updated successfully");
        }
      });
       req.flash(
         "success",
         `You have successfully updated the Payment section of ${email} !`
       );
         res.redirect("/payment");
    }
    else if(mail)
    {
        const message=await paymentmessage(email,fathersemail,balance);
        sendingMail(message);

         req.flash(
           "success",
           `You have successfully sended the mail to ${email} and ${fathersemail} !`
         );
           res.redirect("/payment");
    } 
}

else{
      if(paymentbtn){
      for(let i=0;i<_id.length;i++)
      {
                var myquery = { _id: _id[i] };
                var newvalues = {
                  $inc: { amountpaid:newamount[i],fee:newfee[i] },
                };
                User.updateMany(myquery, newvalues, function (err, res) {
                  if (!err) {
                    console.log("Documents updated successfully");
                  }
                });

      }

       req.flash(
         "success",
         `You have successfully updated the Payment section !`
       );
       res.redirect("/payment");
    }
    else if(mail)
    {
      //console.log(req.body);
         const message = await paymentmessage(email[mail], fathersemail[mail], balance[mail]);
         sendingMail(message);

           req.flash(
             "success",
             `You have successfully sended the mail to ${email[mail]} and ${fathersemail[mail]} !`
           );
           res.redirect("/payment");
    }
}


}


module.exports={payment,postpayment}