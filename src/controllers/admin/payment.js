const payment = function (req, res) {


  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  }

   res.render("admin/payment", {
     userisloggedin: true,
     Admin: true,
   });


}


const postpayment = function (req, res) {
console.log(req.body);
  res.redirect("/payment");
}


module.exports={payment,postpayment}