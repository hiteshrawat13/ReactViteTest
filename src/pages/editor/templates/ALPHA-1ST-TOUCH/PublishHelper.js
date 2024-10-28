 //Dont forget to add extension while importing module
 import {ALPHAFormRenderer} from './FormRenderer.js'
 import edm_html from './pages/edm.html.txt?raw'  //?raw is important to read text files
 import landing_html from './pages/landing.html.txt?raw'  //?raw is important to read text files
 import sendemail_html from './pages/sendemail.php.txt?raw'  //?raw is important to read text files
 import thanks_html from './pages/thanks.html.txt?raw'  //?raw is important to read text files
 import thanks_video_html from './pages/thanks-video.html.txt?raw'  //?raw is important to read text files
 import { getSendmailSubject } from './Base64.js'
class PublishHelper{
    constructor(state){
        this.state=state
    }
 

    getFormHtml(fields,formRenderer){
        let html=""
        fields.forEach((field,index)=> {
            if(formRenderer[field.type]){
                html+=formRenderer[field.type](field)
            }
            
        })
        return html
    }

   getBase64Image(file) {
        return new Promise((resolve,reject)=>{
            //const NO_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQJQTFRF////9vb26urq/f39/v7+6enp9/f34uLi1tbW4ODg7u7ura2tqKioq6ur8vLy2tra9fX1w8PD0dHRqampu7u72dnZ1dXV5OTkrKyswcHB5eXlv7+/0NDQsbGxs7Oz4+Pj4eHh6+vrsLCw3d3dtbW1y8vLwsLCxMTEycnJr6+vsrKy3Nzc7Ozsrq6u/Pz87+/v+fn5uLi45ubm+Pj4urq6xcXFysrK8/Pz9PT0qqqqvr6++/v7zMzMxsbGt7e329vb8PDw2NjYyMjItLS0z8/Pubm5x8fH8fHx+vr67e3t1NTUzc3N0tLSzs7OwMDA09PT19fXvb293t7etra239/f6OjoADPkJQAAA8RJREFUeJztl+tTUkEUwM/CFZKHYmoqFErlmAqkNKVFRC81p5ppqv+yaepDD2vsNZUWRphUFORQUhlZiISDyMXbnt17i0Z7KHdqpnE/cA+7d8/v7tk9Z88h8Bca+dsQQkiRCQJZ4gLoaB9ZFFWEGKnCDArVRXEBnxZSYO9UpNSD1OZhwycU6nOGj/TRQLLm2Y1ixRxY3qoHMZCUMQnKSohJqn2D/S2foD6uGqSaJBtfiwqkddoa5QNt7za/UA2yKdo21fxMhgh12ZanfMCaqUmoBrGGK7WbTBN8T3ZOOsLyQNcr2D6uHgS6Y1Q/g3iirSFlxCxpMipCnK9NtiAzl75ixyNlxBXf9kRFCOyOdAQYxBNtfKWMmKXOh2pCemNQ0KO5DBqSk12dGF1j5Xj9MghsTluTuBLtnrDiHduS7pEyGCtAvJl41zj6iS/UfZf1C/seF/LqQsAf1OcRcvAR7L5F/7vrAjzaqAkR/A+BxS5/EBx5e8Qetkck1SBmC/drR2OYm8fZNEp/9bs+luOJ8NtLa+AmwJGh8hD/4GZch6xD1iHrEJUhgwnMs3SSWBLYnSDnXlCVqyzNWNy24TY+pJW07GlM/wmkNp+jyfyWWeDpNm2CKwYHrnCxNeGIKBd9ly0+RR81844gwInbMvanV/SPkK0TmNubCi1B3tP8WSK9w0z0RF3hqve825NLeHQx0pF93BEAOHnrMNMy9NMreiVI0/TRi7zHNtf7QIb4QqLQPsbEKkmqnGGSdQ998fgddkv/oq0EWdLYn7OOnmd9qSCHeJdMybhux32O7rpXMm1tkIVDo/kCn17XLENOXxcXfKGGScAEQ7+l9D5eI8QbZMmQO94S8cqQfRNCumG+7wIVD42Zp0tVrA2S612K4tZ3vtGl/BxCjDQx1tZn5+np3j+uo+WdO4JTOsdx43uqqDh3c3WQYv8Ibv2Za0JahmwQ8GsPBzBV6h/BI64x4JSmGELY7IHzq4RoDD03wDFDzSJDkIfHeOMUrgRLSC89vOZFNOsazVUEeypf8IVoAckhBo1jK32heBt8V+HUcPU7PuHsUFmQU8PdXxLVU6IMOflNi/8yDN7VF9NqQHa91FemcQMYhIYUganVGKS8CH2jtpdqQKCGOsriogzxRJWiqz1BQ8vAk6yuHd2SrrcsiDUD7HMZxBdS1Bx9gKHFGSewVzcpfkDrKUcYZu4tV78cYnYGqPp2C1ZV1EKD5wA9/eAlMINWDuNy+WVxPcdo6HnhGcL18LHvdeyvIKtpx25Qxp/Wkf/P9fsVAGO0QhHG300AAAAASUVORK5CYII="
            try{
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                
                  resolve(reader.result)
                };
                reader.onerror = function (error) {
                    //resolve(NO_IMAGE)
                    resolve(null)
                };
            }catch(error){
                //resolve(NO_IMAGE)
                resolve(null)
            }
        })
     }


    /*
convertToEntities()
This is to convert Chinese characters to Unicode numbers
*/

