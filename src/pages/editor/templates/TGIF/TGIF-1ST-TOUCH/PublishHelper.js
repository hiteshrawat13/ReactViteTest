//Dont forget to add extension while importing module
import { TGIFFormRenderer } from './FormRenderer.js'
import edm_html from './pages/edm.html.txt?raw'  //?raw is important to read text files
import landing_html from './pages/landing.php.txt?raw'  //?raw is important to read text files
import sendemail_html from './pages/sendemail.php.txt?raw'  //?raw is important to read text files
import thanks_html from './pages/thanks.php.txt?raw'  //?raw is important to read text files




import telemarketing_edm_html from './pages/telemarketing/edm.html.txt?raw'  //?raw is important to read text files
import telemarketing_Thankyou_html from './pages/telemarketing/Thankyou.html.txt?raw'  //?raw is important to read text files


//https://thebusinessinnovations.com/tbi/2024/10-Oct/30/HSI-APAC-CPL-Oct-Dec-2024-Q4-Donesafe-activation-UKI/01/The-global-ehs-readiness-index-report-2024.html

import SpeakerRender from './SpeakerRender.js'

import Functions from './functions.js'

import { getSendmailSubject } from './Base64.js'
class PublishHelper {
    constructor(state) {
        this.state = state
    }



    getFormHtml(fields, formRenderer) {
        let html = ""
        fields.forEach((field, index) => {
            if (formRenderer[field.type]) {
                html += formRenderer[field.type](field)
            }

        })
        return html
    }



    getBase64Image(file) {

        return new Promise((resolve, reject) => {

            //const NO_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQJQTFRF////9vb26urq/f39/v7+6enp9/f34uLi1tbW4ODg7u7ura2tqKioq6ur8vLy2tra9fX1w8PD0dHRqampu7u72dnZ1dXV5OTkrKyswcHB5eXlv7+/0NDQsbGxs7Oz4+Pj4eHh6+vrsLCw3d3dtbW1y8vLwsLCxMTEycnJr6+vsrKy3Nzc7Ozsrq6u/Pz87+/v+fn5uLi45ubm+Pj4urq6xcXFysrK8/Pz9PT0qqqqvr6++/v7zMzMxsbGt7e329vb8PDw2NjYyMjItLS0z8/Pubm5x8fH8fHx+vr67e3t1NTUzc3N0tLSzs7OwMDA09PT19fXvb293t7etra239/f6OjoADPkJQAAA8RJREFUeJztl+tTUkEUwM/CFZKHYmoqFErlmAqkNKVFRC81p5ppqv+yaepDD2vsNZUWRphUFORQUhlZiISDyMXbnt17i0Z7KHdqpnE/cA+7d8/v7tk9Z88h8Bca+dsQQkiRCQJZ4gLoaB9ZFFWEGKnCDArVRXEBnxZSYO9UpNSD1OZhwycU6nOGj/TRQLLm2Y1ixRxY3qoHMZCUMQnKSohJqn2D/S2foD6uGqSaJBtfiwqkddoa5QNt7za/UA2yKdo21fxMhgh12ZanfMCaqUmoBrGGK7WbTBN8T3ZOOsLyQNcr2D6uHgS6Y1Q/g3iirSFlxCxpMipCnK9NtiAzl75ixyNlxBXf9kRFCOyOdAQYxBNtfKWMmKXOh2pCemNQ0KO5DBqSk12dGF1j5Xj9MghsTluTuBLtnrDiHduS7pEyGCtAvJl41zj6iS/UfZf1C/seF/LqQsAf1OcRcvAR7L5F/7vrAjzaqAkR/A+BxS5/EBx5e8Qetkck1SBmC/drR2OYm8fZNEp/9bs+luOJ8NtLa+AmwJGh8hD/4GZch6xD1iHrEJUhgwnMs3SSWBLYnSDnXlCVqyzNWNy24TY+pJW07GlM/wmkNp+jyfyWWeDpNm2CKwYHrnCxNeGIKBd9ly0+RR81844gwInbMvanV/SPkK0TmNubCi1B3tP8WSK9w0z0RF3hqve825NLeHQx0pF93BEAOHnrMNMy9NMreiVI0/TRi7zHNtf7QIb4QqLQPsbEKkmqnGGSdQ998fgddkv/oq0EWdLYn7OOnmd9qSCHeJdMybhux32O7rpXMm1tkIVDo/kCn17XLENOXxcXfKGGScAEQ7+l9D5eI8QbZMmQO94S8cqQfRNCumG+7wIVD42Zp0tVrA2S612K4tZ3vtGl/BxCjDQx1tZn5+np3j+uo+WdO4JTOsdx43uqqDh3c3WQYv8Ibv2Za0JahmwQ8GsPBzBV6h/BI64x4JSmGELY7IHzq4RoDD03wDFDzSJDkIfHeOMUrgRLSC89vOZFNOsazVUEeypf8IVoAckhBo1jK32heBt8V+HUcPU7PuHsUFmQU8PdXxLVU6IMOflNi/8yDN7VF9NqQHa91FemcQMYhIYUganVGKS8CH2jtpdqQKCGOsriogzxRJWiqz1BQ8vAk6yuHd2SrrcsiDUD7HMZxBdS1Bx9gKHFGSewVzcpfkDrKUcYZu4tV78cYnYGqPp2C1ZV1EKD5wA9/eAlMINWDuNy+WVxPcdo6HnhGcL18LHvdeyvIKtpx25Qxp/Wkf/P9fsVAGO0QhHG300AAAAASUVORK5CYII="
            try {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {

                    resolve(reader.result)
                };
                reader.onerror = function (error) {
                    //resolve(NO_IMAGE)
                    resolve(null)

                };
            } catch (error) {
                //resolve(NO_IMAGE)
                resolve(null)
            }
        })
    }


