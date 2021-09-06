const User = require("../../models/addstudentModels");
const PaymentDetail = require("../../models/paymentdetail");



const verify = async function (req, res) {

console.log(req.body);


  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let crypto = require("crypto");
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  // Compare the signatures
  if (expectedSignature === req.body.razorpay_signature) {
    // if same, then find the previosuly stored record using orderId,
    // and update paymentId and signature, and set status to paid.
    await PaymentDetail.findOneAndUpdate(
      { orderId: req.body.razorpay_order_id },
      {
        paymentId: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        status: "paid",
      },
      { new: true },
      function (err, doc) {
        // Throw er if failed to save
        if (err) {
          throw err;
        }
        // Render payment success page, if saved succeffully

        // yha success message throw krna hai
        res.render("students/success", {
          title: "Payment verification successful",
          paymentDetail: doc,
          Admin: req.user.isAdmin,
          displayusername: req.user.username,
        });
         
        var myquery = { email:doc.email };
         var newvalues = {
          $inc: { amountpaid:(doc.amount)/100},
         };
       User.updateOne(myquery, newvalues, function (err, res) {
        if (!err) {
      console.log("Documents updated successfully");
       }
       });
        
      }
    );
  } else {




    //yha error message
    res.render("students/fail", {
      title: "Payment verification failed",
      Admin: req.user.isAdmin,
      displayusername: req.user.username,
    });


        await PaymentDetail.deleteOne({ orderId: req.body.razorpay_order_id });

  }

    if(req.body.btn)
    {
       await PaymentDetail.deleteOne({ orderId: req.body.btn });
    }



};

module.exports = verify;
