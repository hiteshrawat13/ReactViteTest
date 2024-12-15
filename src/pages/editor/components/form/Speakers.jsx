import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Modal from 'react-responsive-modal'
import { FileInput } from '.'
import SpeakerImageInput from './SpeakerImageInput'
const Speakers = ({ filesRef ,name="SPEAKERS"}) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const [speakers, setSpeakers] = useState((campaignDataState.data[name]!=undefined && campaignDataState.data[name].includes("["))?JSON.parse(campaignDataState.data[name]) : [])
  const [showAddSpeakerModal, setShowAddSpeakerModal] = useState(false)
  
  const { register, unregister, setValue, formState: { errors } } = useFormContext()
  const inputRef = useRef({})
  const previewRef = useRef({})
  const MAX_SPEAKERS=8

  useEffect(() => {
    setValue(name, (campaignDataState.data[name]) || [])
    return () => {
      unregister(name)
    }
  }, [campaignDataState.data[name]])


  useEffect(()=>{
    setValue(name,JSON.stringify(speakers))

    speakers.forEach((speaker, index) => {
      if (previewRef.current[index]) {
        try{
          setImagePreview(filesRef.current[`speaker${index}`],previewRef.current[index])
        }catch(error){
          console.log("ERROR setting preview speaker",error);
          
        }
       
         
      }
    });

  },[speakers])



  const addSpeaker = () => {
 

    const speaker = {
      speakerName: inputRef.current.speakerName.value,
      //speakerDetails:inputRef.current.speakerDetails.value
    }
    setSpeakers((speakers) => [...speakers, speaker])
    setTimeout(() => {
      setImagePreview(filesRef.current[`speaker${speakers.length}`],previewRef.current[`${speakers.length}`])
    
    }, 1000);
   setShowAddSpeakerModal(false)
  }

  const deleteSpeaker=(e,i)=>{
    const reducedArr = speakers.filter((_, key) => {
      return key !== i;
    })
     setSpeakers((speakers) => [...reducedArr])
  }

  const setImagePreview=( fileRef,imagePreviewRef)=>{
   
   
    if(fileRef.files[0]?.type.includes("image") ){
        imagePreviewRef.style.display="block"
    }else{
        imagePreviewRef.style.display="none"
    } 
    var reader = new FileReader();
    reader.onload = function (e) {
        imagePreviewRef.src=e.target.result


    }

    try {
       if(fileRef.files[0]) reader.readAsDataURL(fileRef.files[0]);
    } catch (error) {
        console.log(error);
        
    }
     
}

  const addImage=(e)=>{
    filesRef.current[`speaker${1}`].click()
  }


 

  
  return (
    <div>Speakers
<input type="text" readOnly
         value={JSON.stringify(speakers)}
         
         {...register(name, { required: false ,onChange: (e) => { onChange && onChange(e) }})}    />
      <Modal
        closeOnOverlayClick={true}
        center
        open={showAddSpeakerModal}
        onClose={() => setShowAddSpeakerModal(false)}>
        <div style={{ width: "600px" }}>
          <span>Name</span>
          <input ref={ref => inputRef.current.speakerName = ref} /><br></br>
          <textarea ref={ref => inputRef.current.speakerDetails = ref} /><br/>
          <input ref={ref => inputRef.current.speakerFile = ref} /><br></br>

 <SpeakerImageInput fileRef={filesRef.current[`speaker${speakers.length}`]} onFileChange={(filename)=>{
  inputRef.current.speakerFile=filename
  alert(filename)
 }}/>
          
     
           
          <div onClick={(e) => { e.preventDefault(); addSpeaker() }}>Add Speaker</div>
        </div>

      </Modal>


      <button onClick={(e) => {
        e.preventDefault()
        if(speakers.length>=MAX_SPEAKERS){
          alert(`Only ${MAX_SPEAKERS} can be added.`)
          setShowAddSpeakerModal(false)
          return;
        }
        setShowAddSpeakerModal(true)

      }}>Add Speaker</button>


      {speakers.map((speaker, i) => {
        return <div key={i}>
          <img style={{width:"20px"}} ref={ref => previewRef.current[i] = ref}   />
          {speaker.speakerName} {speaker.speakerDetails}  
          <div onClick={(e)=>deleteSpeaker(e,i)}>XX</div>
          </div>
      })}

    </div>
  )
}

export default Speakers