import React, { useEffect, useRef,useCallback,forwardRef ,useImperativeHandle,useState} from 'react'
import { json } from 'react-router-dom';

const Preview = forwardRef(({ publishHelper }, ref) => {

    const [buttons,setButtons] = useState(publishHelper.getPreviewPages())

    const iframeRef=useRef()

    const loadHtml=(html)=>{
        var s =html;
        var blob = new Blob([s], {type: "text/html; charset=utf-8"});
        iframeRef.current.src = URL.createObjectURL(blob);
    }

    const handlePreview=async (page,e=null)=>{
        e?.preventDefault()
       
        const html=await publishHelper.getPreview(page)
        //console.log(html,"WWWWWWWWWWWWWWWWWWWWW");
        loadHtml(html)
    }


    useImperativeHandle(ref, () => ({
        handleUpdatePreviewButtons
      }));


      const handleUpdatePreviewButtons= () => {

        setButtons(publishHelper.getPreviewPages())

        const page1=buttons[0]
        handlePreview(page1)
      }

 

  return (
    <>

   

    {
        buttons.map((page,i) => {
            return <button onClick={(e)=>handlePreview(page,e)} key={i}>{page}</button>
        })
    }
    
    <br></br>
    <iframe ref={iframeRef} style={{width: "calc(100% - 70px)",height:"calc(100% - 70px)",minHeight:"1000px"}}></iframe>
    
    </>
  )
})

export default Preview