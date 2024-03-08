 const server_data=[
   
    {
        
        type:"TextBox",
        data:"edmTitle",
        label:"Edm Title"
    },
    {
        type:"Textarea",
        data:"edmAbstract",
        label:"Edm Abstract"
    }, 
    {
        type:"checkbox",
        data:"sameAsEdmTitle",
        label:"Same As EDM Title",
        onCheck:{hide:"LandingTitle"},
        onUncheck:{show:"LandingTitle"}
    },
    {
        id:"LandingTitle",
        type:"TextBox",
        data:"landingTitle",
        label:"Landing Title"
    },
    {
        type:"Textarea",
        data:"landingAbstract",
        label:"Landing Abstract"
    }
    
]
export default  server_data