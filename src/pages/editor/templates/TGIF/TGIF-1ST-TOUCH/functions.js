export default class Functions{


   static  getPrivacyPolicy(data) {
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

      static getFormHtml(fields, formRenderer) {
            let html = ""
            fields.forEach((field, index) => {
                if (formRenderer[field.type]) {
                    html += formRenderer[field.type](field)
                }
    
            })
            return html
        }
    
    
    
        static    getBase64Image(file) {
    
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
    
    static    convertToEntities = (input) => {
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
    
    
        static   getFormCurlApiSendmailMappedData(fields) {
    
    
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
}