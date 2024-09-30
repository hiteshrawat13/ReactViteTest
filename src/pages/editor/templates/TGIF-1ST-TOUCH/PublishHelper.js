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
        
        data= this.convertToEntities( this.getPrivacyPolicy(data)  ) //Privacy Policy
        
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
            if(this.logoDataUrl)data=data.replaceAll(`##BASE_URL####LOGO_NAME##`, this.logoDataUrl )
            if(this.thumbnailDataUrl)data=data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, this.thumbnailDataUrl )
        }

        data=this.getPrivacyPolicy(data) //Privacy Policy

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


        const normal_thankyou=`\t${this.state["THANK_YOU_PAGE"]}\n`

        const iframe_thankyou=`
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h3>##EDM_TITLE##</h3>
	                                        ##IFRAME##
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