    /*
convertToEntities()
This is to convert Chinese characters to Unicode numbers
*/

    convertToEntities = (input) => {
        var tstr = input;
        var bstr = '';
        for (let i = 0; i < tstr.length; i++) {
            if (tstr.charCodeAt(i) > 127) {
                bstr += '&#' + tstr.charCodeAt(i) + ';';
            }
            else {
                bstr += tstr.charAt(i);
            }
        }
        return bstr;
    }


    replaceHashVariables(data_in) {
        let data = data_in
    

        for (const [key, value] of Object.entries(this.state)) {
            try {
                if (typeof value === 'string' || value instanceof String)
                    data = data.replaceAll(`##${key}##`, this.convertToEntities(value))
            } catch (error) {
                console.log("Error while replaceAll in of publishHelper ", error, key, value);
            }
        }


        const regex = /##.+##/g;
        let matches=data.match(regex)

      

        return data;
    }

 
    getFormCurlApiSendmailMappedData(fields) {


        return `
        $fields = [
        ${fields.filter((field) => field.name != undefined).map((field, index, { length }) => {


            if (!field.name) return ""

            const hasDataName = /data\[(.+)\]/g.test(field.name)

            const field_name = (hasDataName) ? field.name.replace(/data\[(.+)\]/g, "$1") : `"${field.name}"`

            return `"${field.id}"   =>  ${field_name}  ${(index + 1 == length) ? '' : ','} `
        }).join("\n\t\t")
            }
        ];
        `
    }


    getFooter(){
        //const this.state.FOOTER = `<a href="https://itbusinesstoday.com/eu-data-protection">Privacy Policy</a>`
    }


