const code=()=>{
    return ` submitHandler: function(form, event) {
                    event.preventDefault(); // Prevent default form submission
                    console.log(form);
                    const data = Object.fromEntries(new FormData(form).entries());
                    // Map data
					var mappedData = {};  
                    mappedData['firstname'] = data["firstname"] || null;  
                    mappedData['lastname'] = data["data[0]"] || null;
                    mappedData['phone'] = data["data[1]"] || null;
                    mappedData['email'] = data["data[2]"] || null;
                    mappedData['job_title'] = data["data[3]"] || null;
					mappedData['company'] = data["data[4]"] || null;
                    mappedData['number_of_employee'] = data["data[5]"] || null;
                    mappedData['cq1']  = new FormData(form).getAll("data[8][]") || null;
                    ##EU_MAPPED_DATA##

					  
                      var camp_id = "##LINK_NAME##"; // CAMPID
                      var endUrl = "##BASE_URL####LINK_NAME##-thankyou.html"; // END URL
						/*var endUrl= {
						   "URL" : window.location.href, 
						   "END_URL" : "##BASE_URL####LINK_NAME##-thankyou.html",
						   "EDM_DETAILS":{  
								"EDM_URL":"##BASE_URL####LINK_NAME##-edm.html",
								"ASSET_TITLE": "ASSET TITLE HERE"
								}
					   }*/
                       

						const firstname=mappedData['firstname']
						const email_address=mappedData['email']
						const subject="##SENDMAIL_SUBJECT##";
						let body=\`
							<table>
                            <tr><td>Dear&nbsp;<b>${firstname},<b></td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>Thank you for registering for content provided by Trustpilot. Please share it with your colleagues (no registration required).</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td><a href='##BASE_URL####LINK_NAME##.pdf'><img src='##BASE_URL####LINK_NAME##.png' width='40%' /></td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>You can learn more by visiting <a href ='https://www.trustpilot.com/'>https://www.trustpilot.com/</a></td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td><a href='https://www.trustpilot.com/'><img  src='##BASE_URL####LOGO_NAME##' width='25%'/></a></td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>Sincerely,</td></tr>
                            <tr><td>The IT Business Plus Fulfillment Team </td></tr>
				            </table>
						\`;
						body = body.replace(/(\r\n|\n|\r|\t)/gm, "");
						
						post_form_data(camp_id, mappedData, endUrl,function onComplete(res,error){
							console.log("DATA",mappedData)
							console.log("Data Uploaded",res)
							sendmail(email_address,subject,body,function onMailComplete(mailRes,mailError){
                                console.log("Mail Sent",mailRes)
                                // Proceed with the form submission
                                //Redirect
                                window.location.href =	"##BASE_URL####LINK_NAME##-thankyou.html"	
						    })//Send mail
							
			            }); // Call API     
        },
    `
}