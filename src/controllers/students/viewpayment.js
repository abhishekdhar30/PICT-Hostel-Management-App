const Razorpay = require("razorpay");
const PaymentDetail = require("../../models/paymentdetail");
const { nanoid } = require("nanoid");

 


const paymentgateway = function (req, res) {
  res.render("students/viewpayment", {
    Admin: req.user.isAdmin,
    displayusername:req.user.username
  });
};



const postpaymentgateway = async function (req, res) {

 
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
      email:req.body.email
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
};

module.exports = { paymentgateway, postpaymentgateway };
