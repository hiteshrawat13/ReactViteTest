//Dont forget to add extension while importing module
import { ALPHAFormRenderer } from './FormRenderer.js'
import edm_html from './pages/edm.html.txt?raw'  //?raw is important to read text files
import landing_html from './pages/landing.html.txt?raw'  //?raw is important to read text files
import sendemail_html from './pages/sendemail.php.txt?raw'  //?raw is important to read text files
import thanks_html from './pages/thanks.html.txt?raw'  //?raw is important to read text files
import thanks_video_html from './pages/thanks-video.html.txt?raw'  //?raw is important to read text files
import { getSendmailSubject } from './Base64.js'
class PublishHelper {
    constructor(state) {
        this.state = state
    }

    getFormHtml(fields, formRenderer) {
        let html = ""
        fields.forEach((field, index) => {
            if (formRenderer[field.type]) {
                html += formRenderer[field.type](field)
            }

        })
        return html
    }

    getBase64Image(file) {
        return new Promise((resolve, reject) => {
            //const NO_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQJQTFRF////9vb26urq/f39/v7+6enp9/f34uLi1tbW4ODg7u7ura2tqKioq6ur8vLy2tra9fX1w8PD0dHRqampu7u72dnZ1dXV5OTkrKyswcHB5eXlv7+/0NDQsbGxs7Oz4+Pj4eHh6+vrsLCw3d3dtbW1y8vLwsLCxMTEycnJr6+vsrKy3Nzc7Ozsrq6u/Pz87+/v+fn5uLi45ubm+Pj4urq6xcXFysrK8/Pz9PT0qqqqvr6++/v7zMzMxsbGt7e329vb8PDw2NjYyMjItLS0z8/Pubm5x8fH8fHx+vr67e3t1NTUzc3N0tLSzs7OwMDA09PT19fXvb293t7etra239/f6OjoADPkJQAAA8RJREFUeJztl+tTUkEUwM/CFZKHYmoqFErlmAqkNKVFRC81p5ppqv+yaepDD2vsNZUWRphUFORQUhlZiISDyMXbnt17i0Z7KHdqpnE/cA+7d8/v7tk9Z88h8Bca+dsQQkiRCQJZ4gLoaB9ZFFWEGKnCDArVRXEBnxZSYO9UpNSD1OZhwycU6nOGj/TRQLLm2Y1ixRxY3qoHMZCUMQnKSohJqn2D/S2foD6uGqSaJBtfiwqkddoa5QNt7za/UA2yKdo21fxMhgh12ZanfMCaqUmoBrGGK7WbTBN8T3ZOOsLyQNcr2D6uHgS6Y1Q/g3iirSFlxCxpMipCnK9NtiAzl75ixyNlxBXf9kRFCOyOdAQYxBNtfKWMmKXOh2pCemNQ0KO5DBqSk12dGF1j5Xj9MghsTluTuBLtnrDiHduS7pEyGCtAvJl41zj6iS/UfZf1C/seF/LqQsAf1OcRcvAR7L5F/7vrAjzaqAkR/A+BxS5/EBx5e8Qetkck1SBmC/drR2OYm8fZNEp/9bs+luOJ8NtLa+AmwJGh8hD/4GZch6xD1iHrEJUhgwnMs3SSWBLYnSDnXlCVqyzNWNy24TY+pJW07GlM/wmkNp+jyfyWWeDpNm2CKwYHrnCxNeGIKBd9ly0+RR81844gwInbMvanV/SPkK0TmNubCi1B3tP8WSK9w0z0RF3hqve825NLeHQx0pF93BEAOHnrMNMy9NMreiVI0/TRi7zHNtf7QIb4QqLQPsbEKkmqnGGSdQ998fgddkv/oq0EWdLYn7OOnmd9qSCHeJdMybhux32O7rpXMm1tkIVDo/kCn17XLENOXxcXfKGGScAEQ7+l9D5eI8QbZMmQO94S8cqQfRNCumG+7wIVD42Zp0tVrA2S612K4tZ3vtGl/BxCjDQx1tZn5+np3j+uo+WdO4JTOsdx43uqqDh3c3WQYv8Ibv2Za0JahmwQ8GsPBzBV6h/BI64x4JSmGELY7IHzq4RoDD03wDFDzSJDkIfHeOMUrgRLSC89vOZFNOsazVUEeypf8IVoAckhBo1jK32heBt8V+HUcPU7PuHsUFmQU8PdXxLVU6IMOflNi/8yDN7VF9NqQHa91FemcQMYhIYUganVGKS8CH2jtpdqQKCGOsriogzxRJWiqz1BQ8vAk6yuHd2SrrcsiDUD7HMZxBdS1Bx9gKHFGSewVzcpfkDrKUcYZu4tV78cYnYGqPp2C1ZV1EKD5wA9/eAlMINWDuNy+WVxPcdo6HnhGcL18LHvdeyvIKtpx25Qxp/Wkf/P9fsVAGO0QhHG300AAAAASUVORK5CYII="
            try {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {

                    resolve(reader.result)
                };
                reader.onerror = function (error) {
                    //resolve(NO_IMAGE)
                    resolve(null)
                };
            } catch (error) {
                //resolve(NO_IMAGE)
                resolve(null)
            }
        })
    }

