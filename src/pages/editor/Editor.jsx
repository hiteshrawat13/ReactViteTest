import React from 'react'


import "./Editor.scss"


const Editor = () => {
  return (
    <>

    <label>
      <span>Link Name</span>
      <input  name="linkName" />
    </label>

    <label>
      <span>Camp Id</span>
      <input  name="linkName" />
    </label>

    <label>
      <span>Pixel Link</span>
      <input  name="linkName" />
    </label>

    <label>
      <span>Asset Type</span>
      <input  name="linkName" />
    </label>

    <label>
      <span>Privacy Policy</span>
      <input  name="linkName" />
    </label>

    <label>
      <span>Sponsored By Text</span>
      <input  name="linkName" />
    </label>

    <hr/>

    <label>
      <span>EDM Page Title</span>
      <input  name="edmTitle" />
    </label>

    <label>
      <span>EDM Page Title</span>
      <input  name="edmTitle" />
    </label>


    <label>
      <span>EDM Page Title</span>
      <input  name="edmTitle" />
    </label>
      

    <label>
      <span>EDM Page Abstract</span>
      <input  name="edmAbstract" />
    </label>


    <label>
      <span>Landing Page Title</span>
      <input  name="landingTitle" />
    </label>

    <label>
      <span>Landing Page Abstract</span>
      <input  name="landingAbstract" />
    </label>


    <label>
      <span>Landing Page Abstract</span>
      <input  name="landingAbstract" />
    </label>

    <label>
      <span>EDM CTA</span>
      <input  name="landingAbstract" />
    </label>


    <label>
      <span>Landing CTA</span>
      <input  name="landingAbstract" />
    </label>

    <hr/>
    <label>
      <span>Logo</span>
      <input type="text"/><br/>
      
      <input type="file" name="pdf" />
    </label>
    <label>
      <span>Thumbnail</span>
      <input type="text"/><br/>
      <input type="file" name="pdf" />
    </label>
    <hr/>
    <label>
      <span>Asset Type</span>
      <select name="" id="">
        <option value="">PDF</option>
        <option value="">MP4</option>
        <option value="">Client Link</option>
        <option value="">IFRAME Html</option>
      </select>
    </label>

    

    <label>
      <span>Asset PDF</span>
      <input type="text"/><br/>
      <input type="file" name="pdf" />
    </label>

    <label>
      <span>MP4</span>
      <input type="text"/><br/>
      <input type="file" name="pdf" />
    </label>

    <label>
      <span>Client Link</span>
      <input type="text" name="clientLink" />
    </label>

    <label>
      <span>Iframe Html</span>
      <input type="text" name="clientLink" />
    </label>






   



  


    </>
  )
}

export default Editor