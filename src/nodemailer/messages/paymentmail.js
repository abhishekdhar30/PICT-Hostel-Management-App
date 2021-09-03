async function paymentmessage(email,fathersemail,balance) {

    var maillist = [
      email,fathersemail
    ];
  let mailMessage = {
    from: "picthostel.com",
    to: maillist,
    html: `Your balance of <strong>Rs${balance}<strong> is due..Please pay as soon as possible.
                  
            `,
  };

  return mailMessage;
}

module.exports = paymentmessage;
