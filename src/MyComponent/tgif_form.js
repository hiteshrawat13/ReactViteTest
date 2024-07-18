const  fields=[
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"CLIENT_CODE",
                label:"Client Code",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"CAMP_NAME",
                label:"Campaign Name",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"CAMP_ID",
                label:"Campaign Id",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"LINK_NAME",
                label:"Link Name",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"PIXEL_LINK",
                label:"Pixel Link",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"select",
                name:"REGION",
                label:"Region",
                required:true,
                options:[
                    { label:"Select..",value:"" },
                    { label:"NON-EU",value:"NON-EU" },
                    { label:"EU",value:"EU" }
                ]
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"select",
                name:"ASSET_TYPE",
                label:"Asset Type",
                required:true,
                options:[
                    { label:"Whitepaper",value:"Whitepaper" },
                    { label:"Webinar",value:"Webinar" }
                ]
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"SPONSORED_BY_TEXT",
                label:"Sponsored By Text",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"EDM_TITLE",
                label:"EDM Title",
                required:true,
                readOnly:true,
                style:{}
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"textarea",
                name:"EDM_ABSTRACT",
                label:"EDM Abstract",
                required:true,
                readOnly:true,
                style:{}
                
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"EDM_OPTIN",
                label:"EDM Optin",
                required:true,
                readOnly:true,
                value:"By clicking/downloading the asset, you agree to allow the sponsor to have your contact information and for the sponsor to contact you."
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"checkbox",
                name:"SAME_AS_EDM_TITLE",
                label:"Same as EDM title"
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"LANDING_TITLE",
                label:"Landing Title",
                required:true,
                readOnly:true,
                 showIfChecked:"SAME_AS_EDM_TITLE"
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"checkbox",
                name:"SAME_AS_EDM_ABSTRACT",
                label:"Same as EDM abstract" 
               
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"textarea",
                name:"LANDING_ABSTRACT",
                label:"Landing Abstract",
                required:true,
                readOnly:true,
                 showIfChecked:"SAME_AS_EDM_ABSTRACT"
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"button",
                label:"Done",
            }
        ]
    },
]

export default fields;
