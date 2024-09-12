 //Dont forget to add extension while importing module
 import {TGIFFormRenderer} from './FormRenderer.js'
 import edm_html from './edm.html.txt?raw'  //?raw is important to read text files
 import landing_html from './landing.php.txt?raw'  //?raw is important to read text files
 import sendemail_html from './sendemail.php.txt?raw'  //?raw is important to read text files
 import thanks_html from './thanks.php.txt?raw'  //?raw is important to read text files
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


    
    getFormCurlApiSendmailMappedData(fields){
      
        return `
        $fields = [
        ${fields.map((field,index)=> { return (field.name)?`    "${field.id}" => "${field.name.replace(/data[\(d+)]/gi,"$1")}",`:''}) }
        ];
        `
    }

    async getEdmHtml({forPreview}){
        let data=edm_html;        
        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,( value ) )
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
        data=data.replaceAll(`##FORM##`, this.getFormHtml(this.state.form,TGIFFormRenderer) )

        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,( value ) )
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

        
        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,( value ) )
            } catch (error) {
                console.log("Error while replaceAll in getSendmailHtml of publishHelper ",error,key,value);
            } 
        }
        return  data
    }
    getThanksHtml({forPreview}){
        let data=thanks_html
        for (const [key, value] of Object.entries(this.state)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,( value ) )
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