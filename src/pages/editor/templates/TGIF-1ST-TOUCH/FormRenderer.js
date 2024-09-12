//This form field renderer is for TGIF 1st Touch campaign


const TGIFFormRenderer = {
    TextBox: (obj) => {
        return `
           <tr>
               <th width="47%">
               <label for="${obj.id}">
                   <span title="Required Field">${obj.label}</span>
                   ${obj.isRequired ? `<span class="mandatory" style="color:red">*</span>` : ""}
               </label>
               </th>
               <td width="53%">
               <input type="${(obj.inputType)?obj.inputType:'text'}" name="${obj.name}" ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}  id="${obj.id}" value="${obj.value || ''}" >
               </td>
           </tr>
           `
    },


    // SelectBox
    SelectBox: (obj) => {



        if (obj.isFullWidth) {
            return `
        <tr>
        <td colspan="2">
        <label for="${obj.id}">
            <span title="Required Field">${obj.label}</span>
            ${obj.isRequired ? `<span class="mandatory" style="color:red">*</span>` : ""}
        </label>
        
        <select name="${obj.name}"   ${obj.isRequired ? "required" : ""} id="${obj.id}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}>
        
        ${obj.options.map((option, index) => {
                if (index == 0) {
                    return `<option value="">${option}</option>
                `
                } else {
                    return `<option value="${option}">${option}</option> `
                }

            }).join("")}

        </select>
        </td>
        </tr>
        `
        } else {
            return `
        <tr>
        <th>
        <label for="${obj.id}">
            <span title="Required Field">${obj.label}</span>
            ${obj.isRequired ? `<span class="mandatory" style="color:red">*</span>` : ""}
        </label>
        </th>
        <td>
        <select name="${obj.name}" ${obj.isRequired ? "required" : ""} id="${obj.id}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}>
     
        ${obj.options.length>0  && obj.options.map((option, index) => {
               
                    return `<option value="${option.value}" ${(option.disabled)?'disabled':''}>${option.label}</option>`
           

            }).join("")}

        </select>
        </td>
        </tr>
        `
        }

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


       
       ${obj.options.map(option => `
       <div class="custom-control custom-radio" style="color:#000">
           <input type="checkbox"    name="${obj.name}[]" value="${option.value}" ${obj.isRequired ? "required" : ""}   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}>
           <label>${option.label}</label>
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
       gap: 4px;
   }

   .custom-radio p{
       margin:0;
}
   </style>
<td colspan="2" align="center" valign="top" style="padding-top: 10px;">
   <div   style="color: #FF0000; line-height:1%;
       padding: 5px;
       text-align: left;
   
       font:  13px/18px 'Noto Sans', sans-serif;;">  

       ${obj.label} ${obj.isRequired ? `<span style="color: red;">*</span>` : ""}<br><br>

       <div class="check-group">

       ${obj.options?.map(option => `
       <label class="custom-control custom-radio" style="color:#000">
           <input type="radio"   name="${obj.name}" value="${option.value}" ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} >
           <p>${option.label}</p>
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
       <tr>
       <th colspan="2" style="color:#444444;font-size:12px;">
       <div class="check-group">
       <label  style="display:flex;align-items:start;">
       <input type="checkbox" name="${obj.name}" id="${obj.id}" ${obj.isRequired ? "required" : ""} value="${obj.value}"   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />	
       ${obj.label}</label>
       </div>
       </th>
       </tr>
       `
    },



    Text: (obj) => {
        return `								   
       <tr>
       <th colspan="2" style="color:#444444;font-size:12px;">
       <div class="" style="display:flex;align-items:start;">
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
        return `<input type="hidden" id="${obj.id}" name="${obj.name}" value="${obj.value}" />
        `
    }

}

export {TGIFFormRenderer}