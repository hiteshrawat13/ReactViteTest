//This form field renderer is for TGIF 1st Touch campaign


const ALPHAFormRenderer = {
    TextBox: (obj) => {
        return `

        <section>	
        <label class="input" for="${obj.id}">
        <input type="text" name="${obj.name}" placeholder="${obj.label}" ${obj.isRequired ? "required" : ""} ${obj.isDisabled ? "readonly" : ""} id="${obj.id}" value="${obj.value || ''}" type="text">
        <b class="tooltip tooltip-bottom-right">${obj.label}</b>
        </label>
      </section>
      
           `
    },


    // SelectBox
    SelectBox: (obj) => {

            return `

        <section>
        <label class="select" for="${obj.id}" >
        <select name="${obj.name}" ${obj.isRequired ? "required" : ""} id="${obj.id}" >
            <option value="" selected disabled>${obj.label} </option>
            
            ${obj.options.length>0 && obj.options.split(/\r?\n/).map((option, index) => {
                if (index == 0) {
                    return `<option value="">${option.trim()}</option>
                `
                } else {
                    return `<option value="${option.trim()}">${option.trim()}</option> `
                }

            }).join("")}            
            </select>
        <i></i>
        </label>
    </section>
        `

    },


    // CheckGroup
    CheckGroup: (obj) => {
        return `
                                          
<tr>
   <style>
   .custom-radio{
           display: flex;
       align-items: flex-start;
       gap: 5px;
   }
   </style>
    <td colspan="2" align="center" valign="top" style="padding-top: 10px;">
   <div   style="color: #FF0000; line-height:1%;
       padding: 5px;
       margin-top:10px;
       text-align: left;
   
       font:  13px/18px 'Noto Sans', sans-serif;;">  

       ${obj.label} ${obj.isRequired ? `<span style="color: red;">*</span>` : ""}<br><br>

       <div class="check-group">

       ${obj.options.split(/\r?\n/).map(option => `
       <div class="custom-control custom-radio" style="color:#000">
           <input type="checkbox"    name="${obj.name}[]" value="${option.trim()}" ${obj.isRequired ? "required" : ""}>
           <label>${option.trim()}</label>
       </div>
       `).join("")}

           
       </div>

   </div>
</td>

</tr>
`},


    // RadioGroup
    RadioGroup: (obj) => {
        return `
                                          
<tr>

   <style>
   .custom-radio{
           display: flex;
           align-items: center;
       gap: 3px;
   }

   .custom-radio p{
       margin:0;
}
   </style>
<td colspan="2" align="center" valign="top" style="padding-top: 10px;">
   <div   style="color: #FF0000; line-height:1%;
       padding: 5px;
       margin-top:10px;
       text-align: left;
   
       font:  13px/18px 'Noto Sans', sans-serif;">  

       ${obj.label} ${obj.isRequired ? `<span style="color: red;">*</span>` : ""}<br><br>

       <div class="check-group">

       ${obj.options.split(/\r?\n/).map(option => `
       <label class="custom-control custom-radio" style="color:#000">
           <input type="radio"   name="${obj.name}" value="${option.trim()}" ${obj.isRequired ? "required" : ""} >
           <p>${option.trim()}</p>
       </label>
       `).join("")}
       </div>
   </div>
</td>
</tr>
`},

    // Html
    Html: (obj) => {
        return `
           ${obj.html}
       `
    },


    // Optin Checkbox only

    CheckBox: (obj) => {
        return `								   

       <section>
       <input type="checkbox" name="${obj.name}" id="${obj.id}" ${obj.isRequired ? "required" : ""} value="${obj.value}" />&nbsp; 
 <label for="${obj.id}" style="display: inline; font-weight: normal;">${obj.label}</label>
<br>
     </section>

       `
    },



    Text: (obj) => {
        return `								   
       <tr>
       <th colspan="2" style="color:#444444;font-size:12px;">
       <div class="check-group" style="display:flex;align-items:start;">
      <label>${obj.label}</label>
       </div>
       </th>
       </tr>
       `
    },


    CTA: (obj) => {
        return `
    <tr>
    <td colspan='2'>
        <button type="submit" value="" aria-label="download" style="background-color:#0066b2;    
    width:250px; color: white;  border-radius:8px; padding-top: 08px;margin-left: 26px; margin-top:0px;" class="btn btn-primary1"> ${obj.label}</button>
    </td>
    </tr>`
    }
,
    HiddenInput: (obj) => {
        return `<input type="hidden" name="${obj.name}" value="${obj.value}" />
        `
    }

}

export{ALPHAFormRenderer}