async function userMessage(email,token) {
  
    let mailMessage = {
      from: "picthostel.com",
      to: `${email}`,
      subject:"Login Credentials !",
      html: `
        
        Your credentials for PICT Hostel App...<br><br>

                Email: 
                ${email}

                 <br><br>
                Password: 
                ${token}


                  <br><br><br><br>
       
        Thanks<br>
        Regards: Pune Institute of Computer Technology
                  
                 `,
    };
 
  return mailMessage;
}

module.exports = userMessage;
