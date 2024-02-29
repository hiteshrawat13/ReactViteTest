import React ,{useState} from 'react'

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";




import "./FieldList.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedField ,setFields} from '../../store/formBuilder/FormBuilderSlice';
const FieldList = () => {
const formBuilder = useSelector(state => state.formBuilder)
 
    const dispatch= useDispatch()
        
    const handleFieldEdit=(fieldIndex)=>{
        dispatch(setSelectedField(fieldIndex))
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
    setItemList(updatedList);

    dispatch(setFields(updatedList))
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {formBuilder.fields.map((item, index) => (
                <Draggable key={index} draggableId={index+"--"} index={index}>
                  {(provided) => (
                    <div
                    onClick={()=>handleFieldEdit(index)} className='field'
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {item.label}



                 


                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default FieldList