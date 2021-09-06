async function attendancemessage(name,fathersemail) {

  let mailMessage = {
    from: "picthostel.com",
    to: fathersemail,
    subject: "Hostel Fee",
    // html: `Your balance of <strong>Rs${balance}<strong> is due..Please pay as soon as possible.

    //         `,

    html: `
        Your ward ${name} is absent today !
 `,
  };

  return mailMessage;
}

module.exports = attendancemessage;
