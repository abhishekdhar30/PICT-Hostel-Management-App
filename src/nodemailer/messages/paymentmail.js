async function paymentmessage(email,fathersemail,balance) {

    var maillist = [
      email,fathersemail
    ];
  let mailMessage = {
    from: "picthostel.com",
    to: maillist,
    subject:"Hostel Fee",
    // html: `Your balance of <strong>Rs${balance}<strong> is due..Please pay as soon as possible.

    //         `,

    html: `
        Hello <strong>${email}</strong>,<br><br>
        Your Balance of Rs <strong>${balance}</strong> is Due..Please pay it as soon as possible!
        <br><br><br><br>
       
        Thanks<br>
        Regards: Pune Institute of Computer Technology
 `,
  };

  return mailMessage;
}






module.exports = paymentmessage;
