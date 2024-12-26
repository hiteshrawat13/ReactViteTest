import React, { useCallback, useEffect } from 'react'

const ClipboardImagePaste = ({fileInputRefDummy}) => {


 
    
    const pasteHandler = useCallback((event) => {
       
                 
                 // Get the data of clipboard
                const clipboardItems = event.clipboardData.items;
                
                const items = [].slice.call(clipboardItems).filter(function (item) {
                    // Filter the image items only
                    return item.type.indexOf('image') !== -1;
                });
                if (items.length === 0) {
                  alert("Clipboard is empty.")
                    return;
                }

                const item = items[0];
                // Get the blob of image
                const blob = item.getAsFile();
                //fileRef.files = dataTransfer.files;

                let file = new File([blob], Math.random()+"-img.png",{type:item.type, lastModified:new Date().getTime()});
                let container = new DataTransfer();
                container.items.add(file)
                
                fileInputRefDummy.current.files = container.files;

            
                
          
                fileInputRefDummy.current.dispatchEvent(new Event('change'));

                console.log(fileInputRefDummy.current.files);
                alert("Image pasted.")
        
      }, []);

    useEffect(() => {
        window.addEventListener('paste', pasteHandler);
    
      return () => {
        window.removeEventListener('paste', pasteHandler);
      }
    }, [])
    

  return (
    <div  className='drop-zone'>Press CTRL + V to paste copied image to the file input</div>
  )
}

export default ClipboardImagePaste