    getPrivacyPolicy(data) {
        const eu_privacy = `<a href="https://itbusinesstoday.com/eu-data-protection">Privacy Policy</a>`
        const non_eu_privacy = `<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`
        const casl_privacy = `<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`
        switch (this.state.REGION) {
            case "EU":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${eu_privacy}`)
                break;
            case "NON-EU":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy}`)
                break;
            case "CASL":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${casl_privacy}`)
                break;
            case "BOTH":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy} | ${casl_privacy}`)
                break;
        }

        return data
    }

    async getEdmHtml({ forPreview }) {
        let data = edm_html;

        if(this.state['LINK_TYPE']=="1st_touch"){
            data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCH##`, '') //Remove this .it is for 2nd touch
        }else{
            if (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"] && (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"].trim().length > 0)) {
                    data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCH##`, `<p style="font-size: 14px;color: #505050;margin-bottom:5px;" class="body-sub-title">${Functions.convertToEntities(this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"])}</p>`)
            } else {
                    data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCHE##`, "")
            }

         
           
        }
      
        if(this.state['LINK_TYPE']=="2nd_touch"){
            data = data.replaceAll(`##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#`, "##BASE_URL####LINK_NAME##-thanks.php")
        }


        const traditional_layout = `
        <table width="100%" style="background-color: #ffffff; padding: 0% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                                <tr scope="col">
                                    <td style="vertical-align: top;padding-right: 18px;">
                                
										<div class="abstract edm_abstract">
											##EDM_ABSTRACT##

                                            ##IMAGE_BELOW_ABSTRACT##

                                           
										</div>

                                    </td>
                                    <td style="width:##EDM_THUMBNAIL_WIDTH##;" class="edm_thumbnail" align="center" valign="top">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####THUMBNAIL_NAME##" alt="##EDM_TITLE##" class="img-full-width" />
                                        </a>

                                    </td>
                                </tr>

                                <tr><td colspan='2'>##SPEAKERS##</td></tr>
                            </tbody>
                        </table>
        `


        const full_width_layout = `
        <table width="100%" style="background-color: #ffffff; padding: 0% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                           
								<tr>
								 <td colspan="2" align="center" valign="top">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####THUMBNAIL_NAME##" alt="##EDM_TITLE##" class="img-full-width edm_thumbnail" style="width:##EDM_THUMBNAIL_WIDTH##;" />
                                        </a>

                                    </td>
								</tr>

								<tr>
									<td colspan="2">
										<div class="abstract edm_abstract">
											##EDM_ABSTRACT##

                                            ##IMAGE_BELOW_ABSTRACT##
										</div>
									</td>
								</tr>

                                <tr><td colspan='2'>##SPEAKERS##</td></tr>
                            </tbody>
                        </table>
        `

        if (this.state["EDM_LAYOUT"] == "Traditional") {
            data = data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities(traditional_layout))
        } else if (this.state["EDM_LAYOUT"] == "Full width thumbnail and abstract") {
            data = data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities(full_width_layout))
        }


        // EDM IMAGE_BELOW_ABSTRACT 

        if(this.state['SHOW_IMAGE_BELOW_ABSTRACT'] ==true){
            if (forPreview == true) {
                const image_below_abstract_img_tag=`<img src="${await this.getBase64Image(this.filesRef.fileInput9.files[0])}"   class="image_below_abstract" style="width:${this.state['IMAGE_BELOW_ABSTRACT_WIDTH']};"  alt="Image" /> `
                if (this.filesRef.fileInput9.files[0]) { data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, image_below_abstract_img_tag) }
            }else{
                const image_below_abstract_img_tag=`<img src="${ this.state['BASE_URL'] + this.state['IMAGE_BELOW_ABSTRACT']}"   class="image_below_abstract" style="width:${this.state['IMAGE_BELOW_ABSTRACT_WIDTH']};"  alt="Image" /> `
                data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, image_below_abstract_img_tag)
            }
        }else{
            data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, '')
        }
         // IMAGE_BELOW_ABSTRACT  END

        
        

        try{
            data = await SpeakerRender({datas:data,STATE:this.state,filesRef:this.filesRef,forPreview,getBase64Image:this.getBase64Image})

        }catch(error){
            console.log(error);
            
        }





        if (this.state["THUMBNAIL_BORDER"] == true) {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`,  'border: 1px solid #e5e5e5;'  )
        } else {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`, '')
        }
        
        


      


        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }


            if (this.state["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) {
                if (this.filesRef.fileInput3.files[0]) { data = data.replaceAll(`##BASE_URL####EDM_THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput3.files[0])) }

            } else {
                if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
            }
        }



        if (this.state["EDM_SUB_TITLE"] && (this.state["EDM_SUB_TITLE"].trim().length > 0)) {
            data = data.replaceAll(`##EDM_SUB_TITLE##`, `<p style="font-size: 15px;color: #6F6F6F;margin-top:12px;margin-bottom:5px;font-weight:bold;" class="body-sub-title">${this.convertToEntities(this.state["EDM_SUB_TITLE"])}</p>`)
        } else {
            data = data.replaceAll(`##EDM_SUB_TITLE##`, "")
        }

        if (this.state["HIDE_THUMBNAIL"] == true) {
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, 'display:none;')
        }else{
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, '') 
        }
  
   
        

        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy

        return data
    }

    async getLandingHtml({ forPreview }) {

        let data = landing_html

        const traditional_landing_layout = `
        <div class="img" align="center">
            <img   src="##BASE_URL####THUMBNAIL_NAME##"  class="thumbnail"  alt="thumbnail" />                          
        </div>
        <div class="landing_abstract" >
           ##LANDING_ABSTRACT##

           ##IMAGE_BELOW_ABSTRACT##

            ##SPEAKERS##
        </div>
       `

        const landing_layout_logo_below_abstract = `
        <div class="landing_abstract">
          ##LANDING_ABSTRACT##

          ##IMAGE_BELOW_ABSTRACT##

           ##SPEAKERS##
        </div>
        <div class="img" align="center">
            <img   src="##BASE_URL####THUMBNAIL_NAME##"   class="thumbnail"   alt="thumbnail" />                          
        </div>
      `


        if (this.state["LANDING_LAYOUT"] == "Traditional") {
            data = data.replaceAll(`##LANDING_LAYOUT##`, this.convertToEntities(traditional_landing_layout))
        } else if (this.state["LANDING_LAYOUT"] == "Thumbnail below abstract") {
            data = data.replaceAll(`##LANDING_LAYOUT##`, this.convertToEntities(landing_layout_logo_below_abstract))
        }


        //LP IMAGE_BELOW_ABSTRACT
        if(this.state['SHOW_IMAGE_BELOW_ABSTRACT'] ==true && this.state['SHOW_IMAGE_BELOW_ABSTRACT_ON_LANDING_PAGE'] == true){
            if (forPreview == true) {
                const image_below_abstract_img_tag=`<img src="${await this.getBase64Image(this.filesRef.fileInput9.files[0])}"   class="image_below_abstract" style="width:${this.state['IMAGE_BELOW_ABSTRACT_WIDTH']};"  alt="Image" /> `
                if (this.filesRef.fileInput9.files[0]) { data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, image_below_abstract_img_tag) }
            }else{
                const image_below_abstract_img_tag=`<img src="${ this.state['BASE_URL'] + this.state['IMAGE_BELOW_ABSTRACT']}"   class="image_below_abstract" style="width:${this.state['IMAGE_BELOW_ABSTRACT_WIDTH']};"  alt="Image" /> `
                data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, image_below_abstract_img_tag)
            }
        }else{
            data = data.replaceAll(`##IMAGE_BELOW_ABSTRACT##`, '')
        }
   


        //LP SPEAKERS
        try{
            if(this.state['SHOW_SPEAKERS_ON_LANDING_PAGE']==true){
                data = await SpeakerRender({datas:data,STATE:this.state,filesRef:this.filesRef,forPreview,getBase64Image:this.getBase64Image})
            }else{
                data=data.replaceAll(`##SPEAKERS##`, "")
            }

        }catch(error){
            console.log(error); 
        }

        //LP LOGO THUMBNAIL
        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
            if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
        }

        if (this.state["THUMBNAIL_BORDER"] == true) {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`,  'border: 1px solid #e5e5e5;'  )
        } else   {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`, '')
        }


        data = this.getPrivacyPolicy(data) //Privacy Policy

        if (this.state["LANDING_TITLE_SAME_AS_EDM_TITLE"] == true) {
            data = data.replaceAll(`##LANDING_TITLE##`, this.convertToEntities(this.state["EDM_TITLE"]))
        }


        if (this.state["LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT"] == true) {
            data = data.replaceAll(`##LANDING_ABSTRACT##`, this.convertToEntities(this.state["EDM_ABSTRACT"]))
        }

        if (this.state["HIDE_THUMBNAIL"] == true) {
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, 'display:none;')
        }else{
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, '') 
        }

        data = data.replaceAll(`##FORM##`, this.convertToEntities(this.getFormHtml(this.state.form, TGIFFormRenderer)))

        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy

        return data
        //return JSON.stringify(this.thumbnailDataUrl)+" "+JSON.stringify(this.state)
    }

    //Sendmail
    getSendmailHtml({ forPreview }) {
        let data = sendemail_html

         
        

        data = data.replaceAll(`##MAPPED_DATA##`, this.getFormCurlApiSendmailMappedData(this.state.form))

        const hasSpecialCharsInSubject = this.convertToEntities(this.state["SENDMAIL_SUBJECT"]).includes("&#")
        data = data.replaceAll(`##SENDMAIL_SUBJECT##`, (hasSpecialCharsInSubject) ? getSendmailSubject(this.state["SENDMAIL_SUBJECT"]) : this.state["SENDMAIL_SUBJECT"].replaceAll("\\'", "'"))
        data = data.replaceAll(`##SENDMAIL_BODY##`, this.convertToEntities(this.state["SENDMAIL_BODY"]).replaceAll('"', '\\"'))



        switch (this.state["ASSET_FORMAT"]) {
            case "PDF":
                
                break;
            case "MP4":
                
                data = data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`, '##BASE_URL####LINK_NAME##-thanks.php')
                break;
            case "CLIENT_LINK":
                data = data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`, this.state['CLIENT_LINK'])
                break;
            case "IFRAME":
                data = data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`, '##BASE_URL####LINK_NAME##-thanks.php')  
                break;
        }


        data=this.replaceHashVariables(data)

 

        if (forPreview == true) {
            //Escape html for preview to prevent redirects
            data = `<pre>${new Option(data).innerHTML}</pre>`
        }

        return data
    }
    async getThanksHtml({ forPreview }) {
        let data = thanks_html

        data = this.getPrivacyPolicy(data) //Privacy Policy
        const normal_thankyou = `\t
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img  class="thumbnail"  alt="##EDM_TITLE##" src="##BASE_URL####THUMBNAIL_NAME##"    />
                                    </td>

                                    <td align="left" valign="top" class="style1 thankyou abstract">

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

        const iframe_thankyou = `
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h1 style="font-size: 22px;font-weight:normal; color: #0066b2;margin-top:10px;margin-bottom:15px;padding-left:0px;">##ASSET_TITLE##</h1> 
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

        const mp4_thankyou = `
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h1 style="font-size: 22px;font-weight:normal; color: #0066b2;margin-top:10px;margin-bottom:15px;padding-left:0px;">##EDM_TITLE##</h1> 
	                                     
                                        <video class="jw-video jw-reset" tabindex="-1" style="width:100%;aspect-ratio:16/9;" controls>
                                            <source src="##BASE_URL####MP4_NAME##" type="video/mp4">
                                        </video> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `

        switch (this.state["ASSET_FORMAT"]) {
            case "PDF":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(normal_thankyou))
                break;
            case "MP4":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(mp4_thankyou))
                data = data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `, "")//remove redirect
                break;
            case "CLIENT_LINK":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(normal_thankyou))
                data = data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`, this.state['CLIENT_LINK'])
                break;
            case "IFRAME":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(iframe_thankyou))
                data = data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `, "")//remove redirect    
                break;
        }

        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
            if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
        }

        if (this.state["THUMBNAIL_BORDER"] == true) {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`,  'border: 1px solid #e5e5e5;'  )
        } else   {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`, '')
        }

        if (this.state["HIDE_THUMBNAIL"] == true) {
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, 'display:none;')
        }else{
            data = data.replaceAll(`##HIDE_THUMBNAIL##`, '') 
        }


        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy
        return data
    }


    getThankyouDoubleOptinHtml({ forPreview }) {

    }









