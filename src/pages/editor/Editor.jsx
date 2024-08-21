import React, { Suspense, useEffect, useRef, useState } from 'react'


import ArcEditor from './templates/ARC-1ST-TOUCH/Editor';

const Editor = () => {

  const [editor, setEditor] = useState(null)

  //   useEffect(()=>{
  //     const importComponent = async () => {
  //       const module = await import('http://localhost:5173/cbtool/template_files/ARC-1ST-TOUCH/Editor.jsx');
  //       const Editor = module.default;
  //       setEditor(<Editor />)


  //     };
  //     importComponent();
  // },[])
  //const LazyComponent = React.lazy(() => import('./components/Editor'));



 

  return (
    <div>

      {/* <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
      </Suspense> */}

        <ArcEditor/>



     

    </div>
  )
}

export default Editor