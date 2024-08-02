import React, { useState } from 'react'
 
const Stepper = ({ children, onStepChange = null }) => {
    const [step, setStep] = useState(0)

    const handleTabChange = (e, i) => {
        e.preventDefault()
        setStep(i)
        if (onStepChange) onStepChange(i)
    }
    const handleNext = (e) => {
        e.preventDefault()
        setStep((step) => { return (step + 1 < children.length) ? step + 1 : children.length })
        if (onStepChange) onStepChange(step)
    }
    const handlePrevious = (e) => {
        e.preventDefault()
        setStep((step) => { return (step - 1 > 0) ? step - 1 : 0 })
        if (onStepChange) onStepChange(step)
    }
    return <div className='steps'>
        <div className='tabs'>
            {
                children.map((child, i) => {
                    return <button key={i} onClick={(e) => handleTabChange(e, i)} className={`tab ${(step == i) ? 'selected' : ''}`}> {child.props.title || `Step ${i}`} </button>
                })
            }
        </div>
        {
            children.map((child, i) => {
                return (i == step) && <div key={i}  >{child}</div>  
            })
        }

        {/* <div>
        {(step>0) && <button onClick={handlePrevious}>Previous</button>}
        {(step<children.length-1) && <button onClick={handleNext}>Next</button>}
        </div> */}
         
    </div>
}

export default Stepper