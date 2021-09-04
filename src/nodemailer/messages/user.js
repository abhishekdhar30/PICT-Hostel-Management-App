async function userMessage(email,token) {
  
    let mailMessage = {
        from: "picthostel.com",
        to: `${email}`,
        html: `<pre>Your credentials for PICT Hostel App...

                Email: 
                ${email}


                Password: 
                ${token}

                  
                  </pre>`,
      };
 
  return mailMessage;
}

module.exports = userMessage;
