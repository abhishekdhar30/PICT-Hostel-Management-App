async function attendancemessage(name,fathersemail) {

  let mailMessage = {
    from: "picthostel.com",
    to: fathersemail,
    subject: "Hostel Fee",
    // html: `Your balance of <strong>Rs${balance}<strong> is due..Please pay as soon as possible.

    //         `,

    html: `
        Your ward ${name} is absent today !

         <br><br><br><br>
       
        Thanks<br>
        Regards: Pune Institute of Computer Technology
 `,
  };

  return mailMessage;
}

module.exports = attendancemessage;
