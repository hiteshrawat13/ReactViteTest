
const Publish={
 
    tgif:null,
    a:11,
    preview:function(){
        alert(this.a)
    },

    setr:function (dd){
        this.a=dd
    },
    convertToEntities:function(str) {
        var tstr = str;
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
      },


    getEdmHtml:async function(){
        try {
            const res= await fetch("tgif/template_files/edm.t")
            let data=await res.text()
            for (const [key, value] of Object.entries(this.tgif)) {
                data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            }
            return data;
        } catch (error) {
            return false;
        }
    },
    getLandingHtml:async function(){
        const landing_page=(this.tgif.useNewLandingPageFormat)?"new_format_landing.t":"landing.t"
       
        try {
            const res= await fetch("tgif/template_files/edm.t")
            let data=await res.text()
            //data=data.replaceAll(`##form##`,this.convertToEntities(this.tgif.form.getHtml(TGIFFormRenderer)))
            for (const [key, value] of Object.entries(this.tgif)) {
               data=data.replaceAll(`##${key}##`,this.convertToEntities( value ) )
            }
    
        } catch (error) {
            return false;
        }

    },
    getSendmailHtml:async function(){
        let data=await Utils.loadFile(this.templatesFolderPath+"sendemail.t");
       

        if(this.tgif.assetFormat=="ClientLink") {
            
            data=data.replaceAll(`##baseUrl####asset##`,this.tgif.clientLink )
        }


        for (const [key, value] of Object.entries(this.tgif)) {
            console.log(key);
           data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
        }

        return data;
    },
    getThankyouHtml:async function(){
        let data=await Utils.loadFile(this.templatesFolderPath+"thanks.t");
       

        if(this.tgif.assetFormat=="MP4" || this.tgif.assetFormat=="IFrame") {
            
            data=data.replaceAll(`header( "refresh:5;url=##baseUrl####asset##" );`,"" ) //remove redirect
        }

        data=data.replaceAll(`##thankyouContentHtml##`,Utils.convertToEntities(this.tgif.thankyouContentHtml) )
        

        for (const [key, value] of Object.entries(this.tgif)) {
           console.log(key);
           data=data.replaceAll(`##${key}##`,Utils.convertToEntities(value) )
        }

        return data;
    },


}

export default Publish;
