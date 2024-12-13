import React, { useState } from 'react'
import { useRef } from 'react'
import Modal from 'react-responsive-modal'
const Speakers = ({filesRef}) => {

const [speakers,setSpeakers]=  useState([])
const [showAddSpeakerModal,setShowAddSpeakerModal]=useState(false)

 
const inputRef = useRef({})

const addSpeaker=()=>{

    const speaker={
        speakerName:inputRef.current.speakerName.value,
        //speakerDetails:inputRef.current.speakerDetails.value
    }
    setSpeakers((speakers)=>[...speakers,speaker])
}

  return (
    <div>Speakers

    <Modal
        closeOnOverlayClick={true}
        center
        open={showAddSpeakerModal}
        onClose={() => setShowAddSpeakerModal(false)}>
        <div style={{ width: "600px" }}>
          <span>Name</span>
          <input ref = {ref => inputRef.current.speakerName = ref} /><br></br>
          <textarea ref = {ref => inputRef.current.speakerDetails = ref} />
          <div onClick={(e)=>{ e.preventDefault(); addSpeaker() } }>Add Image</div>
        </div>

    </Modal>


    <button onClick={(e)=>{
        e.preventDefault()
        setShowAddSpeakerModal(true)
    }}>Add Speaker</button>


    {speakers.map((speaker,i)=>{
        return <>{speaker.speakerName}</>
    })}

    </div>
  )
}

export default Speakers