import { lazy } from "react"


const TemplateManager=[

    {
        clientCode:"TGIF",
        title:"TGIF",
        description:"",
        templates:[
            {
                id:"TGIF-1ST-TOUCH",
                type:"1st_touch",
                title:"TGIF 1st Touch",
               
                editor:lazy(() => import('./TGIF/TGIF-1ST-TOUCH/Editor'))
            },
            {
                id:"TGIF-2ND-TOUCH",
                type:"2nd_touch",
                title:"TGIF 2nd Touch",
                editor:lazy(() => import('./TGIF/TGIF-1ST-TOUCH/Editor'))
            },
            // {
            //     id:"TGIF-TELEMARKETING",
            //     type:"telemarketing",
            //     title:"TGIF Telemarketing",
            //     editor:lazy(() => import('./TGIF/TGIF-1ST-TOUCH/Editor'))
            // }
        ]
    },


    // {
    //     clientCode:"ARC",
    //     title:"ARC",
    //     description:"",
    //     templates:[
    //         {
    //             id:"ARC-1ST-TOUCH",
    //             type:"1st_touch",
    //             title:"ARC 1st Touch",
               
    //             editor:lazy(() => import('./ARC-1ST-TOUCH/Editor'))
    //         }
    //     ]
    // }


       {
        clientCode:"ALPHA",
        title:"Alpha",
        description:"",
        templates:[
            {
                id:"ALPHA-1ST-TOUCH",
                type:"1st_touch",
                title:"Alpha 1st Touch",
               
                editor:lazy(() => import('./ALPHA-1ST-TOUCH/Editor'))
            }
        ]
    }


]

export default TemplateManager