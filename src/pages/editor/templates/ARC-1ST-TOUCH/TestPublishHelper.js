 //Dont forget to add extension while importing module
 import {ARCFormRenderer} from './FormRenderer.js'
 import edm_html from './edm.html.txt?raw'  //?raw is important to read text files
 import landing_html from './landing.html.txt?raw'  //?raw is important to read text files
 import sendemail_html from './sendemail.php.txt?raw'  //?raw is important to read text files
class PublishHelper{
    constructor(state){
        this.state=state
    }
    setState(state){
        this.state=state
    }

    async getEdmHtml({forPreview}){
        let data=edm_html;
        return data
    }
    getLandingHtml({forPreview}){
        return landing_html 
    }
    getSendmailHtml({forPreview}){
        return sendemail_html
    }
    getThankyouHtml({forPreview}){
        return "thankyou"
    }
    getThankyouDoubleOptinHtml({forPreview}){

    }
    async getPageFiles({forPreview=false}){
        let files=[]

         
        console.log(this.state,"====================");
        
        files.push({ name:`${ this.state["LINK_NAME"] }-edm.html`, data: await this.getEdmHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-landing.html`, data: await this.getLandingHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-sendemail.php`, data: await this.getSendmailHtml({forPreview}) })
        files.push({ name:`${ this.state["LINK_NAME"] }-thanks.html`, data: await this.getThankyouHtml({forPreview}) })
        // if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        // }else{

        // }
        return files;
    }
}

export default PublishHelper