    /* convertToEntities() This is to convert Chinese characters to Unicode numbers */
    convertToEntities = (input) => {
        var tstr = input;
        var bstr = '';
        for (let i = 0; i < tstr.length; i++) {
            if (tstr.charCodeAt(i) > 127) {
                bstr += '&#' + tstr.charCodeAt(i) + ';';
            }
            else {
                bstr += tstr.charAt(i);
            }
        }
        return bstr;
    }

    getEUFormCurlApiLandingMappedData(fields) {
        return fields.filter((field) => field.name != undefined).map((field, index, { length }) => {
            if (!field.name) return ""
            if (field.type == "CheckGroup") {
                return `mappedData['${field.id}']  = new FormData(form).getAll("${field.name}[]") || null;`
            } else {
                return `mappedData['${field.id}'] = data["${field.name}"] || null; `
            }
        }).join("\n\t\t")
    }



    //This function used to map data as per new CURL api
    getFormCurlApiSendmailMappedData(fields) {
        return `
            $fields = [
            ${fields.filter((field) => field.name != undefined).map((field, index, { length }) => {
            if (!field.name) return ""
            const hasDataName = /data\[(.+)\]/g.test(field.name) //if field name contains data[digit] format
            const field_name = (hasDataName) ? field.name.replace(/data\[(.+)\]/g, "$1") : `"${field.name}"`
            return `"${field.id}"   =>  ${field_name}  ${(index + 1 == length) ? '' : ','} `
        }).join("\n\t\t")
            }
            ];
            `
    }

    EUScript = () => {
        const EU_MAPPED_DATA = this.getEUFormCurlApiLandingMappedData(this.state.form)
        return ` submitHandler: function(form, event) {
                    event.preventDefault(); // Prevent default form submission
                    console.log(form);
                    const data = Object.fromEntries(new FormData(form).entries());
                    // Map data
					var mappedData = {};  

                    ${EU_MAPPED_DATA}

                      var camp_id = "##LINK_NAME##"; // CAMPID
                      var endUrl = "##BASE_URL####LINK_NAME##-thankyou.html"; // END URL                      

						const firstname=mappedData['firstname']
						const email_address=mappedData['email']
						const subject="##SENDMAIL_SUBJECT##";
						let body=\`##SENDMAIL_BODY##\`;
						body = body.replace(/(\\r\\n|\\n|\\r|\\t)/gm, "");
						
						post_form_data(camp_id, mappedData, endUrl,function onComplete(res,error){
							console.log("DATA",mappedData)
							console.log("Data Uploaded",res)
							sendmail(email_address,subject,body,function onMailComplete(mailRes,mailError){
                                console.log("Mail Sent",mailRes)
                                // Proceed with the form submission
                                //Redirect
                                window.location.href =	"##BASE_URL####LINK_NAME##-thankyou.html"	
						    })//Send mail
							
			            }); // Call API     
        },
    `
    }



