import US_Canada_State_Province_Dependency from "./US_Canada_State_Province_Dependency";

const FormScripts=(API)=> {
    return{
        list:[
            {title:"US Canada Dependency",script:US_Canada_State_Province_Dependency(API)},
            
        ],
        
    } 
}

export default FormScripts;