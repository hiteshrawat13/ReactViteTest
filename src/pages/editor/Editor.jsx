import React,{useEffect, useRef} from 'react'


import Stepper from './components/stepper/Stepper';
import Step from './components/stepper/Step';
import TextBox from './components/form/TextBox';
import Form from './components/form/Form';


const Editor = () => {

  const formRef=useRef()

  useEffect(() => {
    const importComponent = async () => {
      const test = await import('http://localhost:5173/cbtool/test.js');
      console.log("TEST11111",new test.Test().hi());
    };

  //  importComponent();
  }, []);



  const handleSubmit=(data)=>{
    alert(data)
  }


  return (
    <div>
      {/* TESTING THIS EDITOR PAGE NOT USABLE NOW */}
      


    <Stepper>
      <Step title="Basic Info">
        Step 1

        <Form onSubmit={handleSubmit}>

        </Form>
   

      </Step>
      <Step title="Abstract & Title">
        Step 2
      </Step>
      <Step title="Form">
        Step 3
      </Step>
      <Step title="Logo & Assets">
        Step 4
      </Step>
    </Stepper>

    </div>
  )
}

export default Editor