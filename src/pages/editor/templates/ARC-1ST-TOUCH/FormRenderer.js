//This form field renderer is for ARC 1st Touch campaign


const ARCFormRenderer = {
    TextBox: (obj) => {
        return `
           <div class="form-group">
				<input class="form-control" type="${(obj.inputType) ? obj.inputType : 'text'}" name="${obj.name}" placeholder="${obj.label}"  ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}  id="${obj.id}" value="${obj.value || ''}">
                <b class="tooltip tooltip-bottom-right">Enter the ${obj.label}</b>
            </div>
           
           `
    },


    // SelectBox
    SelectBox: (obj) => {
        return `
        <div class="form-group">
            <b class="tooltip tooltip-bottom-right">Enter the ${obj.label}</b>
			<select class="form-control" name="${obj.name}"   ${obj.isRequired ? "required" : ""} id="${obj.id}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}>
            ${obj.options.length > 0 && obj.options.map((option, index) => {
            return `<option value="${option.value}"  ${(option.disabled)?"disabled":""} >${option.label}</option> `
        }).join("")}
            </select> 
        </div>
        `
    },


    // CheckGroup
    CheckGroup: (obj) => {
        return `
           <b> CHECK GROUP NOT ADDED IN FORM RENDERER</b>
            `},


    // RadioGroup
    RadioGroup: (obj) => {
        return `
<div class="form-group">
	<p>${obj.label}</p>
	
        ${obj.options?.map(option => `
            <input type="radio" name="${obj.name}" value="${option.value}" ${obj.isRequired ? "required" : ""} ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""}> ${option.label}<br>
            `).join("")}

</div>


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
      
       <div class="form-group">
			<input type="checkbox" name="${obj.name}" id="${obj.id}" ${obj.isRequired ? "required" : ""} value="${obj.value}"   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} >  ${obj.label} <br>
        </div>



       `
    },



    Text: (obj) => {
        return `								   
      <b>Text is not supported</b>
       `
    },


    CTA: (obj) => {
        return ` <input type="submit" id="submitBtn" name="btn" class="submit_button" value="${obj.label}" />`
    }
    ,
    HiddenInput: (obj) => {
        return `<input type="hidden" id="${obj.id}" name="${obj.name}" value="${obj.value}" />
        `
    }

}

export { ARCFormRenderer }