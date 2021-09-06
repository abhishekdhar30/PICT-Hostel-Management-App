const Razorpay = require("razorpay");
const PaymentDetail = require("../../models/paymentdetail");
const { nanoid } = require("nanoid");
const { ValidatePhone, ValidateEmail, ValidateName } = require("../../validations/validation");

 


const paymentgateway = function (req, res) {
  res.render("students/viewpayment", {
    Admin: req.user.isAdmin,
    displayusername: req.user.username,
    success: req.flash("success"),
    danger: req.flash("error"),
  });
};



const postpaymentgateway = async function (req, res) {

  const {name,email,contact,amount}=req.body;

  if (
    name.length == 0 ||
    email.length == 0 ||
    contact.length == 0 ||
    amount.length == 0
  ) {
    req.flash(
      "error",
      ` Error Form Submission: Input marked as * cannot be empty ! `
    );

    res.redirect("/paymentgateway");
  } 
  
  else if (!ValidateName(name)) {
    req.flash(
      "error",
      "Error: Invalid name..It must only contains (a-z, A-Z) !"
    );

    res.redirect("/paymentgateway");
  } 
  
  else if (!ValidateEmail(email)) {
    req.flash("error", "Error: Invalid email..It must contains('@' and '.') !");

    res.redirect("/paymentgateway");
  } 
  
  else if (!ValidatePhone(contact)) {
    req.flash(
      "error",
      "Error: Invalid contact number..It must only contains digits !"
    );

    res.redirect("/paymentgateway");
  }
  
  
  
  else {
    const razorPayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    params = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: nanoid(),
      payment_capture: "1",
    };
    razorPayInstance.orders
      .create(params)
      .then(async (response) => {
        // Save orderId and other payment details
        const paymentdetail = new PaymentDetail({
          orderId: response.id,
          receiptId: response.receipt,
          amount: response.amount,
          currency: response.currency,
          createdAt: response.created_at,
          status: response.status,
          email: req.body.email,
        });
        try {
          // Render Order Confirmation page if saved succesfully
          await paymentdetail.save();
          res.render("students/checkout", {
            title: "Confirm Payment",
            paymentDetail: paymentdetail,
            payment: req.body,
            Admin: req.user.isAdmin,
            displayusername: req.user.username,
            razorpayid: process.env.RAZORPAY_KEY_ID,
          });
        } catch (err) {
          // Throw err if failed to save
          if (err) throw err;
        }
      })
      .catch((err) => {
        // Throw err if failed to create order
        if (err) throw err;
      });
  }

};

module.exports = { paymentgateway, postpaymentgateway };
