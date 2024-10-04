 //Dont forget to add extension while importing module
 import {TGIFFormRenderer} from './FormRenderer.js'
 import edm_html from './edm.html.txt?raw'  //?raw is important to read text files
 import landing_html from './landing.php.txt?raw'  //?raw is important to read text files
 import sendemail_html from './sendemail.php.txt?raw'  //?raw is important to read text files
 import thanks_html from './thanks.php.txt?raw'  //?raw is important to read text files

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
        const eu_privacy=`<a href="https://itbusinesstoday.com/eu-data-protection">Privacy Policy</a>`
        const non_eu_privacy=`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`
        const casl_privacy=`<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`
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

    async getEdmHtml({forPreview}){
        let data=edm_html;      


    

        const traditional_layout=`
        <table width="100%" style="background-color: #ffffff; padding: 1.2% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                                <tr scope="col">
                                    <td style="padding-left: 8px; vertical-align: top; padding-right: 20px;">
                                
										<div class="edm_abstract">
											##EDM_ABSTRACT##
										</div>

                                    </td>
                                    <td style="display: flex; flex: start;">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####LINK_NAME##.png" alt="##EDM_TITLE##" class="img" />
                                        </a>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `


        const full_width_layout=`
        <table width="100%" style="background-color: #ffffff; padding: 1.2% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                           
								<tr>
								 <td colspan="2">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####LINK_NAME##.png" alt="##EDM_TITLE##" class="img-full-width" />
                                        </a>

                                    </td>
								</tr>

								<tr>
									<td colspan="2">
										<div class="edm_abstract">
											##EDM_ABSTRACT##
										</div>
									</td>
								</tr>
                            </tbody>
                        </table>
        `

        if(this.state["EDM_LAYOUT"]=="Traditional"){
            data=data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities ( traditional_layout  ) )
        } else if(this.state["EDM_LAYOUT"]=="Full width thumbnail and abstract"){
            data=data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities ( full_width_layout  ) )
        }


        
        data= this.convertToEntities( this.getPrivacyPolicy(data)  ) //Privacy Policy
        


        if(forPreview){
            if(this.logoDataUrl){data=data.replaceAll(`##BASE_URL####LOGO_NAME##`, this.logoDataUrl )}
            if(this.thumbnailDataUrl){data=data.replaceAll(`##BASE_URL####LINK_NAME##.png`, this.thumbnailDataUrl )}

            console.log(this.thumbnailDataUrl,"------------------------thumbnail");
            
        }


        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            } catch (error) {
                console.log("Error while replaceAll in getLandingHtml() of publishHelper ",error,key,value);
            } 
        }
        return data
    }
    getLandingHtml({forPreview}){     
        
        let data=landing_html

        if(forPreview){
            if(this.logoDataUrl){data=data.replaceAll(`##BASE_URL####LOGO_NAME##`, this.logoDataUrl )}
            if(this.thumbnailDataUrl){data=data.replaceAll(`##BASE_URL####LINK_NAME##.png`, this.thumbnailDataUrl )}
        }

        data=this.getPrivacyPolicy(data) //Privacy Policy

        if(this.state["LANDING_TITLE_SAME_AS_EDM_TITLE"]==true){
            data=data.replaceAll(`##LANDING_TITLE##`, this.convertToEntities ( this.state["EDM_TITLE"]  ) )
        } 


        if(this.state["LANDING_ABSTRACT_SAME_AS_EDM_ABSTRACT"]==true){
            data=data.replaceAll(`##LANDING_ABSTRACT##`, this.convertToEntities ( this.state["EDM_ABSTRACT"]  ) )
        } 

        data=data.replaceAll(`##FORM##`, this.convertToEntities ( this.getFormHtml(this.state.form,TGIFFormRenderer) )  )

        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            } catch (error) {
                console.log("Error while replaceAll in getLandingHtml() of publishHelper ",error,key,value);
            } 
        }
        

        return data
        //return JSON.stringify(this.thumbnailDataUrl)+" "+JSON.stringify(this.state)
    }
    getSendmailHtml({forPreview}){
        let data=sendemail_html
        data=data.replaceAll(`##MAPPED_DATA##`, this.getFormCurlApiSendmailMappedData(this.state.form) )

        const hasSpecialCharsInSubject=this.convertToEntities( this.state["SENDMAIL_SUBJECT"]) .includes("&#")
        data=data.replaceAll(`##SENDMAIL_SUBJECT##`, (hasSpecialCharsInSubject)? getSendmailSubject( this.state["SENDMAIL_BODY"] )  : this.state["SENDMAIL_BODY"].replaceAll("\\'","'")  )
        data=data.replaceAll(`##SENDMAIL_BODY##`, this.convertToEntities( this.state["SENDMAIL_BODY"]) )

        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            } catch (error) {
                console.log("Error while replaceAll in getSendmailHtml of publishHelper ",error,key,value);
            } 
        }
        return  data
    }
    getThanksHtml({forPreview}){
        let data=thanks_html

        data=this.getPrivacyPolicy(data) //Privacy Policy
        const normal_thankyou=`\t
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img   style=" height: auto !important;" alt="##EDM_TITLE##" src="##BASE_URL####LINK_NAME##.png" width="180" style="border: 1px solid #c4c5c600;" />
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
	                                        ##IFRAME##

                                            <iframe 
                                            width="##IFRAME_WIDTH##" 
                                            height="##IFRAME_HEIGHT##" 
                                            src="##IFRAME##" 
                                            title="##EDM_TITLE##" 
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
	                                        ##MP4##
                                            <video class="jw-video jw-reset" tabindex="-1" style="object-fit: fill; width:##MP4_WIDTH##;height:##MP4_HEIGHT##" controls>
                                            <source src="##MP4##" type="video/mp4">
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

      


        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`, this.convertToEntities( value ) )
            } catch (error) {
                console.log("Error while replaceAll in getThankyou of publishHelper ",error,key,value);
            } 
        }
        return data
    }
    getThankyouDoubleOptinHtml({forPreview}){

    }
    async getPageFiles({forPreview=false,logoDataUrl=null,thumbnailDataUrl=null,state=null}){
        

        this.logoDataUrl=logoDataUrl
        this.thumbnailDataUrl=thumbnailDataUrl
        this.state=state
        
        let files=[]

        files.push({ name:`${ this.state["LINK_NAME"] }-edm.html`, data: await this.getEdmHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-landing.php`, data: await this.getLandingHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-sendemail.php`, data: await this.getSendmailHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-thanks.php`, data: await this.getThanksHtml({forPreview}) })
        // if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        // }else{

        // }
        return files;
    }
}

export default PublishHelper