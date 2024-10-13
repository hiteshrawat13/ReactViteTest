import JoditEditor from 'jodit-react';
import React, { useMemo } from 'react'

const Jodit = ({value="",onChange}) => {



    
  const config = useMemo(
    () => ({


      events: {
        paste: e => {
            const newContent = e.target.innerHTML.replace(/a/g,"--------"); // remove font-family...
            e.value = newContent;
            e.target.value = newContent;
            e.target.innerHTML = newContent;
            alert("ON Paste")
            console.log(e)
            return e;
        }

        ,afterPaste:e=>{
          console.log("onPaser",e)
          e.value="EEEEEEEEEEEEE"
         return e;
        }
    },

      style: { font: "14px Arial", },
      height: 210,
    readonly: false,
    placeholder: '',
    defaultActionOnPaste: 'insert_as_html',
    defaultLineHeight: 1.5,
    
    enter: '',
toolbarButtonSize: 'small',
    statusbar: false,
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    toolbarAdaptive: false,
    buttons: [
              'source', '|',
              'bold',
              'strikethrough',
              'underline',
              'italic', '|',
              'ul',
              'ol', '|',
              'outdent', 'indent',  '|',
              'font',
              'fontsize',
              'brush',
              'paragraph', '|',
              'image',
              'video',
              'table',
              'link', '|',
              'align', 'undo', 'redo', '|',
              'hr',
              'eraser',
              'copyformat', '|',
              'symbol',
              'fullsize',
             
          ]


    }),
    [],
   );

  return (
    <div>
        
          <JoditEditor
           // ref={editor}
            value={value}
            config={config}
            tabIndex={1} // tabIndex of textarea
          //  onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
            onChange={onChange  }
          />

    </div>
  )
}

export default Jodit