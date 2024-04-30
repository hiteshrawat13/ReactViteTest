export default class Utils{
    constructor(){

    }
    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, 
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static async loadFile (path) {
        const res = await fetch(path)
        const text = await res.text()
      
        return text;
    }

    static fileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    static convertToEntities(str) {
        var tstr = str ;
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
      }


      static getFormHtml(fields,formRenderer){
        let html=""
        fields.forEach((field,index)=> {
            if(formRenderer[field.type]){
                html+=formRenderer[field.type](field)
            }
            
        })
        return html
      }
}