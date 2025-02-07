import US_Canada_State_Province_Dependency from "./US_Canada_State_Province_Dependency";
import Australia_NewZealand_State_Region_Dependency from "./Australia_NewZealand_State_Region_Dependency";

const FormScripts=(API)=> {
    return{
        list:[
            {title:"US Canada Dependency TGIF",script:US_Canada_State_Province_Dependency(API)},
            {title:"Australia NewZealand Dependency TGIF",script:Australia_NewZealand_State_Region_Dependency(API)},
            
        ],
        
    } 
}

export default FormScripts;