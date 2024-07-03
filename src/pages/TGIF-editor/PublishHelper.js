import Utils from "./Utils.js";
import { TGIFFormRenderer } from "./FormRenderer.js";


import {translations} from './translations.js'

export default class PublishHelper{

    
    BASE_URL="https://resource.itbusinesstoday.com/whitepapers/download/"
    YEAR=new Date().getFullYear().toString()
    FTP_CONFIG_NAME="TGIF"

    
    //dont forget to add forward slash "/" at the end
    templatesFolderPath="../template_files/TGIF-FIRST-TOUCH/"

    constructor(){
       // this=tgif
    }

    loadCampData(campData){
        for (const [key, value] of Object.entries(campData)) {
      
            this[key]=value

           // console.log(key,value);
            try{
                document.querySelector(`[name="${key}"`).value=value
            }catch(error){
                console.error("Cannot set to null",key,value);
            }
        }
        console.log(this);
    }

    setFtpConfig(){
        this.FTP_CONFIG_NAME=ftpConfigName
    }

     getBase64(file) {

        return new Promise((resolve,reject)=>{

            const NO_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQJQTFRF////9vb26urq/f39/v7+6enp9/f34uLi1tbW4ODg7u7ura2tqKioq6ur8vLy2tra9fX1w8PD0dHRqampu7u72dnZ1dXV5OTkrKyswcHB5eXlv7+/0NDQsbGxs7Oz4+Pj4eHh6+vrsLCw3d3dtbW1y8vLwsLCxMTEycnJr6+vsrKy3Nzc7Ozsrq6u/Pz87+/v+fn5uLi45ubm+Pj4urq6xcXFysrK8/Pz9PT0qqqqvr6++/v7zMzMxsbGt7e329vb8PDw2NjYyMjItLS0z8/Pubm5x8fH8fHx+vr67e3t1NTUzc3N0tLSzs7OwMDA09PT19fXvb293t7etra239/f6OjoADPkJQAAA8RJREFUeJztl+tTUkEUwM/CFZKHYmoqFErlmAqkNKVFRC81p5ppqv+yaepDD2vsNZUWRphUFORQUhlZiISDyMXbnt17i0Z7KHdqpnE/cA+7d8/v7tk9Z88h8Bca+dsQQkiRCQJZ4gLoaB9ZFFWEGKnCDArVRXEBnxZSYO9UpNSD1OZhwycU6nOGj/TRQLLm2Y1ixRxY3qoHMZCUMQnKSohJqn2D/S2foD6uGqSaJBtfiwqkddoa5QNt7za/UA2yKdo21fxMhgh12ZanfMCaqUmoBrGGK7WbTBN8T3ZOOsLyQNcr2D6uHgS6Y1Q/g3iirSFlxCxpMipCnK9NtiAzl75ixyNlxBXf9kRFCOyOdAQYxBNtfKWMmKXOh2pCemNQ0KO5DBqSk12dGF1j5Xj9MghsTluTuBLtnrDiHduS7pEyGCtAvJl41zj6iS/UfZf1C/seF/LqQsAf1OcRcvAR7L5F/7vrAjzaqAkR/A+BxS5/EBx5e8Qetkck1SBmC/drR2OYm8fZNEp/9bs+luOJ8NtLa+AmwJGh8hD/4GZch6xD1iHrEJUhgwnMs3SSWBLYnSDnXlCVqyzNWNy24TY+pJW07GlM/wmkNp+jyfyWWeDpNm2CKwYHrnCxNeGIKBd9ly0+RR81844gwInbMvanV/SPkK0TmNubCi1B3tP8WSK9w0z0RF3hqve825NLeHQx0pF93BEAOHnrMNMy9NMreiVI0/TRi7zHNtf7QIb4QqLQPsbEKkmqnGGSdQ998fgddkv/oq0EWdLYn7OOnmd9qSCHeJdMybhux32O7rpXMm1tkIVDo/kCn17XLENOXxcXfKGGScAEQ7+l9D5eI8QbZMmQO94S8cqQfRNCumG+7wIVD42Zp0tVrA2S612K4tZ3vtGl/BxCjDQx1tZn5+np3j+uo+WdO4JTOsdx43uqqDh3c3WQYv8Ibv2Za0JahmwQ8GsPBzBV6h/BI64x4JSmGELY7IHzq4RoDD03wDFDzSJDkIfHeOMUrgRLSC89vOZFNOsazVUEeypf8IVoAckhBo1jK32heBt8V+HUcPU7PuHsUFmQU8PdXxLVU6IMOflNi/8yDN7VF9NqQHa91FemcQMYhIYUganVGKS8CH2jtpdqQKCGOsriogzxRJWiqz1BQ8vAk6yuHd2SrrcsiDUD7HMZxBdS1Bx9gKHFGSewVzcpfkDrKUcYZu4tV78cYnYGqPp2C1ZV1EKD5wA9/eAlMINWDuNy+WVxPcdo6HnhGcL18LHvdeyvIKtpx25Qxp/Wkf/P9fsVAGO0QhHG300AAAAASUVORK5CYII="
            try{
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                
                  resolve(reader.result)
                };
                reader.onerror = function (error) {
                    resolve(NO_IMAGE)
                    
                };
            }catch(error){
                resolve(NO_IMAGE)
            }
        


        })
        
     }
     

    async  getEdmHtml(forPreview=false){
        let data=await Utils.loadFile(this.templatesFolderPath+"edm.html.txt");

        if(forPreview==true){

            const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0]
            const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0]
           
          if(logoFile){
            const base64Logo= await this.getBase64( logoFile )
            data=data.replaceAll(`##LOGO_URL##`,base64Logo)
          }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
          }

          if(thumbnailFile){
            const base64Thumbnail= await this.getBase64( thumbnailFile )
            data=data.replaceAll(`##THUMBNAIL_URL##`,base64Thumbnail)
          }else{
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
          }
          
        }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
        }



       const languageCode=this["LANGUAGE"]

        console.log("===",translations);
       //data=data.replaceAll(`##EDM_OPTIN##`,translations[languageCode]['edmOptin'])
       data=data.replaceAll(`##EDM_OPTIN##`,this['EDM_OPTIN'])


       switch(this["REGION"]){
        case "EU":
            data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/eu-data-protection/">Privacy Policy</a>`)
            break;
        case "NON-EU":
            data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`)
            break;
        case "CASL":
            data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`)
            break;
        case "BOTH":
            data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a> | <a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>
            `)
            break;
        default:
            data=data.replaceAll(`##PRIVACY##`,`<b style='color:red;'>NO PRIVACY SELECTED</b>`)
            break


       }





       
      
        for (const [key, value] of Object.entries(this)) {
        
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

        

        const landing_page=(this.useNewLandingPageFormat)?"new_format_landing.php.txt":"landing.php.txt"
        let data= await Utils.loadFile( this.templatesFolderPath+landing_page) ;
        
        
        if(this["SAME_AS_EDM_TITLE"]==true){ 
            data=data.replaceAll(`##LANDING_TITLE##`,this["EDM_TITLE"])
        }

        if(this["SAME_AS_EDM_ABSTRACT"]==true){
            data=data.replaceAll(`##LANDING_ABSTRACT##`,this["EDM_ABSTRACT"])
        }

        

        if(this["SAME_AS_EDM_CTA"]==true){
            data=data.replaceAll(`##LANDING_CTA##`,this["EDM_CTA"])
        }




        switch(this["REGION"]){
            case "EU":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/eu-data-protection/">Privacy Policy</a>`)
                break;
            case "NON-EU":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`)
                break;
            case "CASL":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`)
                break;
            case "BOTH":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a> | <a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>
                `)
                break;
            default:
                data=data.replaceAll(`##PRIVACY##`,`<b style='color:red;'>NO PRIVACY SELECTED</b>`)
                break
    
    
           }

        
       


        if(this["NEW_LANDING_PAGE_FORMAT"]==true){
            data=data.replaceAll(`##BODY##`,` <div class="sub" align="center" style="background-color: #e2ebf3; margin-top: 30px; margin-left: 13px; display: inline-flex; padding: 10px; width: 250px;">
            <p style="text-align: left; margin-top: 10px;">${this["NEW_LANDING_PAGE_FORMAT_BOX_TEXT"]}</p>
            <p><img src="##BASE_URL##Arrow-pr.png" alt="Arrow" style="width: 50px; margin-top: 30px;" /></p>
        </div>`)
            data=data.replaceAll(`##BODY##`,``)
        }else{
            data=data.replaceAll(`##BODY##`,`<p style="font-size: 14px; line-height: 1.5; color: #505050;">${ (this["LANDING_ABSTRACT"])?this["LANDING_ABSTRACT"]:this["EDM_ABSTRACT"] }</p>`)
        }
       
        if(forPreview==true){

            const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0]
            const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0]
           
          if(logoFile){
            const base64Logo= await this.getBase64( logoFile )
            data=data.replaceAll(`##LOGO_URL##`,base64Logo)
          }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
          }

          if(thumbnailFile){
            const base64Thumbnail= await this.getBase64( thumbnailFile )
            data=data.replaceAll(`##THUMBNAIL_URL##`,base64Thumbnail)
          }else{
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
          }
          
        }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
        }

        const formHtml=Utils.getFormHtml(this.form,TGIFFormRenderer);

        

        if(typeof formHtml === 'string' || formHtml instanceof String)
        data=data.replaceAll(`##FORM##`,Utils.convertToEntities( formHtml ))
        for (const [key, value] of Object.entries(this)) {
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
        let data=await Utils.loadFile(this.templatesFolderPath+"sendemail.php.txt");


        if(forPreview==true){
            //Remove sendmail redirect
            data=data.replaceAll(`window.location.href = '##BASE_URL####LINK_NAME##-thanks.php';`,"" )
            
        }
        if(this["ASSET_FORMAT"]=='PDF'){
            data=data.replaceAll(`##ASSET_URL##`, this["BASE_URL"]+this["PDF"])
        }else  if(this["ASSET_FORMAT"]=='MP4'){
            data=data.replaceAll(`##ASSET_URL##`, this["BASE_URL"]+this["MP4"])
        }else  if(this["ASSET_FORMAT"]=='Client Link'){
            data=data.replaceAll(`##ASSET_URL##`, this["CLIENT_LINK"] )
        }else  if(this["ASSET_FORMAT"]=='IFrame'){
            data=data.replaceAll(`##ASSET_URL##`, this["IFRAME"] )
        }


      
        for (const [key, value] of Object.entries(this)) {
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

        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.php.txt");

        if(this["ASSET_FORMAT"]=='MP4' || this["ASSET_FORMAT"]=='IFrame'){
            data=data.replaceAll(`header( "refresh:5;url=##ASSET_URL##" );`,"" ) //remove redirect
           

            if(this["ASSET_FORMAT"]=='MP4'){
                data=data.replaceAll(`##BODY##`,`
                <!-- For Webinar -->
                <td colspan="2">
                <div style="font-size:18px;">##EDM_TITLE##</div><br>
                <video width="100%" height="480" controls>
                <source src="${this["MP4"]}" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                </td>`)
            }

            if(this["ASSET_FORMAT"]=='IFrame'){
                data=data.replaceAll(`##BODY##`,`
                <!-- For Webinar -->
                <td colspan="2">
                <div style="font-size:18px;">##EDM_TITLE##</div><br>
                <iframe src="${this["IFRAME"]}" width="100%" height="380" title="##EDM_TITLE##"></iframe>
                </td>`)
            }
        }else{

            const languageCode=this["LANGUAGE"]
            console.log("===",translations);
           
            data=data.replaceAll(`##BODY##`,` <!-- For PDF / URL -->
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img   style=" height: auto !important;" alt="##EDM_TITLE##" src="##THUMBNAIL_URL##" width="180" style="border: 1px solid #c4c5c600;" />
                                    </td>

                                    <td align="left" valign="top" class="style1 thankyou">
                                        <!--<h1 style="color: #0066b2; font: 20px 'Noto Sans', sans-serif; margin: 0 0 10px 0; padding: 0;">Thank you...</h1>
                                        <span style="font-size: 14px; line-height: 1.6;">
                                            for downloading <strong>"##EDM_TITLE##"</strong> <br />
                                            <br />
                                            Your download will automatically start in <span id="countdown">5</span> seconds...<br />
                                            If your download doesn't start automatically, <a  href="##ASSET_URL##">click here</a> to start your download.
                                        </span>-->

                                        ##THANKYOU##

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
                                    </td>`);

            data=data.replaceAll(`##THANKYOU##`,translations[languageCode]['thankyou'])
        }
       
        


        switch(this["REGION"]){
            case "EU":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/eu-data-protection/">Privacy Policy</a>`)
                break;
            case "NON-EU":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`)
                break;
            case "CASL":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`)
                break;
            case "BOTH":
                data=data.replaceAll(`##PRIVACY##`,`<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a> | <a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>
                `)
                break;
            default:
                data=data.replaceAll(`##PRIVACY##`,`<b style='color:red;'>NO PRIVACY SELECTED</b>`)
                break;
    
           }


        
           if(forPreview==true){

            const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0]
            const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0]
           
          if(logoFile){
            const base64Logo= await this.getBase64( logoFile )
            data=data.replaceAll(`##LOGO_URL##`,base64Logo)
          }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
          }

          if(thumbnailFile){
            const base64Thumbnail= await this.getBase64( thumbnailFile )
            data=data.replaceAll(`##THUMBNAIL_URL##`,base64Thumbnail)
          }else{
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
          }
          
        }else{
            data=data.replaceAll(`##LOGO_URL##`,this["BASE_URL"]+"logo/"+this["LOGO_NAME"])
            data=data.replaceAll(`##THUMBNAIL_URL##`,this["BASE_URL"]+this["THUMBNAIL_NAME"])
        }


       

        if(this["ASSET_FORMAT"]=='PDF'){
            data=data.replaceAll(`##ASSET_URL##`, this["BASE_URL"]+this["PDF"] )
        }else  if(this["ASSET_FORMAT"]=='MP4'){
            data=data.replaceAll(`##ASSET_URL##`, this["BASE_URL"]+this["MP4"]  )
        }else  if(this["ASSET_FORMAT"]=='Client Link'){
            data=data.replaceAll(`##ASSET_URL##`, this["CLIENT_LINK"] )
        }else  if(this["ASSET_FORMAT"]=='IFrame'){
            data=data.replaceAll(`##ASSET_URL##`, this["IFRAME"] )
        }


        
        for (const [key, value] of Object.entries(this)) {
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
                name:`${this.LINK_NAME}-landing.php`,
                data:(preview==0) && await this.getLandingHtml(),
                preview:(preview==1) && await this.getLandingHtml(true)
            },
            {
                name:`${this.LINK_NAME}-sendemail.php`,
                data:(preview==0) && await this.getSendemailHtml(),
                preview:(preview==1) && await this.getSendemailHtml(true)
            },
            {
                name:`${this.LINK_NAME}-thanks.php`,
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
                return await this.getLandingHtml(true);    
            case "sendemail":
                return await this.getSendemailHtml(true);    
            case "thanks":
                return await this.getThanksHtml(true);    
        }
    }

    async generateZip(JSZip,saveAs){
        var zip = new JSZip();
        zip.file(`${this.LINK_NAME}-edm.html`, await this.getEdmHtml());
        zip.file(`${this.LINK_NAME}-landing.php`, await this.getLandingHtml());
        zip.file(`${this.LINK_NAME}-sendemail.php`, await this.getSendemailHtml());
        zip.file(`${this.LINK_NAME}-thanks.php`, await this.getThanksHtml());
        
        const logoFile=document.querySelector("[name='LOGO_FILE']")?.files[0];
        if(logoFile){
            zip.file(`${this["LOGO_NAME"]}`, logoFile );
        }

        const thumbnailFile=document.querySelector("[name='THUMBNAIL_FILE']")?.files[0];
        if(thumbnailFile){
            zip.file(`${this["THUMBNAIL_NAME"]}`, thumbnailFile );
        }



        if(this["ASSET_FORMAT"]=="PDF" ){
            try{
                zip.file(`${this["PDF"]}`, document.querySelector("[name='PDF_FILE']").files[0] );
            }catch(error){
                console.log(error);
            }
           
        }else if(this["ASSET_FORMAT"]=="MP4"){
            try{
                zip.file(`${this["MP4"]}`, document.querySelector("[name='MP4_FILE']").files[0] );
            }catch(error){
                console.log(error);
            }
        }

   

        zip.generateAsync({ type: "blob" }).then( (blob) =>{ // 1) generate the zip file
            saveAs(blob, `${this.LINK_NAME}`);                          // 2) trigger the download
        }, (err)=> {
            alert(error)
        });
    }

}