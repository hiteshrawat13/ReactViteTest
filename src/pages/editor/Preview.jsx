import React, { useEffect, useRef,useCallback } from 'react'
import { json } from 'react-router-dom';

const Preview = ({publishHelper}) => {
    const iframeRef=useRef()

    const loadHtml=(html)=>{
        var s =html;
        var blob = new Blob([s], {type: "text/html; charset=utf-8"});
        iframeRef.current.src = URL.createObjectURL(blob);
    }

    const handlePreview=async (e)=>{
        e.preventDefault()
        console.log(e.target.dataset);
        const page=e.target.dataset.page;
        const html=await publishHelper.getPreview(page)
        console.log(html,"WWWWWWWWWWWWWWWWWWWWW");
        loadHtml(html)
    }

 

  return (
    <>

   

    {
        publishHelper.getPreviewPages().map((page,i) => {
            return <button onClick={handlePreview} key={i} data-page={page}>{page}</button>
        })
    }
    
    <br></br>
    <iframe ref={iframeRef} style={{width: "calc(100% - 70px)",height:"calc(100% - 70px)",minHeight:"1000px"}}></iframe>
    
    </>
  )
}

export default Preview