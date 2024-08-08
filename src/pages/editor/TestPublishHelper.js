class PublishHelper{
    constructor(state){
        this.state=data
    }

    getEdmHtml({forPreview}){

    }

    getLandingHtml({forPreview}){

    }

    getSendmailHtml({forPreview}){

    }

    getThankyouHtml({forPreview}){

    }

    getThankyouDoubleOptinHtml({forPreview}){

    }

    async getPageFiles({forPreview=false}){
        const files=[]

        files.push({ name:`${this.LINK_NAME}-edm.html`, data: await this.getEdmHtml({forPreview}) })
        files.push({ name:`${this.LINK_NAME}-landing.html`, data: await this.getLandingHtml({forPreview}) })
        files.push({ name:`${this.LINK_NAME}-sendemail.php`, data: await this.getSendmailHtml({forPreview}) })
        files.push({ name:`${this.LINK_NAME}-thanks.html`, data: await this.getThankyouHtml({forPreview}) })
        if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        }else{

        }

        return files;
    }
}