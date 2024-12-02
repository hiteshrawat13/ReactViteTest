//This form field renderer is for TGIF 1st Touch campaign


const TGIFFormRenderer = {
    TextBox: (obj) => {
        return `
           <tr class="form-group">
               <th width="47%">
               <label for="${obj.id}">
                   <span title="Required Field">${obj.label}</span>
                   ${obj.isRequired ? `<span class="mandatory" style="color:red">*</span>` : ""}
               </label>
               </th>
               <td width="53%">
               <input type="${(obj.inputType) ? obj.inputType : 'text'}" name="${obj.name}" ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}  id="${obj.id}" value="${obj.value || ''}" >
               </td>
           </tr>
           `
    },


    // SelectBox
    SelectBox: (obj) => {


        const selectbox_label_html=`
                        <label for="${obj.id}">
                            <span title="Required Field">${obj.label}</span>
                            ${obj.isRequired ? `<span class="mandatory" style="color:red">*</span>` : ""}
                
                        </label>
        `
        const select_box_html=` <select name="${obj.name}" ${obj.isRequired ? "required" : ""} id="${obj.id}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}>
        
          ${(obj.placeholder && (obj.placeholder.length > 0)) ? `<option value=""  disabled selected>${obj.placeholder}</option>` : ""}
        
          ${obj.options?.map((option, index) => {
                return `<option value="${option.value}" ${(option.disabled) ? 'disabled' : ''}>${option.label}</option>`
            }).join("")}

        </select>`



        if (obj.isFullWidth) {
            //Full Width
            return `
                <tr class="form-group">
                    <td colspan="2">
                        
                        ${selectbox_label_html}
                        ${select_box_html}

                    </td>
                </tr>
        `
        } else {
            //Not full Width
            return `
                <tr class="form-group">
                    <th>
                        ${selectbox_label_html}
                    </th>
                    <td>
                        ${select_box_html}
                    </td>
                </tr>
        `
        }

    },


    // CheckGroup
    CheckGroup: (obj) => {
        return `
                                          
<tr class="form-group">
    <td colspan="2" >
        <div>${obj.label} ${(obj.label && obj.isRequired) ? `<span style="color: red;">*</span>` : ""}</div>
        <div class="check-group">
        ${obj.options?.map(option => `
            <label class="radio-option">
                <input type="checkbox" name="${obj.name}" value="${option.value}" ${obj.isRequired ? "required" : ""}  ${obj.isReadOnly ? "readonly" : ""}  ${obj.isDisabled ? "disabled" : ""}>
                <span>${option.label}</span>
            </label>
        `).join("")}
        </div>
    </td>
</tr>
`},


    // RadioGroup
    RadioGroup: (obj) => {
        return `
                                          
<tr class="form-group">
<td colspan="2">
       <div>${obj.label} ${(obj.label && obj.isRequired) ? `<span style="color: red;">*</span>` : ""}</div>
       <div class="check-group">
       ${obj.options?.map(option => `
       <label class="radio-option">
           <input type="radio"   name="${obj.name}" value="${option.value}" ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} >
           <span>${option.label}</span>
       </label>
       `).join("")}
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
       <tr class="form-group">
       <th colspan="2">
       <div class="check-group">
        <label class="radio-option">
            <input type="checkbox" name="${obj.name}" id="${obj.id}" ${obj.isRequired ? "required" : ""} value="${obj.value}"   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />	
            <span>${obj.label}</span>
        </label>
       </div>
       </th>
       </tr>
       `
    },



    Text: (obj) => {
        return `								   
       <tr class="form-group">
        <th colspan="2">
            <div class="radio-option">
                <span>${obj.label}</span>
            </div>
        </th>
       </tr>
       `
    },


    CTA: (obj) => {
        return `
    <tr class="form-group">
    <td colspan='2'>
        <button type="submit" class="btn btn-primary1 cta"> ${obj.label}</button>
    </td>
    </tr>`
    }
    ,
    HiddenInput: (obj) => {
        return `<input type="hidden" id="${obj.id}" name="${obj.name}" value="${obj.value}" />
        `
    }

}

export { TGIFFormRenderer }