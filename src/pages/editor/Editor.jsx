import React from 'react'


import "./Editor.scss"


const Editor = () => {
  return (
    <>
    
<div className="tabs">
  <input className="input" name="tabs" type="radio" id="tab-1" defaultChecked="checked"/>
  <label className="label" htmlFor="tab-1">Basic Info</label>
  <div className="panel">
    <h1>Arlina Design</h1>
    <p>Arlina Design (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae</p>
    <p>The fruit of the Citrus × sinensis is considered a sweet orange, whereas the fruit of the Citrus × aurantium is considered a bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of sweet orange arise through mutations.</p>
  </div>
  <input className="input" name="tabs" type="radio" id="tab-2"/>
  <label className="label" htmlFor="tab-2">Content</label>
  <div className="panel">
    <h1>Idntheme</h1>
    <p>Idntheme (Citrus tangerina) is an orange-colored citrus fruit that is closely related to, or possibly a type of, mandarin orange (Citrus reticulata).</p>
    <p>The name was first used for fruit coming from Tangier, Morocco, described as a mandarin variety. Under the Tanaka classification system, Citrus tangerina is considered a separate species.</p>
  </div>
  <input className="input" name="tabs" type="radio" id="tab-3"/>
  <label className="label" htmlFor="tab-3">Assets</label>
  <div className="panel">
    <h1>Tekno Match</h1>
    <p>Tekno Match (Citrus ×clementina) is a hybrid between a mandarin orange and a sweet orange, so named in 1902. The exterior is a deep orange colour with a smooth, glossy appearance. Clementines can be separated into 7 to 14 segments. Similarly to tangerines, they tend to be easy to peel.</p>
  </div>

  <input className="input" name="tabs" type="radio" id="tab-4"/>
  <label className="label" htmlFor="tab-4">Form</label>
  <div className="panel">
    <h1>Form 1</h1>
    <p>Tekno Match (Citrus ×clementina) is a hybrid between a mandarin orange and a sweet orange, so named in 1902. The exterior is a deep orange colour with a smooth, glossy appearance. Clementines can be separated into 7 to 14 segments. Similarly to tangerines, they tend to be easy to peel.</p>
  </div>
</div>
    </>
  )
}

export default Editor