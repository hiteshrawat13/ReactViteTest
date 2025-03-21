const Other_Checkbox_Dependency_TGIF=(API)=>{

    return {
        run:()=>{


            const {addField, updateField, loadFieldsFromJson ,setFields ,dispatch, state , fields} = API

   


    dispatch(addField({ field: { label: "Selectbox_Other_option_Dependency_Script", type: fields.Html , 
        html : `<script>
		 function addSelectBoxOtherDependency({selectboxID,otherVal,OtherPlaceholder}){
			 

			const selectbox = document.querySelector(\`#\${selectboxID}\`);
			const otherOption=	selectbox.querySelector(\`option[value='\${otherVal}']\`)
			
			var inputBoxHolder = document.createElement("div");
			inputBoxHolder.className="check-group";

		   var inputBox = document.createElement("input");
		   inputBox.type = "text";  
		   inputBox.placeholder = OtherPlaceholder;  
		   inputBox.style.display="none";
		   inputBox.style.width="96%";
		   inputBox.style.marginTop="15px";
		   inputBox.addEventListener("input", function() {
			otherOption.value=otherVal+"##"+inputBox.value 
		   })
		   
			inputBoxHolder.append(inputBox);
			selectbox.insertAdjacentElement("afterend", inputBoxHolder );
			selectbox.addEventListener("change", function() {
			
								if (selectbox.value.startsWith(otherVal)) { 
									inputBox.style.display="block";
									inputBox.required = true;
								} else {
									inputBox.style.display="none";
									inputBox.required = false;
									inputBox.value="";
									otherOption.value=otherVal+""+""
								}
			});
		}//End of addSelectBoxOtherDependency()

        
        addSelectBoxOtherDependency({
			selectboxID:"Job_Function",
			otherVal:"Other",
			OtherPlaceholder:"Please Specify"
		})   

        </script>
        ` 
        } 
    }))
 


        }
    }

    


}

export default Other_Checkbox_Dependency_TGIF;