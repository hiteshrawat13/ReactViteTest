import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState, useContext } from 'react'
import { json } from 'react-router-dom';
import { StepperContext } from './stepper/StepperContext';
import { load } from 'cheerio/lib/slim';
import { useSelector } from 'react-redux';
import { TextBox } from './form';
const Preview = forwardRef(({publishHelper,filesRef}, ref) => {
 // const {  logoFileRef,thumbnailFileRef} = useContext(StepperContext)
  const {data} = useSelector(state => state.campaignData)
  const [buttons, setButtons] = useState(null)

  useEffect(() => {

    


    const loadButtons = async () => {

      setButtons(await publishHelper.getPageFiles({ 
        forPreview: true ,
       /// logoDataUrl:await getBase64(logoFileRef.files[0]),
       // thumbnailDataUrl:await getBase64(thumbnailFileRef.files[0]),
        filesRef:filesRef,
        state:data
      }))
    }

   
    
    loadButtons()

  }, [])






  const iframeRef = useRef()

  const loadHtml = (html) => {
    var s = html;
    var blob = new Blob([s], { type: "text/html; charset=utf-8" });
    iframeRef.current.src = URL.createObjectURL(blob);
  }

  const handlePreview = async (page, e = null) => {
    e?.preventDefault()

    const html = buttons[page].data
    //console.log(html,"WWWWWWWWWWWWWWWWWWWWW");
    loadHtml(html)

  }


  useImperativeHandle(ref, () => ({
    handleUpdatePreviewButtons
  }));


  const handleUpdatePreviewButtons = () => {

    setButtons(publishHelper.current.getPreviewPages())

    const page1 = buttons[0]
    handlePreview(page1)
  }


  const changeWidthLiveLogo = (e) => {
    iframeRef.current.contentDocument.getElementById('splogo').style.width = e.target.value;
  }

  const changeWidthLiveThumbnail = (e) => {
    iframeRef.current.contentDocument.getElementById('thumbnail').style.width = e.target.value;
  }

  return (
    <div style={{ display: 'flex' }}>

      <div className="iframOuter" style={{ width: '100%' }}>
        {
          buttons?.map((page, i) => {

            try{
              const tabName=page.name.substring(  page.name.lastIndexOf("-")+1  , page.name.length);
              return <button className='previewBtns' onClick={(e) => handlePreview(i, e)} key={i}>{tabName}</button>
            }catch(error){
              return <button className='previewBtns' onClick={(e) => handlePreview(i, e)} key={i}>{page.name}</button>
            }
          })
        }

        <br></br>
        <iframe ref={iframeRef}   style={{ 'margin-top': '2px', width: "calc(100%)", height: "calc(100%)", minHeight: "500px" }}></iframe>
      </div>


{/* 
      <span style={{
        background: 'white',
        'display': 'inline-block',
        'height': 'fit-content',
        'padding': '10px',
        'marginTop': '25px',
        width:"20%"
      }}>

        <h4 style={{ 'marginBottom': '10px', 'marginTop': '0px' }}>Editor :</h4>

        <label htmlFor="" style={{ 'marginBottom': '10px' }}>Sponsor Logo Width</label>



    <input type="number" style={{ 'padding': '5px' }} defaultValue={200} name="LOGO_WIDTH" onChange={changeWidthLiveLogo} />  

      
        <label htmlFor="" style={{ 'marginBottom': '10px' }}>Thumbnail Width</label>
        <input type="number" style={{ 'padding': '5px' }} defaultValue={300} name="THUMBNAIL_WIDTH" onChange={changeWidthLiveThumbnail} />

      </span> */}
      <div>  

      
    
      </div>
    </div>
  )
})

export default Preview