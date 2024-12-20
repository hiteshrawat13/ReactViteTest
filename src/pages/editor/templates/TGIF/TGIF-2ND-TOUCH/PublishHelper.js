//Dont forget to add extension while importing module
import edm_html from '../TGIF-1ST-TOUCH/pages/edm.html.txt?raw'  //?raw is important to read text files
import thanks_html from '../TGIF-1ST-TOUCH/pages/thanks.php.txt?raw'  //?raw is important to read text files

import { getSendmailSubject } from '../TGIF-1ST-TOUCH/Base64.js'
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


    /*
convertToEntities()
This is to convert Chinese characters to Unicode numbers
*/

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


    getFormCurlApiSendmailMappedData(fields) {


        return `
        $fields = [
        ${fields.filter((field) => field.name != undefined).map((field, index, { length }) => {


            if (!field.name) return ""

            const hasDataName = /data\[(.+)\]/g.test(field.name)

            const field_name = (hasDataName) ? field.name.replace(/data\[(.+)\]/g, "$1") : `"${field.name}"`

            return `"${field.id}"   =>  ${field_name}  ${(index + 1 == length) ? '' : ','} `
        }).join("\n\t\t")
            }
        ];
        `
    }


    getPrivacyPolicy(data) {
        const eu_privacy = `<a href="https://itbusinesstoday.com/eu-data-protection">Privacy Policy</a>`
        const non_eu_privacy = `<a href="https://itbusinesstoday.com/us-privacy-policy/">Privacy Policy</a>`
        const casl_privacy = `<a href="https://itbusinesstoday.com/casl-policy/">CASL Privacy Policy</a>`
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

    async getEdmHtml({ forPreview }) {
        let data = edm_html;

        if (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"] && (this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"].trim().length > 0)) {
            data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCH##`, `<p style="font-size: 14px;color: #6F6F6F;margin-bottom:5px;" class="body-sub-title">${this.convertToEntities(this.state["EDM_THANKS_TEXT_FOR_2ND_TOUCH"])}</p>`)
        } else {
            data = data.replaceAll(`##EDM_THANKS_TEXT_FOR_2ND_TOUCHE##`, "")
        }


        data = data.replaceAll(`##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#`, "##BASE_URL####LINK_NAME##-thanks.php")
 
        const traditional_layout = `
        <table width="100%" style="background-color: #ffffff; padding: 0% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                                <tr scope="col">
                                    <td style="padding-left: 8px; vertical-align: top; padding-right: 20px;">
                                
										<div class="edm_abstract">
											##EDM_ABSTRACT##
										</div>

                                    </td>
                                    <td style="display: flex; flex: start;">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####THUMBNAIL_NAME##" alt="##EDM_TITLE##" class="img" />
                                        </a>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `


        const full_width_layout = `
        <table width="100%" style="background-color: #ffffff; padding: 0% 2%;" align="center" class="font-style">
                            <tbody class="table table-borderless table-responsive">
                           
								<tr>
								 <td colspan="2">
                                        <a href="##BASE_URL####LINK_NAME##-landing.php?e=#e-mail#" target="_blank">
                                            <img src="##BASE_URL####THUMBNAIL_NAME##" alt="##EDM_TITLE##" class="img-full-width" />
                                        </a>

                                    </td>
								</tr>

								<tr>
									<td colspan="2">
										<div class="edm_abstract">
											##EDM_ABSTRACT##
										</div>
									</td>
								</tr>
                            </tbody>
                        </table>
        `

        if (this.state["EDM_LAYOUT"] == "Traditional") {
            data = data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities(traditional_layout))
        } else if (this.state["EDM_LAYOUT"] == "Full width thumbnail and abstract") {
            data = data.replaceAll(`##EDM_LAYOUT##`, this.convertToEntities(full_width_layout))
        }


        if (this.state["THUMBNAIL_BORDER"] == true) {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`,  'border: 1px solid #e5e5e5;'  )
        } else   {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`, '')
        }




        data = this.convertToEntities(this.getPrivacyPolicy(data)) //Privacy Policy



        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }


            if (this.state["USE_DIFFERENT_THUMBNAIL_FOR_EDM_PAGE"] == true) {
                if (this.filesRef.fileInput3.files[0]) { data = data.replaceAll(`##BASE_URL####EDM_THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput3.files[0])) }

            } else {
                if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
            }
        }



        if (this.state["EDM_SUB_TITLE"] && (this.state["EDM_SUB_TITLE"].trim().length > 0)) {
            data = data.replaceAll(`##EDM_SUB_TITLE##`, `<p style="font-size: 15px;color: #6F6F6F;margin-top:12px;margin-bottom:5px;font-weight:bold;" class="body-sub-title">${this.convertToEntities(this.state["EDM_SUB_TITLE"])}</p>`)
        } else {
            data = data.replaceAll(`##EDM_SUB_TITLE##`, "")
        }

        for (const [key, value] of Object.entries(this.state)) {
            try {
                if (typeof value === 'string' || value instanceof String)
                    data = data.replaceAll(`##${key}##`, this.convertToEntities(value))
            } catch (error) {
                console.log("Error while replaceAll in getLandingHtml() of publishHelper ", error, key, value);
            }
        }
        return data
    }

     
     
    async getThanksHtml({ forPreview }) {
        let data = thanks_html

        data = this.getPrivacyPolicy(data) //Privacy Policy
        const normal_thankyou = `\t
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" class="whitepaper" style="align-items: start; display: flex;">
                                        <img  style=" height: auto !important;border: 1px solid #c4c5c6;    border-radius: 5px;" alt="##EDM_TITLE##" src="##BASE_URL####THUMBNAIL_NAME##" width="180"   />
                                    </td>

                                    <td align="left" valign="top" class="style1 thankyou">

                                        ${this.state["NORMAL_THANK_YOU_PAGE_TEXT"]}

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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        
        \n`

        const iframe_thankyou = `
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h1 style="font-size: 22px;font-weight:normal; color: #0066b2;margin-top:10px;margin-bottom:15px;padding-left:0px;">##EDM_TITLE##</h1> 
                                            <iframe 
                                            src="##IFRAME##" 
                                            title="##EDM_TITLE##" 
                                            style="width:100%;aspect-ratio:16/9;"
                                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen></iframe>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `

        const mp4_thankyou = `
        <table width="100%" cellspacing="0" cellpadding="10" border="0" class="content_body">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" class="style1 thankyou">
                                        <h1 style="font-size: 22px;font-weight:normal; color: #0066b2;margin-top:10px;margin-bottom:15px;padding-left:0px;">##EDM_TITLE##</h1> 
	                                     
                                        <video class="jw-video jw-reset" tabindex="-1" style="width:100%;aspect-ratio:16/9;" controls>
                                            <source src="##BASE_URL####MP4_NAME##" type="video/mp4">
                                        </video> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        `

        switch (this.state["ASSET_FORMAT"]) {
            case "PDF":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(normal_thankyou))
                break;
            case "MP4":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(mp4_thankyou))
                data = data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `, "")//remove redirect
                break;
            case "CLIENT_LINK":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(normal_thankyou))
                data = data.replaceAll(`##BASE_URL####LINK_NAME##.pdf`, this.state['CLIENT_LINK'])
                break;
            case "IFRAME":
                data = data.replaceAll(`##THANK_YOU_CONTENT##`, this.convertToEntities(iframe_thankyou))
                data = data.replaceAll(`header( "refresh:5;url=##BASE_URL####LINK_NAME##.pdf" ); `, "")//remove redirect    
                break;
        }

        if (forPreview == true) {
            if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
            if (this.filesRef.fileInput2.files[0]) { data = data.replaceAll(`##BASE_URL####THUMBNAIL_NAME##`, await this.getBase64Image(this.filesRef.fileInput2.files[0])) }
        }


        if (this.state["THUMBNAIL_BORDER"] == true) {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`,  'border: 1px solid #e5e5e5;'  )
        } else   {
            data = data.replaceAll(`##THUMBNAIL_BORDER##`, '')
        }


        for (const [key, value] of Object.entries(this.state)) {
            try {
                if (typeof value === 'string' || value instanceof String)
                    data = data.replaceAll(`##${key}##`, this.convertToEntities(value))
            } catch (error) {
                console.log("Error while replaceAll in getThankyou of publishHelper ", error, key, value);
            }
        }
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