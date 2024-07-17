const  fields=JSON.parse(`[
    {
        "type":"row",
        "children":[
            {
                "type":"input",
                "name":"CAMP_NAME",
                "required":true

            },
            {
                "type":"input",
                "name":"PRIVACY_POLICY",
                "required":true

            },
            {
                "type":"select",
                "name":"ASSET_TYPE",
                "required":true,
                "optons":[
                    {"label":"Select..","value":""},
                    {"label":"Whitepaper","value":"Whitepaper"},
                    {"label":"Ebook","value":"Ebook"}
                ]

            }
        ]
    },
    {
        "type":"row",
        "children":[
            {
                "type":"input",
                "name":"ASSET_TYPE",
                "required":true
                 
            },
            {
                "type":"input",
                "name":"ASSET_TYPE",
                "required":true
                 
            }
        ]
    },
    {
        "type":"row",
        "children":[
            {
                "type":"input",
                "name":"ASSET_TYPE",
                "required":true
                 
            }
        ]
    },
    {
        "type":"row",
        "children":[
            {
                "type":"textarea",
                "name":"ASSET_TYPE",
                "label":"EDM Abstract",
                "required":true
                 
            }
        ]
    },
    {
        "type":"row",
        "children":[
            
            {
                "type":"col",
                "children":[
                    {
                        "type":"switch",
                        "name":"SAME_AS_EDM_ABSTRACT",
                        "required":true
                        
                    },
                    {
                        "type":"textarea",
                        "name":"LANDING_ABSTRACT",
                        "required":true
                        
                    }
                ]
                 
            }
        ]
    }
]`)

export default fields;
