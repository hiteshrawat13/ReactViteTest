import { useScript } from '@uidotdev/usehooks';
import React, { lazy, useEffect } from 'react'



const Test = () => {

 

  

  React.useEffect( () => {
  //load module from server
    import('http://localhost:8888/hi').then(kk=>{
      console.log(new kk.Helper().getPreview());
    })

    

  }, []);

  return (
    <div>Test</div>
  )
}

export default Test