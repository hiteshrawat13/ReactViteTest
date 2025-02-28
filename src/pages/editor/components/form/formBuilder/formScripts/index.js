import US_Canada_State_Province_Dependency from "./US_Canada_State_Province_Dependency";
import Australia_NewZealand_State_Region_Dependency from "./Australia_NewZealand_State_Region_Dependency";

import Other_Checkbox_Dependency_TGIF from "./Other_Checkbox_Dependency_TGIF";
import None_of_the_Above_Checkbox_Dependency_TGIF from "./None_of_the_Above_Checkbox_Dependency_TGIF copy";
const FormScripts=(API)=> {
    return{
        list:[
            {title:"US Canada Dependency TGIF",script:US_Canada_State_Province_Dependency(API)},
            {title:"Australia NewZealand Dependency TGIF",script:Australia_NewZealand_State_Region_Dependency(API)},
            
            {title:"Other Checkbox Dependency TGIF",script:Other_Checkbox_Dependency_TGIF(API)},
            {title:"None_of_the_Above_Checkbox_Dependency_TGIF",script:None_of_the_Above_Checkbox_Dependency_TGIF(API)},
            
            
            
            
            
        ],
        
    } 
}

export default FormScripts;