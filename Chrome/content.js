(() => {
    console.log("Content script executed!");


    const leadForm = document.querySelectorAll("form table.leadForm")[0]
    const trs =leadForm.querySelectorAll("tr")
    trs.forEach((tr) => {

        
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
        }catch(error){

        }
   
        console.log(  th,td );
        

    })

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