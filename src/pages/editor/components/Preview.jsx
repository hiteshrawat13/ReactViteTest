import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState, useContext } from 'react'
import { json } from 'react-router-dom';
import { StepperContext } from './stepper/StepperContext';
import { load } from 'cheerio/lib/slim';
import { useSelector } from 'react-redux';
const Preview = forwardRef(({publishHelper }, ref) => {
  const {  logoFileRef,thumbnailFileRef} = useContext(StepperContext)
  const {data} = useSelector(state => state.campaignData)
  const [buttons, setButtons] = useState(null)

  useEffect(() => {

    


    const loadButtons = async () => {

      setButtons(await publishHelper.getPageFiles({ 
        forPreview: true ,
        logoDataUrl:await getBase64(logoFileRef.current.files[0]),
        thumbnailDataUrl:await getBase64(thumbnailFileRef.current.files[0]),
        state:data
      }))
    }

   
    
    loadButtons()

  }, [])


  const getBase64=(file)=> {

      return new Promise((resolve,reject)=>{

          //const NO_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQJQTFRF////9vb26urq/f39/v7+6enp9/f34uLi1tbW4ODg7u7ura2tqKioq6ur8vLy2tra9fX1w8PD0dHRqampu7u72dnZ1dXV5OTkrKyswcHB5eXlv7+/0NDQsbGxs7Oz4+Pj4eHh6+vrsLCw3d3dtbW1y8vLwsLCxMTEycnJr6+vsrKy3Nzc7Ozsrq6u/Pz87+/v+fn5uLi45ubm+Pj4urq6xcXFysrK8/Pz9PT0qqqqvr6++/v7zMzMxsbGt7e329vb8PDw2NjYyMjItLS0z8/Pubm5x8fH8fHx+vr67e3t1NTUzc3N0tLSzs7OwMDA09PT19fXvb293t7etra239/f6OjoADPkJQAAA8RJREFUeJztl+tTUkEUwM/CFZKHYmoqFErlmAqkNKVFRC81p5ppqv+yaepDD2vsNZUWRphUFORQUhlZiISDyMXbnt17i0Z7KHdqpnE/cA+7d8/v7tk9Z88h8Bca+dsQQkiRCQJZ4gLoaB9ZFFWEGKnCDArVRXEBnxZSYO9UpNSD1OZhwycU6nOGj/TRQLLm2Y1ixRxY3qoHMZCUMQnKSohJqn2D/S2foD6uGqSaJBtfiwqkddoa5QNt7za/UA2yKdo21fxMhgh12ZanfMCaqUmoBrGGK7WbTBN8T3ZOOsLyQNcr2D6uHgS6Y1Q/g3iirSFlxCxpMipCnK9NtiAzl75ixyNlxBXf9kRFCOyOdAQYxBNtfKWMmKXOh2pCemNQ0KO5DBqSk12dGF1j5Xj9MghsTluTuBLtnrDiHduS7pEyGCtAvJl41zj6iS/UfZf1C/seF/LqQsAf1OcRcvAR7L5F/7vrAjzaqAkR/A+BxS5/EBx5e8Qetkck1SBmC/drR2OYm8fZNEp/9bs+luOJ8NtLa+AmwJGh8hD/4GZch6xD1iHrEJUhgwnMs3SSWBLYnSDnXlCVqyzNWNy24TY+pJW07GlM/wmkNp+jyfyWWeDpNm2CKwYHrnCxNeGIKBd9ly0+RR81844gwInbMvanV/SPkK0TmNubCi1B3tP8WSK9w0z0RF3hqve825NLeHQx0pF93BEAOHnrMNMy9NMreiVI0/TRi7zHNtf7QIb4QqLQPsbEKkmqnGGSdQ998fgddkv/oq0EWdLYn7OOnmd9qSCHeJdMybhux32O7rpXMm1tkIVDo/kCn17XLENOXxcXfKGGScAEQ7+l9D5eI8QbZMmQO94S8cqQfRNCumG+7wIVD42Zp0tVrA2S612K4tZ3vtGl/BxCjDQx1tZn5+np3j+uo+WdO4JTOsdx43uqqDh3c3WQYv8Ibv2Za0JahmwQ8GsPBzBV6h/BI64x4JSmGELY7IHzq4RoDD03wDFDzSJDkIfHeOMUrgRLSC89vOZFNOsazVUEeypf8IVoAckhBo1jK32heBt8V+HUcPU7PuHsUFmQU8PdXxLVU6IMOflNi/8yDN7VF9NqQHa91FemcQMYhIYUganVGKS8CH2jtpdqQKCGOsriogzxRJWiqz1BQ8vAk6yuHd2SrrcsiDUD7HMZxBdS1Bx9gKHFGSewVzcpfkDrKUcYZu4tV78cYnYGqPp2C1ZV1EKD5wA9/eAlMINWDuNy+WVxPcdo6HnhGcL18LHvdeyvIKtpx25Qxp/Wkf/P9fsVAGO0QhHG300AAAAASUVORK5CYII="
          try{
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function () {
              
                resolve(reader.result)
              };
              reader.onerror = function (error) {
                  //resolve(NO_IMAGE)
                  resolve(null)
                  
              };
          }catch(error){
              //resolve(NO_IMAGE)
              resolve(null)
          }
      })
   }



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
    iframeRef.current.contentDocument.getElementById('sponsorLogo').width = e.target.value;
  }

  const changeWidthLiveThumbnail = (e) => {
    iframeRef.current.contentDocument.getElementById('edmThumbnail').width = e.target.value;
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
        <iframe ref={iframeRef}   style={{ 'margin-top': '2px', width: "calc(100% - 70px)", height: "calc(100% - 70px)", minHeight: "500px" }}></iframe>
      </div>



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

      </span>


    </div>
  )
})

export default Preview