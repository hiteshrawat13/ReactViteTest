//Dont forget to add extension while importing module
import edm_html from '../TGIF-1ST-TOUCH/pages/edm.html.txt?raw'  //?raw is important to read text files
import thanks_html from '../TGIF-1ST-TOUCH/pages/thanks.php.txt?raw'  //?raw is important to read text files

import { getSendmailSubject } from '../TGIF-1ST-TOUCH/Base64.js'


import PublishHelper from '../TGIF-1ST-TOUCH/PublishHelper.js'

import Functions from '../TGIF-1ST-TOUCH/functions.js'

class PublishHelper {
    constructor(state) {
        this.state = state


        this.PublishHelper=new PublishHelper(state)
         
    }



  


    




    async getEdmHtml({ forPreview }) {
        let data = edm_html;

        if (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"] && (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"].trim().length > 0)) {
            data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCH##`, `<p style="font-size: 14px;color: #6F6F6F;margin-bottom:5px;" class="body-sub-title">${Functions.convertToEntities(this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"])}</p>`)
        } else {
            data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCHE##`, "")
        }


        data=await this.PublishHelper.getEdmHtml({ forPreview })
        return data
    }

     
     
    async getThanksHtml({ forPreview }) {
          data =await this.PublishHelper.getEdmHtml({ forPreview })
        return data
    }
    getThankyouDoubleOptinHtml({ forPreview }) {

    }


    async getPageFiles({ forPreview = false, filesRef = null, state = null }) {


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