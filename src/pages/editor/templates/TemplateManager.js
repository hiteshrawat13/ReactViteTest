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
               
                editor:lazy(() => import('./TGIF-1ST-TOUCH/Editor'))
            }
        ]
    }
]

export default TemplateManager