convertToEntities=(input)=> {
    var tstr = input;
    var bstr = '';
    for(let i=0; i<tstr.length; i++)
    {
      if(tstr.charCodeAt(i)>127)
      {
        bstr += '&#' + tstr.charCodeAt(i) + ';';
      }
      else
      {
        bstr += tstr.charAt(i);
      }
    }
    return bstr;
  }



  getEUFormCurlApiLandingMappedData(fields){
      
      
       
   return  fields.filter((field)=>field.name!=undefined).map((field,index,{length})=> { 


        if(!field.name)return ""

        if(field.type=="CheckGroup"){
            return `mappedData['${field.id}']  = new FormData(form).getAll("${field.name}[]") || null;`
        }else{
            return `mappedData['${field.id}'] = data["${field.name}"] || null; `
        }
    }).join("\n\t\t") 
}

EUScript=()=>{

    const EU_MAPPED_DATA=this.getEUFormCurlApiLandingMappedData(this.state.form)

    return ` submitHandler: function(form, event) {
                    event.preventDefault(); // Prevent default form submission
                    console.log(form);
                    const data = Object.fromEntries(new FormData(form).entries());
                    // Map data
					var mappedData = {};  

                    ${EU_MAPPED_DATA}

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
                            <tr><td>Dear&nbsp;<b>\${firstname},<b></td></tr>
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
						body = body.replace(/(\\r\\n|\\n|\\r|\\t)/gm, "");
						
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






    

  //This function used to  map data as per new CURL api
    getFormCurlApiSendmailMappedData(fields){
      
 
        return `
        $fields = [
        ${fields.filter((field)=>field.name!=undefined).map((field,index,{length})=> { 


            if(!field.name)return ""

            const hasDataName=/data\[(.+)\]/g.test(field.name)

            const field_name= (hasDataName) ? field.name.replace(/data\[(.+)\]/g,"$1"): `"${field.name}"`

            return  `"${field.id}"   =>  ${field_name}  ${(index+1==length)?'':','} `
        }).join("\n\t\t") 
    }
        ];
        `
    }



    
       
  




    getPrivacyPolicy(data){

        const eu_privacy=`<a href='https://itbusinessplus.com/eu-privacy/'>EU Data Protection Policy</a>`
        const non_eu_privacy=`<a href='https://itbusinessplus.com/privacy-policy/'>ITBP Privacy Policy</a>`
        const casl_privacy=`<a href='https://www.itbusinessplus.com/casl-privacy-policy/'>CASL Privacy Policy</a>`
        switch(this.state.REGION){
            case "EU":
                data=data.replaceAll(`##PRIVACY_POLICY##`, `${eu_privacy}` )
            break;
            case "NON-EU":
                data=data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy}` )
            break;
            case "CASL":
                data=data.replaceAll(`##PRIVACY_POLICY##`, `${casl_privacy}` )
            break;
            case "BOTH":
                data=data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy} | ${casl_privacy}` )
            break;
        }

        return data
    }



    replaceHashVariables(data_in){
        let data=data_in
        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            } catch (error) {
                console.log("Error while replaceAll in of publishHelper ",error,key,value);
            } 
        }

        return data;
    }

    async getEdmHtml({forPreview}){
        let data=edm_html;      



       

        data= this.convertToEntities( this.getPrivacyPolicy(data)  ) //Privacy Policy
        
        if(forPreview==true){
            if(this.filesRef.fileInput1.files[0]){data=data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image( this.filesRef.fileInput1.files[0])  )}
           
       
       if(this.state["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"]==true){
        if(this.filesRef.fileInput3.files[0]){data=data.replaceAll(`##BASE_URL####EDM_THUMBNAIL_NAME##`, await this.getBase64Image( this.filesRef.fileInput3.files[0]) )}
       
       }else{
        if(this.filesRef.fileInput2.files[0]){data=data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image( this.filesRef.fileInput2.files[0]) )}
       }
        }

 
        return this.replaceHashVariables(data)
    }
    async getLandingHtml({forPreview}){     
        
        let data=landing_html

       

       if(forPreview==true){
        if(this.filesRef.fileInput1.files[0]){data=data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image( this.filesRef.fileInput1.files[0])  )}
     
        if(this.filesRef.fileInput2.files[0]){data=data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image( this.filesRef.fileInput2.files[0]) )}
  
        }



        data=this.getPrivacyPolicy(data) //Privacy Policy

        if(this.state["LANDING_TITLE_SAME_AS_EDM_TITLE"]==true){
            data=data.replaceAll(`##LANDING_TITLE##`, this.convertToEntities ( this.state["EDM_TITLE"]  ) )
        } 


        if(this.state["LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT"]==true){
            data=data.replaceAll(`##LANDING_ABSTRACT##`, this.convertToEntities ( this.state["EDM_ABSTRACT"]  ) )
        } 

        data=data.replaceAll(`##FORM##`, this.convertToEntities ( this.getFormHtml(this.state.form,ALPHAFormRenderer) )  )

        if(this.state.REGION=="EU"){
            data=data.replaceAll(`##EU_SCRIPT##`, this.convertToEntities ( this.EUScript() )  )
        }else{
            data=data.replaceAll(`##EU_SCRIPT##`, ''  )
        }
        


        return this.replaceHashVariables(data)
        //return JSON.stringify(this.thumbnailDataUrl)+" "+JSON.stringify(this.state)
    }
    getSendmailHtml({forPreview}){
        let data=sendemail_html
        data=data.replaceAll(`##MAPPED_DATA##`, this.getFormCurlApiSendmailMappedData(this.state.form) )

        const hasSpecialCharsInSubject=this.convertToEntities( this.state["SENDMAIL_SUBJECT"]) .includes("&#")
        data=data.replaceAll(`##SENDMAIL_SUBJECT##`, (hasSpecialCharsInSubject)? getSendmailSubject( this.state["SENDMAIL_SUBJECT"] )  : this.state["SENDMAIL_SUBJECT"].replaceAll("\\'","'")  )
        data=data.replaceAll(`##SENDMAIL_BODY##`, this.convertToEntities( this.state["SENDMAIL_BODY"]).replaceAll('"','\\"') )

    
        data=this.replaceHashVariables(data)

        if(forPreview==true){

            //Escape html for preview to prevent redirects
            data=`<pre>${new Option(data).innerHTML}</pre>`
        }

        return  data
    }
    async getThanksHtml({forPreview}){
        let data=thanks_html


     


        data=this.getPrivacyPolicy(data) //Privacy Policy
        const normal_thankyou=`\t
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img   style=" height: auto !important;" alt="##EDM_TITLE##" src="##BASE_URL####THUMBNAIL_NAME##" width="180" style="border: 1px solid #c4c5c600;" />
                                    </td>

                                    <td align="left" valign="top" class="style1 thankyou">

                                        ${this.state["NORMAL_THANK_YOU_PAGE_TEXT"]}

                                        <script>
                                            var timeleft = 5;
                                            var downloadTimer = setInterval(function () {
                                                if (timeleft <= 0) {
                                                    clearInterval(downloadTimer);
                                                    document.getElementById("countdown").innerHTML = "0";
                                                } else {
                                                    document.getElementById("countdown").innerHTML = timeleft + "";
                                                }
                                                timeleft -= 1;
                                            }, 1000);
                                        </script>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        
        \n`

        const iframe_thankyou=`
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h3>##EDM_TITLE##</h3>
                                            <iframe 
                                            src="##IFRAME##" 
                                            title="##EDM_TITLE##" 
                                            style="width:100%;aspect-ratio:16/9;"
                                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen></iframe>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `

        const mp4_thankyou=`
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h3>##EDM_TITLE##</h3>
	                                     
                                        <video class="jw-video jw-reset" tabindex="-1" style="width:100%;aspect-ratio:16/9;" controls>
                                            <source src="##BASE_URL####MP4##" type="video/mp4">
                                        </video> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `

        switch(this.state["ASSET_FORMAT"]){
            case "PDF":
                data=data.replaceAll(`##THANK_YOU_CONTENT##`,  this.convertToEntities(  normal_thankyou ) )
                break;
            case "MP4":
                data=data.replaceAll(`##THANK_YOU_CONTENT##`,  this.convertToEntities(  mp4_thankyou )  )
                data=data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `,  ""  )//remove redirect
                break;
            case "CLIENT_LINK":
                data=data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(   normal_thankyou ) )
                data=data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`,   this.state['CLIENT_LINK']  )
                break;
            case "IFRAME":
                data=data.replaceAll(`##THANK_YOU_CONTENT##`,  this.convertToEntities(  iframe_thankyou )  )
                data=data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `,  ""  )//remove redirect    
            break;
        }

        if(forPreview==true){
            if(this.filesRef.fileInput1.files[0]){data=data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image( this.filesRef.fileInput1.files[0])  )}
            if(this.filesRef.fileInput2.files[0]){data=data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image( this.filesRef.fileInput2.files[0]) )}
        }

      

 
        return this.replaceHashVariables(data)
    }
    getThankyouDoubleOptinHtml({forPreview}){

    }


    async getThanksVideoHtml({forPreview}){
        let data=thanks_video_html

        return this.replaceHashVariables(data)
    }



    async getPageFiles({forPreview=false,filesRef=null,state=null}){
        

        this.filesRef=filesRef
        this.state=state
        
        let files=[]

        files.push({ name:`${ this.state["LINK_NAME"] }-edm.html`, data: await this.getEdmHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-landing.html`, data: await this.getLandingHtml({forPreview}) })

        if(this.state.REGION!="EU"){
            //Sendmail not required for EU data is passed from landing page
            files.push({ name:`${ this.state["LINK_NAME"] }-sendemail.php`, data: await this.getSendmailHtml({forPreview}) })
        }
        
        files.push({ name:`${ this.state["LINK_NAME"] }-thanks.html`, data: await this.getThanksHtml({forPreview}) })
        
        if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){
        files.push({ name:`${ this.state["LINK_NAME"] }-thanks-vid.html`, data: await this.getThanksVideoHtml({forPreview}) })
        } 
        return files;
    }
}

export default PublishHelper