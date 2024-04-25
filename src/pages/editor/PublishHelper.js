import Utils from "./Utils.js";
import { TGIFFormRenderer } from "./FormRenderer.js";
export default class PublishHelper{
    
    //dont forget to add forward slash "/" at the end
    templatesFolderPath="./template_files/TGIF-FIRST-TOUCH/"

    constructor(){
       // this.tgif=tgif
    }

    setData(data){
        this.tgif=data
    }

    async  getEdmHtml(forPreview=false){
        let data=await Utils.loadFile(this.templatesFolderPath+"edm.html");

        data=data.replaceAll(`##LOGO_URL##`,this.tgif["BASE_URL"]+this.tgif["LOGO_NAME"])
        data=data.replaceAll(`##THUMBNAIL_URL##`,this.tgif["BASE_URL"]+this.tgif["THUMBNAIL_NAME"])
      
        for (const [key, value] of Object.entries(this.tgif)) {
        
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
            } catch (error) {
                console.log(error,key,value);
            } 
        }

        return data;
    }

    async getLandingHtml(forPreview=false){

        

        const landing_page=(this.tgif.useNewLandingPageFormat)?"new_format_landing.php":"landing.php"
        let data= await Utils.loadFile( this.templatesFolderPath+landing_page) ;
        
        
        if(this.tgif["SAME_AS_EDM_TITLE"]==true){ 
            data=data.replaceAll(`##LANDING_TITLE##`,this.tgif["EDM_TITLE"])
        }

        if(this.tgif["SAME_AS_EDM_ABSTRACT"]==true){
            data=data.replaceAll(`##LANDING_ABSTRACT##`,this.tgif["EDM_ABSTRACT"])
        }

        if(this.tgif["SAME_AS_EDM_CTA"]==true){
            data=data.replaceAll(`##LANDING_CTA##`,this.tgif["EDM_CTA"])
        }
       
        data=data.replaceAll(`##LOGO_URL##`,this.tgif["BASE_URL"]+this.tgif["LOGO_NAME"])
        data=data.replaceAll(`##THUMBNAIL_URL##`,this.tgif["BASE_URL"]+this.tgif["THUMBNAIL_NAME"])

        const formHtml=Utils.getFormHtml(this.tgif.form,TGIFFormRenderer);

        

        if(typeof formHtml === 'string' || formHtml instanceof String)
        data=data.replaceAll(`##FORM##`,Utils.convertToEntities( formHtml ))
        for (const [key, value] of Object.entries(this.tgif)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
            } catch (error) {
                console.log(error,key,value,"in getLanding Html");
            }
        }
        return data;
    }

    async getSendemailHtml(forPreview=false){
        let data=await Utils.loadFile(this.templatesFolderPath+"sendemail.php");
        if(this.tgif.assetFormat=="ClientLink") {
            data=data.replaceAll(`##baseUrl####asset##`,this.tgif.clientLink )
        }
        for (const [key, value] of Object.entries(this.tgif)) {
            try {
                if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
            } catch (error) {
                console.log(error,key,value,"in getSendemail Html");
            }
        }
        return data;
    }

    async getThanksHtml(forPreview=false){



        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.php");
        if(this.tgif.assetFormat=="MP4" || this.tgif.assetFormat=="IFrame") {
            data=data.replaceAll(`header( "refresh:5;url=##baseUrl####asset##" );`,"" ) //remove redirect
        }
       // data=data.replaceAll(`##thankyouContentHtml##`,Utils.convertToEntities(this.tgif.thankyouContentHtml) )
        
       data=data.replaceAll(`##LOGO_URL##`,this.tgif["BASE_URL"]+this.tgif["LOGO_NAME"])
       data=data.replaceAll(`##THUMBNAIL_URL##`,this.tgif["BASE_URL"]+this.tgif["THUMBNAIL_NAME"])

        for (const [key, value] of Object.entries(this.tgif)) {
           try {
            if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
            } catch (error) {
                console.log(error,key,value,"in getThankyou Html");
            }
        }
        return data;
    }


    async getFiles(preview=0){
        return [
            {
                name:`${this.tgif.LINK_NAME}-edm.html`,
                data:(preview==0) && await this.getEdmHtml(),
                preview:(preview==1) && await this.getEdmHtml(true) 
            },
            {
                name:`${this.tgif.LINK_NAME}-landing.php`,
                data:(preview==0) && await this.getLandingHtml(),
                preview:(preview==1) && await this.getLandingHtml(true)
            },
            {
                name:`${this.tgif.LINK_NAME}-sendemail.php`,
                data:(preview==0) && await this.getSendemailHtml(),
                preview:(preview==1) && await this.getSendemailHtml(true)
            },
            {
                name:`${this.tgif.LINK_NAME}-thanks.php`,
                data:(preview==0) && await this.getThanksHtml(),
                preview:(preview==1) && await this.getThanksHtml()
            }
        ]
    }

    getPreviewPages(){
        return ["edm","landing","sendemail","thanks"]
    }
    async getPreview(page){
        switch(page){
            case "edm":
                return await this.getEdmHtml(true);    
            case "landing":
                return await  this.getLandingHtml(true);    
            case "sendemail":
                return await this.getSendemailHtml(true);    
            case "thanks":
                return await this.getThanksHtml(true);    
        }
    }

    async generateZip(JSZip,saveAs){
        var zip = new JSZip();
        zip.file(`${this.tgif.LINK_NAME}-edm.html`, await this.getEdmHtml());
        zip.file(`${this.tgif.LINK_NAME}-landing.php`, await this.getLandingHtml());
        zip.file(`${this.tgif.LINK_NAME}-sendemail.php`, await this.getSendemailHtml());
        zip.file(`${this.tgif.LINK_NAME}-thanks.php`, await this.getThanksHtml());
        
        const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0];
        if(logoFile){
            zip.file(`${this.tgif.logoName}`, logoFile );
        }

        const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0];
        if(thumbnailFile){
            zip.file(`${this.tgif.thumbnail}`, thumbnailFile );
        }


        try{
            zip.file(`${this.tgif["PDF"]}`, document.querySelector("[name='PDF_FILE']").files[0] );
        }catch(error){
            console.log(error);
        }
       
  

        try{
            zip.file(`${this.tgif["MP4"]}`, document.querySelector("[name='MP4_FILE']").files[0] );
        }catch(error){
            console.log(error);
        }

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${this.tgif.LINK_NAME}`);                          // 2) trigger the download
        }, (err)=> {
            alert(error)
        });
    }

}