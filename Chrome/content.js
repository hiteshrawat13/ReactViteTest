


(() => {


     
    console.log("Content script executed!");




    // Function to extract form data
function extractFormData(form) {
 
    const formData = [];

    // Loop through all form elements
    form.querySelectorAll('input, select').forEach(element => {
        let fieldData = {};

        // Extract the label text
        const label = element.closest('tr')?.querySelector('th span');
        
        if (label) {
            fieldData.label = label.textContent.trim();
        }else{
            fieldData.label = element.closest("tr")?.previousElementSibling?.textContent?.trim()
        }




        if(element.hasAttribute("aria-labelledby")){
            fieldData.id =element.getAttribute("aria-labelledby").trim().replaceAll(" ","_");
        }else{
            if (label) {
                fieldData.id =label.textContent.trim().replaceAll(" ","_");
            }else{
                // Get ID and required attributes
                fieldData.id = element.id || null;
            }
        }
      

        // Check if the element is an input or select and get type/details accordingly
        if (element.tagName.toLowerCase() === 'input') {
            const type = element.getAttribute('type');

         

            fieldData.type="TextBox"
            if(type=="text"){
                fieldData.inputType = "text";
            }else if(type=="email"){
                fieldData.inputType = "email";
            }else if(type=="tel"){
                fieldData.inputType = "number";
            }else{
                fieldData.inputType = "text";
            }

            fieldData.isRequired = element.hasAttribute('required');
            fieldData.isDisabled = element.hasAttribute('disabled');
            fieldData.isReadOnly = element.hasAttribute('readonly');
           
           

            fieldData.name = "";
           
            

            // For radio buttons, we might want to gather the options too
            if (type === 'radio') {
                fieldData.options = [];
                const name = element.getAttribute('name');
                const radioButtons = form.querySelectorAll(`input[name="${name}"]`);
                radioButtons.forEach(rb => {
                    fieldData.options.push(rb.nextElementSibling.textContent.trim());
                });
            }
        } else if (element.tagName.toLowerCase() === 'select') {
            fieldData.type = 'SelectBox';
            fieldData.isFullWidth = false;
            fieldData.isRequired = element.hasAttribute('required');
            fieldData.isDisabled = element.hasAttribute('disabled');
            fieldData.isReadOnly = element.hasAttribute('readonly');
            fieldData.name = "";
            // Extract options
            fieldData.options = [];
            element.querySelectorAll('option').forEach(option => {
                //if (option.value) {
                   const dis=(option.hasAttribute('disabled')) ?true:false
                    fieldData.options.push({
                        label:option.textContent.trim(),
                        value:(dis==true)?"":option.textContent.trim(),
                        //...dis
                    });
               // }
            });
        }

        // Only add fields with label and input data
        if (fieldData.label && fieldData.type) {
            formData.push(fieldData);
        }
    });




 



    //checkbox
     form.querySelectorAll("[id$=ukgdpr] .custom-checkbox").forEach(custom_checkbox => {

        const lbl=custom_checkbox.querySelector("label")
        const inpt=custom_checkbox.querySelector("[type=checkbox]")
        if(lbl){
           const lbltxt= lbl.innerHTML.trim()
           if(lbltxt){
            formData.push({
                "type": "CheckBox",
                "id": inpt.getAttribute("aria-labelledby"),
                "label": lbltxt,
                "name": "",
                "value": "optin-yes",
                "isRequired": inpt.hasAttribute("required"),
                "isDisabled": false,
                "isReadOnly": false
            });
           }
        }
     })



     ///Checkgroup
     const checkboxes=form.querySelectorAll("div .custom-checkbox")
     if(checkboxes.length>0){
        const lbl=checkboxes[0].closest("tr")?.previousElementSibling?.textContent?.trim()
        const checkgroup={
            "type": "CheckGroup",
            "id": "cq1",
            "label": lbl,
            "name": "",
            "isRequired": false,
            "isDisabled": false,
            "isReadOnly": false,
            "options": [ ]
        }

        let opts=[]
        checkboxes.forEach(custom_checkbox => {
            const lbl=custom_checkbox.querySelector("label")
            const inpt=custom_checkbox.querySelector("[type=checkbox]")
            if(lbl){
               const lbltxt= lbl.innerHTML.trim()
               if(lbltxt){
                 opts.push({
              
                    "label": lbltxt,
                    "value":lbltxt,
                    
                });
               }
            }
         })
         checkgroup.options=opts
         formData.push( checkgroup );
     }



     //Text
     const ukgdprs=form.querySelectorAll("[id$=ukgdpr]")
     if(ukgdprs.length){

        ukgdprs.forEach(ukgdpr => {
           const hasInputs= ukgdpr.querySelectorAll("input")
           if(!hasInputs.length){
            
                 formData.push({
                     "type": "Text",
                     "id":"text-"+Math.floor(Math.random() * 6) + 1,
                     "label": ukgdpr.innerHTML
                   });
           }


        })

        //  formData.push({
        //      "type": "CTA",
        //      "id":"cta_button",
        //      "label": cta
        //    });
     }
 
     
    // CTA
        const cta=form.querySelector("[type='submit']")?.textContent?.trim()
        if(cta){
            formData.push({
                "type": "CTA",
                "id":"cta_button",
                "label": cta
              });
        }
     

    return formData;
}


function copyText(text = 'ok') {
    // if (navigator.clipboard) {
    //   return navigator.clipboard.writeText(text);
    // }

    const readOnlyTextArea = document.createElement('textarea');
    readOnlyTextArea.value = text;

    readOnlyTextArea.setAttribute('readonly', true);
    readOnlyTextArea.style.position = 'absolute';
    readOnlyTextArea.style.left = '-9001px';

    document.body.appendChild(readOnlyTextArea);

    readOnlyTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(readOnlyTextArea);
    alert("✅ Copied Form JSON\n Please verify all fields.These are not exact fields.")
  }

// Example: Get the form element and extract its data
const formElement = document.querySelector('form');
const extractedData = extractFormData(formElement);

// Display the extracted data in the console
const json=JSON.stringify(extractedData, null, 2)
 console.log(json);
 
if(extractedData.length>0){
    copyText(json)
}else{
    alert("No form fields found.")
}


 

  
})();