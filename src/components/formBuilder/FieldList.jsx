import React ,{useState} from 'react'

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";




import "./FieldList.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedField ,setFields, removeField, duplicateField} from '../../store/formBuilder/FormBuilderSlice';

import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";

const FieldList = () => {
const formBuilder = useSelector(state => state.formBuilder)
 
    const dispatch= useDispatch()
        
    const handleFieldEdit=(fieldIndex)=>{
        dispatch(setSelectedField(fieldIndex))
    }
  
    const handleDelete=(fieldIndex)=>{
        dispatch(removeField(fieldIndex))
    }

    const handleDuplicate=(fieldIndex)=>{
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
    dispatch(setSelectedField(-1))
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
                return <Draggable key={index} draggableId={index+"--"} index={index}>
                  {(provided) => (
                    <div
                    className='field'
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                        <div className='display' onClick={()=>handleFieldEdit(index)} >
                        <div className='fieldType'>{item.type}</div>
                        <div className='fieldLable'>{item.label}</div>
                        </div>
                        
                        <div className='buttons'>
                          <button className="actionButton" onClick={()=>handleDelete(index)}><MdDelete /></button>
                          <button className="actionButton" onClick={()=>handleDuplicate(index)}><IoDuplicate /></button>
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