    getPrivacyPolicy(data) {
        const eu_privacy = `<a href='https://itbusinessplus.com/eu-privacy/'>EU Data Protection Policy</a>`
        const non_eu_privacy = `<a href='https://itbusinessplus.com/privacy-policy/'>ITBP Privacy Policy</a>`
        const casl_privacy = `<a href='https://www.itbusinessplus.com/casl-privacy-policy/'>CASL Privacy Policy</a>`
        switch (this.state.REGION) {
            case "EU":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${eu_privacy}`)
                break;
            case "NON-EU":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy}`)
                break;
            case "CASL":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${casl_privacy}`)
                break;
            case "BOTH":
                data = data.replaceAll(`##PRIVACY_POLICY##`, `${non_eu_privacy} | ${casl_privacy}`)
                break;
        }
        return data
    }

    replaceHashVariables(data_in) {
        let data = data_in
        for (const [key, value] of Object.entries(this.state)) {
            try {
                if (typeof value === 'string' || value instanceof String)
                    data = data.replaceAll(`##${key}##`, this.convertToEntities(value))
            } catch (error) {
                console.log("Error while replaceAll in of publishHelper ", error, key, value);
            }
        }

        return data;
    }

    replace_ASSET_URL(data) {
        switch (this.state["ASSET_FORMAT"]) {
            case "PDF":
                data = data.replaceAll(`##ASSET_URL##`, this.state["BASE_URL"] + this.state["PDF_NAME"])
                break;
            case "MP4":
                data = data.replaceAll(`##ASSET_URL##`, this.state["BASE_URL"] + this.state["MP4_NAME"])
                break;
            case "CLIENT_LINK":
                data = data.replaceAll(`##ASSET_URL##`, this.state["CLIENT_LINK"])
                break;
            case "IFRAME":
                data = data.replaceAll(`##ASSET_URL##`, this.state["IFRAME"])
                break;
        }
        return data
    }

    //1. EDM Page
    async getEdmHtml({ forPreview }) {
        let data = edm_html;

        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy

        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }

            if (this.state["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) {
                if (this.filesRef.fileInput3.files[0]) { data = data.replaceAll(`##BASE_URL####EDM_THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput3.files[0])) }
            } else {
                if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
            }
        }


  

        return this.replaceHashVariables(data)
    }

    //2. Landing Page
    async getLandingHtml({ forPreview }) {
        let data = landing_html
        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }

            if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
        }
        if (this.state.REGION == "EU") {
            data = data.replaceAll(`##EU_SCRIPT##`, this.convertToEntities(this.EUScript()))
            data = data.replaceAll(`##EU_API_SCRIPT##`, `<script src="##BASE_URL##DataCurlNodeApi/post_form_data.js"></script>`)
            const hasSpecialCharsInSubject = this.convertToEntities(this.state["SENDMAIL_SUBJECT"]).includes("&#")
            data = data.replaceAll(`##SENDMAIL_SUBJECT##`, (hasSpecialCharsInSubject) ? getSendmailSubject(this.state["SENDMAIL_SUBJECT"]) : this.state["SENDMAIL_SUBJECT"].replaceAll("\\'", "'"))
            data = this.replaceHashVariables(data)//calling to replace ##SENDMAIL_BODY## in eu
            data = data.replaceAll(`\$firstname`, "${firstname}")//then after
        } else {
            data = data.replaceAll(`##EU_SCRIPT##`, '')
            data = data.replaceAll(`##EU_API_SCRIPT##`, '')
        }
        data = this.getPrivacyPolicy(data) //Privacy Policy


        if (this.state["LANDING_TITLE_SAME_AS_EDM_TITLE"] == true) {
            data = data.replaceAll(`##LANDING_TITLE##`, this.convertToEntities(this.state["EDM_TITLE"]))
        }else{
            data = data.replaceAll(`##LANDING_TITLE##`, this.convertToEntities(this.state["LANDING_TITLE"]))
        }

        if (this.state["LANDING_HEADING_SAME_AS_EDM_HEADING"] == true) {
            data = data.replaceAll(`##LANDING_HEADING##`, this.convertToEntities(this.state["EDM_HEADING"]))
        }else{
            data = data.replaceAll(`##LANDING_HEADING##`, this.convertToEntities(this.state["LANDING_HEADING"]))
        }

        data = data.replaceAll(`##FORM##`, this.convertToEntities(this.getFormHtml(this.state.form, ALPHAFormRenderer)))
        return this.replaceHashVariables(data)
        //return JSON.stringify(this.thumbnailDataUrl)+" "+JSON.stringify(this.state)
    }

    //3. Sendmail Page
    getSendmailHtml({ forPreview }) {
        let data = sendemail_html
        data = data.replaceAll(`##MAPPED_DATA##`, this.getFormCurlApiSendmailMappedData(this.state.form))
        const hasSpecialCharsInSubject = this.convertToEntities(this.state["SENDMAIL_SUBJECT"]).includes("&#")
        data = data.replaceAll(`##SENDMAIL_SUBJECT##`, (hasSpecialCharsInSubject) ? getSendmailSubject(this.state["SENDMAIL_SUBJECT"]) : this.state["SENDMAIL_SUBJECT"].replaceAll("\\'", "'"))
        data = data.replaceAll(`##SENDMAIL_BODY##`, this.convertToEntities(this.state["SENDMAIL_BODY"]).replaceAll('"', '\\"'))
        data = this.replace_ASSET_URL(data) //replace ##ASSET_URL##
        data = this.replaceHashVariables(data)
        if (forPreview == true) {
            //Escape html for preview to prevent redirects
            data = `<pre>${new Option(data).innerHTML}</pre>`
        }
        return data
    }

    //4. Thankyou Page
    async getThanksHtml({ forPreview }) {
        let data = thanks_html
        data = this.getPrivacyPolicy(data) //Privacy Policy
        data = this.replace_ASSET_URL(data) //replace ##ASSET_URL##
        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
            if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
        }



        if (this.state["THANKYOU_TITLE_SAME_AS_EDM_TITLE"] == true) {
            data = data.replaceAll(`##THANKYOU_TITLE##`, this.convertToEntities(this.state["EDM_TITLE"]))
        }else{
            data = data.replaceAll(`##THANKYOU_TITLE##`, this.convertToEntities(this.state["THANKYOU_TITLE"]))
        }

        if (this.state["THANKYOU_HEADING_SAME_AS_EDM_HEADING"] == true) {
            data = data.replaceAll(`##THANKYOU_HEADING##`, this.convertToEntities(this.state["EDM_HEADING"]))
        }else{
            data = data.replaceAll(`##THANKYOU_HEADING##`, this.convertToEntities(this.state["THANKYOU_HEADING"]))
        }



        return this.replaceHashVariables(data)
    }

    //5. Thankyou page for Video and Iframe
    async getThanksVideoHtml({ forPreview }) {
        let data = thanks_video_html
        data = this.getPrivacyPolicy(data) //Privacy Policy
        const iframe = `
        <div>
		 <iframe style="width:100%;aspect-ratio:16/9;" src="${this.state["IFRAME"]}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowfullscreen=""></iframe>
		 </div>
        `
        const video = `
        <div>
		 <iframe style="width:100%;aspect-ratio:16/9;" src="${this.state["BASE_URL"] + this.state["MP4_NAME"]}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowfullscreen=""></iframe>
		 </div>
        `
        if (this.state["ASSET_FORMAT"] == 'MP4') {
            data = data.replaceAll(`##BODY##`, video)
        } else if (this.state["ASSET_FORMAT"] == 'IFRAME') {
            data = data.replaceAll(`##BODY##`, iframe)
        } else {
            data = data.replaceAll(`##BODY##`, '')
        }
        return this.replaceHashVariables(data)
    }

    //6. Double Optin thankyou page
    getThankyouDoubleOptinHtml({ forPreview }) {

    }

    async getPageFiles({ forPreview = false, filesRef = null, state = null }) {
        this.filesRef = filesRef
        this.state = state
        let files = []
        files.push({ name: `${this.state["LINK_NAME"]}-edm.html`, data: await this.getEdmHtml({ forPreview }) })
        files.push({ name: `${this.state["LINK_NAME"]}-landing.html`, data: await this.getLandingHtml({ forPreview }) })
        if (this.state.REGION != "EU") {
            //Sendmail not required for EU data is passed from landing page
            files.push({ name: `${this.state["LINK_NAME"]}-sendemail.php`, data: await this.getSendmailHtml({ forPreview }) })
        }
        files.push({ name: `${this.state["LINK_NAME"]}-thanks.html`, data: await this.getThanksHtml({ forPreview }) })
        if (this.state["ASSET_FORMAT"] == 'MP4' || this.state["ASSET_FORMAT"] == 'IFRAME') {
            files.push({ name: `${this.state["LINK_NAME"]}-thanks-vid.html`, data: await this.getThanksVideoHtml({ forPreview }) })
        }
        return files;
    }
}

export default PublishHelper