//For telemarketing START---------------------
    async getTelemarketingEdmHtml({ forPreview }) {
        let data = telemarketing_edm_html


        

        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy

        return data
    }

    async getTelemarketingThankyouHtml({ forPreview }) {
        let data = telemarketing_Thankyou_html

        

        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)
        data=this.replaceHashVariables(data)

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy

        return data

    }
//For telemarketing END-----------------------







    async getPageFiles({ forPreview = false, filesRef = null, state = null }) {


        this.filesRef = filesRef
        this.state = state

        let files = []

        if(this.state["LINK_TYPE"]=="1st_touch" || this.state["LINK_TYPE"]=="2nd_touch"){

            files.push({ name: `${this.state["LINK_NAME"]}-edm.html`, data: await this.getEdmHtml({ forPreview }) })

            if(this.state["LINK_TYPE"]=="1st_touch"){
                files.push({ name: `${this.state["LINK_NAME"]}-landing.php`, data: await this.getLandingHtml({ forPreview }) })
                files.push({ name: `${this.state["LINK_NAME"]}-sendemail.php`, data: await this.getSendmailHtml({ forPreview }) })
            }
        
            files.push({ name: `${this.state["LINK_NAME"]}-thanks.php`, data: await this.getThanksHtml({ forPreview }) })

        }


        //For telemarketing
        if(this.state["LINK_TYPE"]=="telemarketing"){
            files.push({ name: `${this.state["LINK_NAME"]}-edm.html`, data: await this.getTelemarketingEdmHtml({ forPreview }) })
            files.push({ name: `${this.state["LINK_NAME"]}-Thankyou.html`, data: await this.getTelemarketingThankyouHtml({ forPreview }) })
       
        }
        // if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        // }else{

        // }
        return files;
    }
}

export default PublishHelper