import React,{useEffect, useRef} from 'react'


import Stepper from './components/stepper/Stepper';
import Step from './components/stepper/Step';
import TextBox from './components/form/TextBox';
import Form from './components/form/Form';


const Editor = () => {

  const stepperRef=useRef()

  useEffect(() => {
    const importComponent = async () => {
      const test = await import('http://localhost:5173/cbtool/test.js');
      console.log("TEST11111",new test.Test().hi());
    };

  //  importComponent();
  }, []);






  return (
    <div>
      {/* TESTING THIS EDITOR PAGE NOT USABLE NOW */}
      


    <Stepper ref={stepperRef}>
      <Step title="Basic Info"  >
        Step 1
        Step 1
        <TextBox label="Campaign Name" name="camp_name" required={true}/>
      </Step>
      <Step title="Abstract & Title">
        Step 2
        <TextBox label="Campaign Name" name="camp_name" required={true}/>
      </Step>
      <Step title="Form">
        Step 3
        <TextBox label="Campaign Name" name="camp_name" required={true}/>
      </Step>
      <Step title="Logo & Assets">
        Step 4
        <TextBox label="Campaign Name" name="camp_name" required={true}/>
      </Step>
    </Stepper>

    </div>
  )
}

export default Editor