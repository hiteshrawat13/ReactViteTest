import React ,{useState} from 'react'

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";




import "./FieldList.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedField ,setFields, removeField, duplicateField} from '../../../../../store/campaign/CampaignSlice';
import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaAsterisk } from "react-icons/fa";

const FieldList = ({getIcon,setSelectedField,selectedField,onFieldSelect=null}) => {
const state= useSelector(state => state.campaignData.data)
 
    const dispatch= useDispatch()
        
    const handleFieldEdit=(fieldIndex)=>{
       setSelectedField(fieldIndex)

       if(onFieldSelect)onFieldSelect()
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
    var updatedList = [...state.form];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State

    dispatch(setFields(updatedList))
    setSelectedField(droppedItem.destination.index)


    console.log(droppedItem);
  };


 

  return (
    <>
    

     
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
        
                   <table className='fieldListTable'  {...provided.droppableProps}
              ref={provided.innerRef}>

<tr>
  <th className='fieldNumber'>No.</th>
  <th className="fieldIcon">.</th>
  <th className='fieldLabel'>Label</th>
  <th className='fieldId'>Id</th>
  <th className='fieldName'>Name</th>
  <th className='fieldDelete'>Delete</th>
  <th className='fieldDuplicate'>Copy</th>
</tr>

              {state.form?.map((item, index) => {
                if(item==null)return null;
                return <Draggable key={index} draggableId={index+""} index={index}>
                  {(provided) => (

                    <tr 
                    className={`${(selectedField==index)? 'selected':''}`}
                    ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <td className='fieldNumber' onClick={()=>handleFieldEdit(index)} ><span>{index+1}</span> {(item.isRequired)?<sup>*</sup>:null}</td>
                      <td className="fieldIcon"   onClick={()=>handleFieldEdit(index)} title={item.type}>  {getIcon(item.type,item.inputType)}  </td>
                      <td className='fieldLabel'  onClick={()=>handleFieldEdit(index)}  >   
                        <div    dangerouslySetInnerHTML={{__html: item.label}}/> 
                        {/* {(item.options?.length)? `[${item.options?.length} options]` : '' } */}
                      </td>
                      <td className='fieldId'     onClick={()=>handleFieldEdit(index)}>  {item.id}  </td>
                      <td className='fieldName'   onClick={()=>handleFieldEdit(index)}>  {item.name} </td>
                      <td className='fieldDelete'> 
                      <button className="actionButton btnDelete"  onClick={(e)=>handleDelete(e,index)} title="Delete" style={{color:"#e66767"}}><MdDelete /></button>
                      </td>
                      <td className='fieldDuplicate'>
                      <button className="actionButton btnDuplicate" onClick={(e)=>handleDuplicate(e,index)} title="Duplicate"><IoDuplicate /></button>

                      </td>
                    </tr>
                    // <div
                    // className={`field ${(selectedField==index)? 'selected':''}`}

                    //   ref={provided.innerRef}
                    //   {...provided.dragHandleProps}
                    //   {...provided.draggableProps}

                    
                    // >
                    //     <div className='display' onClick={()=>handleFieldEdit(index)} >
                        
                        


                    //     <div style={{display:"grid",gridTemplateColumns:"18px 18px 1fr 180px auto",gap:"10px"}}>
                          
                    //       <div>
                    //         <div  style={{
                    //           position:"relative",
                    //           display:"flex",
                    //           justifyContent:"center",
                    //           alignItems:"center",
                    //           backgroundColor:(item.isRequired)?"transparent":"#dfe4ea",
                    //           borderRadius:"20px",
                    //           border:"1px solid #888",
                    //           color:"#000",
                    //           height:"19px",
                    //           width:"19px",
                    //           fontSize:"10px"}}>
                                
                    //             {index+1}
                              
                    //           {/* <div  title="Required Field" style={{
                    //             position:"absolute",
                    //             top:"-7px",
                    //             right:"-4px",
                    //             color:"#ff7675"}}>{(item.isRequired)?<FaAsterisk size={8}/>:null}</div>
                    //            */}
                              
                    //           </div>
                    //       </div>

                    //       <div >
                    //         <div className="typeIcon" title={item.type} 
                    //           style={{position:"relative",color:"#3d7181",width:"10px"}}> {getIcon(item.type,item.inputType)}  
                    //          </div>
                    //       </div>

                    //       <div>
                    //         <div style={{fontSize:"12px",color:"#8f8f8f"}}>
                    //           <div className='fieldLabel' style={{color:"#000" }} dangerouslySetInnerHTML={{__html: item.label}}/> 
                    //         </div>
                    //         {/* <div className='fieldLabel' style={{fontSize:"14px",fontWeight:"bold",color:"#2f3542"}}>{item.label}</div> */}
                    //       </div>

                    //       <div style={{
                    //           display:"flex",
                    //           fontSize:"12px",
                    //           color:"#8f8f8f"
                    //           }}>
                    //       <div className='fieldId' style={{width:"80px",textAlign:"right",textOverflow: "ellipsis"}} >{item.id}</div>
                    //       <div className='fieldName' style={{width:"80px",textAlign:"right",textOverflow: "ellipsis"}}>{item.name}</div>
                    //       </div>

                    //       <div>
                    //         <div className='buttons'>
                    //           <button className="actionButton" style={{color:"#e66767"}} onClick={(e)=>handleDelete(e,index)} title="Delete"><MdDelete /></button>
                    //           <button className="actionButton" onClick={(e)=>handleDuplicate(e,index)} title="Duplicate"><IoDuplicate /></button>
                    //         </div>
                    //       </div>
                          
                    //     </div>

                        
                      
                        
                        
                        

                    //     </div>
                        
                        
                    // </div>
                  )}
                </Draggable>
}
)}
              {provided.placeholder}
              </table>
            
          )}
        </Droppable>
      </DragDropContext>
     
    </>
  );
}

export default FieldList