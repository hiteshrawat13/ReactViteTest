import Utils from "./Utils.js";
import { ALPHAFormRenderer } from "./FormRenderer.js";
export default class PublishHelper{
    
    //dont forget to add forward slash "/" at the end
    templatesFolderPath="./template_files/ALPHA/"

    constructor(){
       // this.alpha=alpha
    }

    setData(data){
        this.alpha=data
    }

    async  getEdmHtml(forPreview=false){
        let data=await Utils.loadFile(this.templatesFolderPath+"edm.html");

        data=data.replaceAll(`##THUMBNAIL_URL##`,this.alpha["BASE_URL"]+this.alpha["THUMBNAIL_NAME"])

        data=data.replaceAll(`##LOGO_URL##`,this.alpha["BASE_URL"]+this.alpha["LOGO_NAME"])

        for (const [key, value] of Object.entries(this.alpha)) {
        
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
        const landing_page=(this.alpha.useNewLandingPageFormat)?"new_format_landing.html":"landing.html"
        let data= await Utils.loadFile( this.templatesFolderPath+landing_page) ;

        // if(forPreview){
        //     try {
        //         const dataUrl=await Utils.fileToBase64(document.querySelector("[name='THUMBNAIL_FILE']").files[0])
        //         data=data.replaceAll(`##THUMBNAIL_URL##`,dataUrl)
        //     } catch (error) {
        //         console.log("Cannot base encode logo",error);
        //     }
        // }else{
        //     data=data.replaceAll(`##THUMBNAIL_URL##`,alpha["THUMBNAIL_NAME"])
        // }
       
        if(this.alpha["SAME_AS_EDM_TITLE"]==true){
            data=data.replaceAll(`##LANDING_TITLE##`,this.alpha["EDM_TITLE"])
        }
        if(this.alpha["SAME_AS_EDM_HEADING"]==true){
            data=data.replaceAll(`##LANDING_HEADING##`,this.alpha["EDM_HEADING"])
        }
        if(this.alpha["SAME_AS_EDM_CTA"]==true){
            data=data.replaceAll(`##LANDING_CTA##`,this.alpha["EDM_CTA"])
        }
       

        data=data.replaceAll(`##THUMBNAIL_URL##`,this.alpha["BASE_URL"]+this.alpha["THUMBNAIL_NAME"])
           
        const formHtml=Utils.getFormHtml(this.alpha.form,ALPHAFormRenderer);
        if(typeof formHtml === 'string' || formHtml instanceof String)
        data=data.replaceAll(`##form##`,Utils.convertToEntities( formHtml ))

       
        for (const [key, value] of Object.entries(this.alpha)) {
         
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
       
        if(this.alpha.assetFormat=="ClientLink") {
            data=data.replaceAll(`##baseUrl####asset##`,this.alpha.clientLink )
        }

        for (const [key, value] of Object.entries(this.alpha)) {
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
        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.html");
       
        if(this.alpha["SAME_AS_EDM_TITLETY"]==true){
            data=data.replaceAll(`##THANKYOU_TITLE##`,this.alpha["EDM_TITLE"])
        }
        if(this.alpha["SAME_AS_EDM_HEADINGTY"]==true){
            data=data.replaceAll(`##THANKYOU_HEADING##`,this.alpha["EDM_HEADING"])
        }


        if(this.alpha.assetFormat=="MP4" || this.alpha.assetFormat=="IFrame") {
            
            data=data.replaceAll(`header( "refresh:5;url=##baseUrl####asset##" );`,"" ) //remove redirect
        }

       // data=data.replaceAll(`##thankyouContentHtml##`,Utils.convertToEntities(this.alpha.thankyouContentHtml) )
        

        for (const [key, value] of Object.entries(this.alpha)) {
           try {
            if(typeof value === 'string' || value instanceof String)
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
            } catch (error) {
                console.log(error,key,value,"in getThankyou Html");
            }
        }
        return data;
    }


    async getThanks2Html(forPreview=false){
        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.html");
       
        if(this.alpha["SAME_AS_EDM_TITLETY"]==true){
            data=data.replaceAll(`##THANKYOU_TITLE##`,this.alpha["EDM_TITLE"])
        }
        if(this.alpha["SAME_AS_EDM_HEADINGTY"]==true){
            data=data.replaceAll(`##THANKYOU_HEADING##`,this.alpha["EDM_HEADING"])
        }


        if(this.alpha.assetFormat=="MP4" || this.alpha.assetFormat=="IFrame") {
            
            data=data.replaceAll(`header( "refresh:5;url=##baseUrl####asset##" );`,"" ) //remove redirect
        }

       // data=data.replaceAll(`##thankyouContentHtml##`,Utils.convertToEntities(this.alpha.thankyouContentHtml) )
        

        for (const [key, value] of Object.entries(this.alpha)) {
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
                name:`${this.LINK_NAME}-edm.html`,
                data:(preview==0) && await this.getEdmHtml(),
                preview:(preview==1) && await this.getEdmHtml(true) 
            },
            {
                name:`${this.LINK_NAME}-landing.html`,
                data:(preview==0) && await this.getLandingHtml(),
                preview:(preview==1) && await this.getLandingHtml(true)
            },
            {
                name:`${this.LINK_NAME}-sendemail.php`,
                data:(preview==0) && await this.getSendemailHtml(),
                preview:(preview==1) && await this.getSendemailHtml(true)
            },
            {
                name:`${this.LINK_NAME}-thanks.html`,
                data:(preview==0) && await this.getThanksHtml(),
                preview:(preview==1) && await this.getThanksHtml()
            },
            {
                name:`${this.LINK_NAME}-thanks2.html`,
                data:(preview==0) && await this.getThanks2Html(),
                preview:(preview==1) && await this.getThanks2Html()
            }
        ]
    }

    getPreviewPages(){
        return ["edm","landing","sendemail","thanks","thanks2"]
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
            case "thanks2":
                    return await this.getThanks2Html(true);    
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
        zip.file(`${this.alpha.LINK_NAME}-edm.html`, await this.getEdmHtml());
        zip.file(`${this.alpha.LINK_NAME}-landing.html`, await this.getLandingHtml());
        zip.file(`${this.alpha.LINK_NAME}-sendemail.php`, await this.getSendemailHtml());
        zip.file(`${this.alpha.LINK_NAME}-thanks.html`, await this.getThanksHtml());
        
        const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0];
        if(logoFile){
            zip.file(`${this.alpha.logoName}`, logoFile );
        }

        const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0];
        if(thumbnailFile){
            zip.file(`${this.alpha.thumbnail}`, thumbnailFile );
        }

        const pdfFile=document.querySelector("[name='PDF']")?.files[0];
        // if(document.querySelector("[name='PDF']") && document.querySelector("[name='PDF']").files[0] && (this.alpha.assetFormat=="PDF") ){
        //     zip.file(`${this.alpha.asset}`, document.querySelector("[data-file='asset']").files[0] );
        // }

        const mp4File=document.querySelector("[name='mp4']")?.files[0]
        // if(document.querySelector("[name='MP4']") && document.querySelector("[name='mp4']").files[0] && ( this.alpha.assetFormat=="MP4") ){
        //     zip.file(`${this.alpha.asset}`, document.querySelector("[data-file='asset']").files[0] );
        // }

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${this.alpha.LINK_NAME}`);                          // 2) trigger the download
        }, (err)=> {
            alert(error)
        });
    }

}