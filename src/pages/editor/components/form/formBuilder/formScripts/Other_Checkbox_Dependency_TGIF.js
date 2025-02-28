const Other_Checkbox_Dependency_TGIF=(API)=>{

    return {
        run:()=>{


            const {addField, updateField, loadFieldsFromJson ,setFields ,dispatch, state , fields} = API

   


    dispatch(addField({ field: { label: "Other Option Checkbox Dependency Script", type: fields.Html , 
        html : `<script>

        const checkGroupId = "CQ1";  //CheckGroup Id here
        const otherVal = "Other"; //value must start with "Other" for checkbox option
        const OtherPlaceholder="";


            const holders = document.querySelectorAll(\`.\${checkGroupId}-holder\`); // Corrected string interpolation
            holders.forEach(holder => {
                const radios = holder.querySelectorAll(".radio-option");
                for (let j = 0; j < radios.length; j++) {
                    const radio= radios[j]
                
                    const otherCheckbox=radio.querySelector(\`input[value^='\${otherVal}']\`)
                    if(otherCheckbox){
                        const val=otherCheckbox.value;

                        var inputBoxHolder = document.createElement("div");
                        inputBoxHolder.className="check-group";

                        var inputBox = document.createElement("input");
                        inputBox.type = "text";  
                        inputBox.placeholder = OtherPlaceholder;  
                        inputBox.style.display="none"
                        inputBox.addEventListener("input", function() {
                            otherCheckbox.value=otherVal+"##"+inputBox.value 
                        })

                        inputBoxHolder.append(inputBox);
                        radio.insertAdjacentElement("afterend", inputBoxHolder );

                        otherCheckbox.addEventListener("change", function() {
                            if (otherCheckbox.checked) { 
                                inputBox.style.display="block";
                                inputBox.required = true;
                            } else {
                                inputBox.style.display="none";
                                inputBox.required = false;
                                inputBox.value="";
                                otherCheckbox.value=otherVal+""+""
                            }
                        });
                        break;
                    }
                    

                } 
            });

         
        </script>
        ` 
        } 
    }))
 


        }
    }

    


}

export default Other_Checkbox_Dependency_TGIF;