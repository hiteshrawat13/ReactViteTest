const None_of_the_Above_Checkbox_Dependency_TGIF=(API)=>{

    return {
        run:()=>{


            const {addField, updateField, loadFieldsFromJson ,setFields ,dispatch, state , fields} = API

   


    dispatch(addField({ field: { label: "None of the Above Checkbox Dependency Script", type: fields.Html , 
        html : `<script>

        const checkGroupId = "CQ1";  //CheckGroup Id here
        const noneCheckboxVal = "None"; // 

            const holders = document.querySelectorAll(\`.\${checkGroupId}-holder\`); // Corrected string interpolation
            holders.forEach(holder => {
                const radios = holder.querySelectorAll(".radio-option");
                for (let j = 0; j < radios.length; j++) {
                    const radio= radios[j]
                
                    const noneCheckbox=radio.querySelector(\`input[value^='\${noneCheckboxVal}']\`)
                    if(noneCheckbox){
                        noneCheckbox.addEventListener("change", function() {
                            if (noneCheckbox.checked) { 
                                  for (let k = 0; k < radios.length; k++) {
                                    const rad=radios[k].querySelector("input")
                                    if(rad.value==noneCheckboxVal){
                                        rad.checked=true;
                                    }else{
                                        rad.checked=false; 
                                    }
                                }
                            } else {
                                
                            }
                        });
                         
                    }else{
                        radio.querySelector("input").addEventListener("change", function(e) {
                            const noneCheckbox= holder.querySelector(\`.radio-option  input[value^='\${noneCheckboxVal}']\`) 
                            noneCheckbox.checked=false;
                            console.log(noneCheckbox);
                        });
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

export default None_of_the_Above_Checkbox_Dependency_TGIF;