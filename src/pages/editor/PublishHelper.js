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

        // if(forPreview){
        //     try {
        //         const dataUrl=await Utils.fileToBase64(document.querySelector("[name='THUMBNAIL_FILE']").files[0])
        //         data=data.replaceAll(`##THUMBNAIL_URL##`,dataUrl)
        //     } catch (error) {
        //         console.log("Cannot base encode logo",error);
        //     }
        // }else{
        //     data=data.replaceAll(`##THUMBNAIL_URL##`,tgif["THUMBNAIL_NAME"])
        // }
       

       

        data=data.replaceAll(`##THUMBNAIL_URL##`,this.tgif["THUMBNAIL_NAME"])
           
        const formHtml=Utils.getFormHtml(this.tgif.form,TGIFFormRenderer);
        if(typeof formHtml === 'string' || formHtml instanceof String)
        data=data.replaceAll(`##form##`,Utils.convertToEntities( formHtml ))

       
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


    // async openPreview(page){
    //     let winHtml=""
    //     switch(page){
    //         case "edm":
    //         winHtml=await this.getEdmHtml();    
    //         break;
    //         case "landing":
    //         winHtml=await  this.getLandingHtml();    
    //         break;
    //         case "sendemail":
    //         winHtml=await this.getSendemailHtml();    
    //         break;
    //         case "thanks":
    //         winHtml=await this.getThanksHtml();    
    //         break;
    //     }
    //     const winUrl = URL.createObjectURL(
    //         new Blob([winHtml], { type: "text/html" })
    //     );
    //     let newwindow = window.open(winUrl, 'LandingPage', 'height=500,width=1000');
    //     newwindow.addEventListener('load', async () => {
    //         try {
    //             newwindow.document.getElementById("splogo").src=await Utils.fileToBase64(document.querySelector("[name='logofile']").files[0])
    //         } catch (error) {
    //             console.log("Cannot base encode logo",error);
    //         }


            
        
    //         try {
    //             newwindow.document.getElementById("thumbnail").src=await Utils.fileToBase64(document.querySelector("[name='thumbnailfile']").files[0])

    //         } catch (error) {
    //             console.log("Cannot base encode thumbnail",error);
    //         }
    //         console.log();
    //     }, false);
    //     if (window.focus) { newwindow.focus() }    
    // }


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

        const pdfFile=document.querySelector("[name='PDF']")?.files[0];
        // if(document.querySelector("[name='PDF']") && document.querySelector("[name='PDF']").files[0] && (this.tgif.assetFormat=="PDF") ){
        //     zip.file(`${this.tgif.asset}`, document.querySelector("[data-file='asset']").files[0] );
        // }

        const mp4File=document.querySelector("[name='mp4']")?.files[0]
        // if(document.querySelector("[name='MP4']") && document.querySelector("[name='mp4']").files[0] && ( this.tgif.assetFormat=="MP4") ){
        //     zip.file(`${this.tgif.asset}`, document.querySelector("[data-file='asset']").files[0] );
        // }

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${this.tgif.LINK_NAME}`);                          // 2) trigger the download
        }, (err)=> {
            alert(error)
        });
    }

}