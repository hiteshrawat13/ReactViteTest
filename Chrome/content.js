


(() => {


    const getFieldsFromTableTRs=()=>{
        let fields=[]

        const leadFormTable = document.querySelectorAll("form > table")[0]
        if(leadFormTable==null) return fields;

        const trs =leadFormTable.querySelectorAll("tr")
        trs.forEach((tr) => {
            try {
                const th=tr.children[0]
                const td=tr.children[1]
           
                try{
                    if(th!=null){
                    
                        console.log( th.textContent?.trim() );
                    }
                }catch(error){
        
                }
        
                try{
                    if(td!=null){
                        const field=td.querySelector("input,select")
                        console.log(  field.getAttribute("aria-labelledby"),field.tagName,(field.tagName=="SELECT")?[...field.options].map(o => o.text).join(""):null );
                    }
                }catch(error){ }
        
                console.log(  th,td );
            } catch (error) {
                console.log(error);
                
            }

            
    
        })
    }

    console.log("Content script executed!");




    // Function to extract form data
function extractFormData(form) {
    const formData = [];

    // Loop through all form elements
    form.querySelectorAll('label, input, select').forEach(element => {
        let fieldData = {};

        // Extract the label text
        const label = element.closest('tr')?.querySelector('th span');
        if (label) {
            fieldData.label = label.textContent.trim();
        }

        // Check if the element is an input or select and get type/details accordingly
        if (element.tagName.toLowerCase() === 'input') {
            const type = element.getAttribute('type');
            fieldData.inputType = type;

            // Get ID and required attributes
            fieldData.id = element.id || null;
            fieldData.required = element.hasAttribute('required');

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
            fieldData.inputType = 'select';
            fieldData.id = element.id || null;
            fieldData.required = element.hasAttribute('required');

            // Extract options
            fieldData.options = [];
            element.querySelectorAll('option').forEach(option => {
                if (option.value) {
                    fieldData.options.push(option.textContent.trim());
                }
            });
        }

        // Only add fields with label and input data
        if (fieldData.label && fieldData.inputType) {
            formData.push(fieldData);
        }
    });

    return formData;
}

// Example: Get the form element and extract its data
const formElement = document.querySelector('form');
const extractedData = extractFormData(formElement);

// Display the extracted data in the console
console.log(JSON.stringify(extractedData, null, 2));

    



    // const leadFormDivs = document.querySelectorAll("form > div")
    // leadFormDivs.forEach((div) => {

    //     if(div.querySelector("button")!=null){
            
    //         console.log(div.querySelector("button").innerHTML);
    //     }


    //     //get checkbox
    //     if(div?.getAttribute("id")?.includes("gdpr")){
            
    //         console.log(div.querySelector(`input[type="checkbox"] + label`).innerHTML);
    //     }
        


        
    // })


    // Function to get the associated label text for a form element
    function getLabelText(element) {
        let labelText = "";
        if (element.id) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) labelText = label.innerText.trim();
        }
        if (!labelText && element.closest("label")) {
            labelText = element.closest("label").innerText.trim();
        }
        return labelText;
    }

    // const forms = document.querySelectorAll("form");
    // const formDataArray = Array.from(forms).map((form) => {
    //     const formData = [];
    //     const inputs = form.querySelectorAll("input, select, textarea");

    //     inputs.forEach((input) => {
    //         const labelText = getLabelText(input);
    //         const name = input.name || input.id || "unnamed_field";
    //         const value = input.value || "";

    //         formData.push({
    //             label: labelText,
    //             name: name,
    //             value: value,
    //             type: input.type || input.tagName.toLowerCase(),
    //         });
    //     });

    //     return {
    //         action: form.action,
    //         method: form.method,
    //         fields: formData,
    //     };
    // });

    //console.log("Extracted form data with labels:", JSON.stringify(formDataArray, null, 2));
})();