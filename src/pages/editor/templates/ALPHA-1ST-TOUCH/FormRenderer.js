//This form field renderer is for TGIF 1st Touch campaign


const ALPHAFormRenderer = {
    TextBox: (obj) => {
        return `

        <section>	
        <label class="input" for="${obj.id}">
        <input type="${(obj.inputType) ? obj.inputType : 'text'}" name="${obj.name}" placeholder="${obj.label}" ${obj.isRequired ? "required" : ""}  id="${obj.id}" value="${obj.value || ''}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />
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
        <select name="${obj.name}" ${obj.isRequired ? "required" : ""} id="${obj.id}"  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} >
            ${obj.options?.map((option, index) => {
            return `<option value="${option.value}" ${(option.disabled) ? 'disabled' : ''}>${option.label}</option>`
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
                                          
<section >
    <div class="bold">${obj.label} ${obj.isRequired ? `<span style="color: red;">*</span>` : ""}</div>
       <div class="check-group">
       ${obj.options?.map((option, index) => {
            return `<div >
          <label class="flex-label"> <input type="checkbox"    name="${obj.name}[]" value="${option.value}" ${obj.isRequired ? "required" : ""}   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />
           <p>${option.label}</p></label>
       </div>`
        }).join("")}

           
       </div>

</section>
`},


    // RadioGroup
    RadioGroup: (obj) => {
        return `
                                          
<section >
 
   <div class="check-group">  

       <div class="bold">${obj.label} ${obj.isRequired ? `<span style="color: red;">*</span>` : ""}</div>
       <div >
        ${obj.options?.map((option, index) => {
            return `<label  class="flex-label">
           <input type="radio"   name="${obj.name}" value="${option.value}" ${obj.isRequired ? "required" : ""}  ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />
           <p>${option.label}</p>
       </label>
      ` }).join("")}

       </div>
    </div>
 </section>
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
       <section class="check-group">
       <label for="${obj.id}" class="flex-label">
       <input type="checkbox" name="${obj.name}" id="${obj.id}" ${obj.isRequired ? "required" : ""} value="${obj.value}"   ${obj.isReadOnly ? "readonly" : ""}   ${obj.isDisabled ? "disabled" : ""} />
       <p>${obj.label}</p>
        </label>
 
     </section>

       `
    },



    Text: (obj) => {
        return `								   
       <section>
       <div class="check-group">
        <p>${obj.label}</p>
       </div>
      </section>
       `
    },


    CTA: (obj) => {
        return `<footer style="padding:15px 0px">
        <button type="submit" name="submit" class="button" style="background-color: #4c77c7;width: 100%;margin:0px;padding:0px;" id="landingCTA">${obj.label}</button>
      </footer>`
    }
    ,
    HiddenInput: (obj) => {
        return `<input type="hidden" id="${obj.id}" name="${obj.name}" value="${obj.value}" />
        `
    }

}

export { ALPHAFormRenderer }