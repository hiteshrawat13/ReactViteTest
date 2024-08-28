 //Dont forget to add extension while importing module
 import {ARCFormRenderer} from './FormRenderer.js'
 import edm_html from './edm.html.txt?raw'  //?raw is important to read text files
 import landing_html from './landing.html.txt?raw'  //?raw is important to read text files
 import sendemail_html from './sendemail.php.txt?raw'  //?raw is important to read text files
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

    async getEdmHtml({forPreview}){
        let data=edm_html;

        // for (const [key, value] of Object.entries(this.state)) {
        //     try {
        //         if(typeof value === 'string' || value instanceof String)
        //         data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
        //     } catch (error) {
        //         console.log("Error while replaceAll in getEdmHtml() of publishHelper ",error,key,value);
        //     } 
        // }
        return data
    }
    getLandingHtml({forPreview}){        
        return JSON.stringify(this.thumbnailDataUrl)+" "+JSON.stringify(this.state)
    }
    getSendmailHtml({forPreview}){

        // for (const [key, value] of Object.entries(this.state)) {
        //     try {
        //         if(typeof value === 'string' || value instanceof String)
        //         data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
        //     } catch (error) {
        //         console.log("Error while replaceAll in getSendmailHtml() of publishHelper ",error,key,value);
        //     } 
        // }

        return sendemail_html
    }
    getThankyouHtml({forPreview}){
        return "thankyou"
    }
    getThankyouDoubleOptinHtml({forPreview}){

    }
    async getPageFiles({forPreview=false,logoDataUrl=null,thumbnailDataUrl=null,state=null}){
        

        this.logoDataUrl=logoDataUrl
        this.thumbnailDataUrl=thumbnailDataUrl
        this.state=state
        
        let files=[]

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