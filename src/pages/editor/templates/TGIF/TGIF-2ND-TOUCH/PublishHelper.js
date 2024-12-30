//Dont forget to add extension while importing module
import edm_html from '../TGIF-1ST-TOUCH/pages/edm.html.txt?raw'  //?raw is important to read text files
import thanks_html from '../TGIF-1ST-TOUCH/pages/thanks.php.txt?raw'  //?raw is important to read text files

import { getSendmailSubject } from '../TGIF-1ST-TOUCH/Base64.js'


import PublishHelper1 from '../TGIF-1ST-TOUCH/PublishHelper.js'

import Functions from '../TGIF-1ST-TOUCH/functions.js'

class PublishHelper {
    constructor() {
       

   
    }



    async getEdmHtml({ forPreview }) {
     

        const data=await this.PublishHelper.getEdmHtml({ forPreview })
        return data
    }

     
     
    async getThanksHtml({ forPreview }) {
        const  data =await this.PublishHelper.getThanksHtml({ forPreview })
        return data
    }
    getThankyouDoubleOptinHtml({ forPreview }) {

    }


    async getPageFiles({ forPreview = false, filesRef = null, state = null }) {
         

       
        this.PublishHelper=new PublishHelper1(state)
        this.PublishHelper.filesRef = filesRef
        this.PublishHelper.state = state

        this.filesRef = filesRef
        this.state = state

        let files = []

        files.push({ name: `${this.state["LINK_NAME"]}-edm.html`, data: await this.getEdmHtml({ forPreview }) })
        files.push({ name: `${this.state["LINK_NAME"]}-thanks.php`, data: await this.getThanksHtml({ forPreview }) })
        // if(this.state["ASSET_FORMAT"]=='MP4' || this.state["ASSET_FORMAT"]=='IFrame'){

        // }else{

        // }
        return files;
    }
}

export default PublishHelper