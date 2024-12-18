import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Modal from 'react-responsive-modal'
import { FileInput } from '.'
import SpeakerImageInput from './SpeakerImageInput'
const Speakers = ({ filesRef, name = "SPEAKERS" }) => {
  const campaignDataState = useSelector(state => state.campaignData)
  const [speakers, setSpeakers] = useState((campaignDataState.data[name] != undefined && campaignDataState.data[name].includes("[")) ? JSON.parse(campaignDataState.data[name]) : [])
  const [showAddSpeakerModal, setShowAddSpeakerModal] = useState(false)

  const [editMode, setEditMode] = useState(-1)

  const [speakerEditState, setSpeakerEditState] = useState({
    speakerName: "",
    speakerDetails: "",
    speakerImage: ""
  })


  const { register, unregister, setValue, formState: { errors } } = useFormContext()

  const previewRef = useRef({})
  const MAX_SPEAKERS = 8

  useEffect(() => {
    setValue(name, (campaignDataState.data[name]) || [])
    return () => {
      unregister(name)
    }
  }, [campaignDataState.data[name]])


  useEffect(() => {

    try {
      setValue(name, JSON.stringify(speakers))

      speakers.forEach((speaker, index) => {
        if (previewRef.current[speaker.id] && filesRef.current[`speaker${speaker.id}`].files.length > 0  && !speaker.speakerImage.startsWith("http")) {
          try {
            setImagePreview(filesRef.current[`speaker${speaker.id}`], previewRef.current[speaker.id])
          } catch (error) {
            console.log("ERROR setting preview speaker", error);

          }
        } else {
          previewRef.current[speaker.id].src = (speaker.speakerImage.startsWith("http")) ? speaker.speakerImage : campaignDataState.data["BASE_URL"] + speaker.speakerImage
        }

      });
    } catch (error) {
      console.log("ERROR in speakers useEffect", error);
    }
    

  }, [speakers])



  const addSpeaker = () => {
    const speaker = {
      id:speakers.length,
      speakerName: speakerEditState.speakerName,
      speakerDetails: speakerEditState.speakerDetails,
      speakerImage: speakerEditState.speakerImage
    }
    setSpeakers((speakers) => [...speakers, speaker])
    setTimeout(() => {
      setImagePreview(filesRef.current[`speaker${speakers.length}`], previewRef.current[`${speakers.length}`])
    }, 1000);
    setShowAddSpeakerModal(false)
  }



  const editSpeaker = () => {



    const index = editMode
    console.log(speakerEditState, speakers[index], index);



    setSpeakers(prevState => {
      // Loop over your list
      return prevState.map((item, i) => {
        // Check for the item with the specified id and update it
        return i === index ? { ...speakerEditState } : item
      })
    })

    setEditMode(-1)
    setShowAddSpeakerModal(false)//first show modal otherwise inputRef.current will return null inputs



  }



  const openEditSpeakerModal = (e, i) => {

    console.log(i, i, i, "EEEEEEEEEE");

    const speaker = speakers[i]

    console.log(speaker, "EEEEEEEEEE");
    setSpeakerEditState({
      id:speaker.id,
      speakerName: speaker.speakerName,
      speakerDetails: speaker.speakerDetails,
      speakerImage: speaker.speakerImage
    })

    setEditMode(i)
    setShowAddSpeakerModal(true)//first show modal otherwise inputRef.current will return null inputs



  }

  const deleteSpeaker = (e, i) => {
    const reducedArr = speakers.filter((_, key) => {
      return _.id !== i;
    })
    setSpeakers((speakers) => [...reducedArr])
    filesRef.current[`speaker${i}`].value=""
  }

  const setImagePreview = (fileRef, imagePreviewRef) => {


    if (fileRef.files[0]?.type.includes("image")) {
      imagePreviewRef.style.display = "block"
    } else {
      imagePreviewRef.style.display = "none"
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      imagePreviewRef.src = e.target.result
    }

    try {
      if (fileRef.files[0]) reader.readAsDataURL(fileRef.files[0]);
    } catch (error) {
      console.log(error);

    }

  }

  const addImage = (e) => {
    filesRef.current[`speaker${1}`].click()
  }





  return (
    <div>
      <input type="text"  style={{display:"none"}} readOnly
        value={JSON.stringify(speakers)}

        {...register(name, { required: false, onChange: (e) => { onChange && onChange(e) } })} />
      <Modal
        closeOnOverlayClick={true}
        center
        open={showAddSpeakerModal}
        onClose={() => setShowAddSpeakerModal(false)}>
        <div style={{ width: "600px" }}>
          
          <div className='form-group'>
          <label>Speaker Name</label>
          <input className='input-holder' style={{width:"100%"}} value={speakerEditState?.speakerName} onChange={(e) => {
            setSpeakerEditState(state => { return { ...state, speakerName: e.target.value } })
          }
          } />
          </div>
          <div className='form-group'>
          <label>Speaker Details</label>
          <textarea className='input-holder' style={{width:"100%"}}  value={speakerEditState?.speakerDetails} onChange={(e) => {
            setSpeakerEditState(state => { return { ...state, speakerDetails: e.target.value } })
          }
          } />
           </div>
           <div className='form-group'>
           <label>Speaker Image</label>
          <input  className='input-holder' style={{width:"100%"}}  value={speakerEditState?.speakerImage} onChange={(e) => {
            setSpeakerEditState(state => { return { ...state, speakerImage: e.target.value } })
          }
          } />
          </div>



          <SpeakerImageInput fileRef={filesRef.current[`speaker${(editMode==-1)?speakers.length:editMode}`]} index={editMode} onFileChange={(filename) => {
            setSpeakerEditState(state => { return { ...state, speakerImage: filename } })

          }} />




          {
            editMode != -1 && <div className={"btn--secondary"} onClick={(e) => { e.preventDefault(); editSpeaker() }}>{editMode} Edit Speaker</div>
          }

          {editMode == -1 && <button className={"btn--secondary"} onClick={(e) => {  e.preventDefault();  addSpeaker() }}
          
          >Add Speaker</button>}

  
        </div>

      </Modal>


      <button className="btn--primary" onClick={(e) => {
        e.preventDefault()
        if (speakers.length >= MAX_SPEAKERS) {
          alert(`Only ${MAX_SPEAKERS} can be added.`)
          setShowAddSpeakerModal(false)
          return;
        }
        setSpeakerEditState({
          speakerName: "",
          speakerDetails: "",
          speakerImage: ""
        })
        setShowAddSpeakerModal(true)

      }}>+ Add Speaker</button>


<div className='speaker-holder'>
      {speakers.map((speaker, i) => {
        return <div key={i} className='speaker'  >
          <img ref={ref => previewRef.current[speaker.id] = ref} />
          <div className='details'>
            <div>
              <div className="speaker-name">{speaker.id} {speaker.speakerName}</div> 
              <div className='speaker-details'>{speaker.speakerDetails}</div>
            </div>
            <div style={{display:"flex",gap:"30px"}}>
              <div className="edit btn--secondary" onClick={(e) => openEditSpeakerModal(e, speaker.id)}>✎ Edit</div>
              <div className="delete btn--secondary" onClick={(e) => deleteSpeaker(e, speaker.id)}>✖ Delete</div>
            </div>
          </div>

        </div>
      })}
</div>
    </div>
  )
}

export default Speakers