class PublishHelper{
    constructor(state=null,fileRefs=null){
        this.state=state
        this.fileRefs=fileRefs
    }
    hi(){
        alert("HI")
    }

    async getEdmHtml({forPreview}){
        let data="qq";
    

        // for (const [key, value] of Object.entries(this.state)) {
        //     try {
        //         if(typeof value === 'string' || value instanceof String)
        //         data=data.replaceAll(`##${key}##`,Utils.convertToEntities( value ) )
        //     } catch (error) {
        //         console.log("Error in getEdmHtml() function",error);
        //     } 
        // }

        return data
    }
    getLandingHtml({forPreview}){
        return "Landing Page"
    }
    getSendmailHtml({forPreview}){
        return "Sendmail"
    }
    getThankyouHtml({forPreview}){
        return "thankyou"
    }
    getThankyouDoubleOptinHtml({forPreview}){
    }
    async getPageFiles({forPreview=false}){
        let files=[]
        
        files.push({ name:`${ "LINK-NAME-1"}-edm.html`, data: await this.getEdmHtml({forPreview}) })
        // files.push({ name:`${ this.state["LINK_NAME"]}-landing.html`, data: await this.getLandingHtml({forPreview}) })
        // files.push({ name:`${ this.state["LINK_NAME"]}-sendemail.php`, data: await this.getSendmailHtml({forPreview}) })
        // files.push({ name:`${ this.state["LINK_NAME"]}-thanks.html`, data: await this.getThankyouHtml({forPreview}) })
        // if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        // }else{

        // }
        return files;
    }
}

export default PublishHelper