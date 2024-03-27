import Utils from "./Utils.js";
import { TGIFFormRenderer } from "./FormRenderer.js";
export default class PublishHelper{
    
    //templatesFolderPath="../src/templates/TGIF-NON-EU/"

    templatesFolderPath="./tgif/template_files/"

    constructor(){
       // this.tgif=tgif
    }

    setData(data){
        this.tgif=data
    }

 

    async  getEdmHtml(){

       

        let data=await Utils.loadFile(this.templatesFolderPath+"edm.t");
       
        for (const [key, value] of Object.entries(this.tgif)) {
         
           
            try {
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
            } catch (error) {
                console.log(error,key,value);
            }
                
            
           
        }

        return data;
    }

    async getLandingHtml(){
        const landing_page=(this.tgif.useNewLandingPageFormat)?"new_format_landing.t":"landing.t"
        
        let data= await Utils.loadFile( this.templatesFolderPath+landing_page) ;

           
        data=data.replaceAll(`##form##`,Utils.convertToEntities(Utils.getFormHtml(this.tgif.form,TGIFFormRenderer)))

       
        for (const [key, value] of Object.entries(this.tgif)) {
         
            try {
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
            } catch (error) {
                console.log(error,key,value,"in getLanding Html");
            }
           
        }

        return data;
    }

    async getSendemailHtml(){
        let data=await Utils.loadFile(this.templatesFolderPath+"sendemail.t");
       

        if(this.tgif.assetFormat=="ClientLink") {
            
            data=data.replaceAll(`##baseUrl####asset##`,this.tgif.clientLink )
        }


        for (const [key, value] of Object.entries(this.tgif)) {
            console.log(key);

            try {
                data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
            } catch (error) {
                console.log(error,key,value,"in getSendemail Html");
            }
           
        }

        return data;
    }

    async getThanksHtml(){
        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.t");
       

        if(this.tgif.assetFormat=="MP4" || this.tgif.assetFormat=="IFrame") {
            
            data=data.replaceAll(`header( "refresh:5;url=##baseUrl####asset##" );`,"" ) //remove redirect
        }

       // data=data.replaceAll(`##thankyouContentHtml##`,Utils.convertToEntities(this.tgif.thankyouContentHtml) )
        

        for (const [key, value] of Object.entries(this.tgif)) {
           console.log(key);

           try {
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
                return await this.getEdmHtml();    
            
            case "landing":
                return await  this.getLandingHtml();    
         
            case "sendemail":
                return await this.getSendemailHtml();    

            case "thanks":
                return await this.getThanksHtml();    

        }
    }


    async openPreview(page){
        let winHtml=""
        switch(page){
            case "edm":
            winHtml=await this.getEdmHtml();    
            break;
            case "landing":
            winHtml=await  this.getLandingHtml();    
            break;
            case "sendemail":
            winHtml=await this.getSendemailHtml();    
            break;
            case "thanks":
            winHtml=await this.getThanksHtml();    
            break;
        }
        const winUrl = URL.createObjectURL(
            new Blob([winHtml], { type: "text/html" })
        );
        let newwindow = window.open(winUrl, 'LandingPage', 'height=500,width=1000');
        newwindow.addEventListener('load', async () => {
            try {
                newwindow.document.getElementById("splogo").src=await Utils.fileToBase64(document.querySelector("[name='logofile']").files[0])

            } catch (error) {
                console.log("Cannot base encode logo",error);
            }


            
        
            try {
                newwindow.document.getElementById("thumbnail").src=await Utils.fileToBase64(document.querySelector("[name='thumbnailfile']").files[0])

            } catch (error) {
                console.log("Cannot base encode thumbnail",error);
            }
            console.log();
        }, false);
        if (window.focus) { newwindow.focus() }

        
    }


    async generateZip(JSZip,saveAs){
      
        var zip = new JSZip();
        zip.file(`${this.tgif.linkName}-edm.html`, await this.getEdmHtml());
        zip.file(`${this.tgif.linkName}-landing.php`, await this.getLandingHtml());
        zip.file(`${this.tgif.linkName}-sendemail.php`, await this.getSendemailHtml());
        zip.file(`${this.tgif.linkName}-thanks.php`, await this.getThanksHtml());
        


        if(document.querySelector("[name='logofile']").files[0]){
            zip.file(`${this.tgif.logoName}`, document.querySelector("[data-file='logoName']").files[0] );
        }

        if(document.querySelector("[name='thumbnailfile']").files[0]){
            zip.file(`${this.tgif.thumbnail}`, document.querySelector("[data-file='thumbnail']").files[0] );
        }

        if(document.querySelector("[name='pdf']") && document.querySelector("[name='pdf']").files[0] && (this.tgif.assetFormat=="PDF") ){
            zip.file(`${this.tgif.asset}`, document.querySelector("[data-file='asset']").files[0] );
        }

        if(document.querySelector("[name='mp4']") && document.querySelector("[name='mp4']").files[0] && ( this.tgif.assetFormat=="MP4") ){
            zip.file(`${this.tgif.asset}`, document.querySelector("[data-file='asset']").files[0] );
        }

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${this.tgif.linkName}`);                          // 2) trigger the download
        }, (err)=> {
            alert(error)
        });
    }

}