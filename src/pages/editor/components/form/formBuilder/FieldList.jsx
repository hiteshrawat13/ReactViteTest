import React ,{useState} from 'react'

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";




import "./FieldList.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedField ,setFields, removeField, duplicateField} from '../../../../../store/formBuilder/FormBuilderSlice';
import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaAsterisk } from "react-icons/fa";

const FieldList = ({getIcon}) => {
const formBuilder = useSelector(state => state.formBuilder)
 
    const dispatch= useDispatch()
        
    const handleFieldEdit=(fieldIndex)=>{
        dispatch(setSelectedField(fieldIndex))
    }
  
    const handleDelete=(e,fieldIndex)=>{
      e.preventDefault()
      dispatch(removeField(fieldIndex))
    }

    const handleDuplicate=(e,fieldIndex)=>{
      e.preventDefault()
      dispatch(duplicateField(fieldIndex))
  }

// Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...formBuilder.fields];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State

    dispatch(setFields(updatedList))
    dispatch(setSelectedField(droppedItem.destination.index))


    console.log(droppedItem);
  };



  return (
    <>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
         
              className=" fieldList"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {formBuilder.fields.map((item, index) => {
                if(item==null)return null;
                return <Draggable key={index} draggableId={index+""} index={index}>
                  {(provided) => (
                    <div
                    className={`field ${(formBuilder.selectedField==index)? 'selected':''}`}

                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}

                    
                    >
                        <div className='display' onClick={()=>handleFieldEdit(index)} >
                        
                        


                        <div style={{display:"grid",gridTemplateColumns:"auto auto 1fr auto",gap:"10px"}}>
                          
                          <div>
                            <div  style={{
                              position:"relative",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              backgroundColor:"#dfe4ea",
                              color:"#2f3542",
                              height:"18px",
                              width:"18px",
                              fontSize:"10px"}}>
                                
                                {index+1}
                              
                              <div  title="Required Field" style={{
                                position:"absolute",
                                top:"-7px",
                                right:"-4px",
                                color:"#ff7675"}}>{(item.isRequired)?<FaAsterisk size={8}/>:null}</div>
                              
                              
                              </div>
                          </div>

                          <div >
                            <div className="typeIcon" title={item.type} 
                              style={{position:"relative",color:"#60a3bc"}}> {getIcon(item.type,item.inputType)}  
                             </div>
                          </div>

                          <div>
                            <div style={{
                              display:"flex",
                              justifyContent:"space-between",
                              fontSize:"12px",
                              color:"#8f8f8f"
                              }}>
                              <div className='fieldId'>{item.id}</div>
                              <div className='fieldName'>{item.name}</div>
                            </div>
                            <div className='fieldLabel' style={{fontSize:"14px",fontWeight:"bold",color:"#2f3542"}}>{item.label}</div>
                            
                          </div>

                          <div>
                            <div className='buttons'>
                              <button className="actionButton" style={{color:"#e66767"}} onClick={(e)=>handleDelete(e,index)}><MdDelete /></button>
                              <button className="actionButton" onClick={(e)=>handleDuplicate(e,index)}><IoDuplicate /></button>
                            </div>
                          </div>
                          
                        </div>

                        
                      
                        
                        
                        

                        </div>
                        
                        
                    </div>
                  )}
                </Draggable>
}
)}
              {provided.placeholder}
             
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default FieldList