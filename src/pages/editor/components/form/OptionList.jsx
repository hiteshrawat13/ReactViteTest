import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import Modal from '../../../../components/ui/Modal';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


import './OptionList.css'

const OptionList = ({ setOptions, options }) => {

    const [data, setData] = useState(Array.isArray(options) ? [...Object.assign([], options)] : [])

    const labelsTextareaRef = useRef()
    const valuesTextareaRef = useRef()
    const [isOptionAddModalOpened, setOptionAddModalOpened] = useState(false)


    useEffect(() => {
        setOptions(data)
       
     

        console.log("EEE");
        

    }, [data])




    

    const handleDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...data];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State

        setData(updatedList)
    }


    const handleLabelChange = (e) => {
        e.preventDefault()
        const index = e.target.dataset.index
        var updatedList = [...data];
        updatedList[index] = { ...updatedList[index], label: e.target.value };

        
        setData(updatedList)
    }

    const handleValueChange = (e) => {
        e.preventDefault()
        const index = e.target.dataset.index
        var updatedList = [...data];
        updatedList[index] = { ...updatedList[index], value: e.target.value };
        
        setData(updatedList)

    }



    const handleAddItem = (e) => {
        e.preventDefault()
        const index = e.target.dataset.index
        var updatedList = [...data];
        updatedList.push({ label: "", value: "" });
        
        setData(updatedList)
    }
    const handleDeleteItem = (e) => {
        e.preventDefault()
        const index = e.target.dataset.index
        var updatedList = [...data];
        updatedList.splice(index, 1);
        
        setData(updatedList)
    }


    const handleDisableCheckboxChange = (e) => {
        e.preventDefault()
        const index = e.target.dataset.index
        var updatedList = [...data];
        updatedList[index] = { ...updatedList[index], disabled: e.target.checked };
        
        setData(updatedList)
    }
    



    const handleOptionTextData = (e) => {
        e.preventDefault()

        const labels = labelsTextareaRef.current.value.split(/\r|\r\n|\n/);
        const values = valuesTextareaRef.current.value.split(/\r|\r\n|\n/);


        if ((valuesTextareaRef.current.value != "") && labels.length != values.length) {
            alert("Labels and values not matched")
            return
        }

        let updatedList = []
        if (labels.length == values.length) {
            updatedList = labels.map((label, i) => {
                return { label: label, value: values[i] }
            })
        }

        if (labels.length > 0 && valuesTextareaRef.current.value == "") {
            updatedList = labels.map((label, i) => {
                return { label: label, value: label }
            })
        }
        
        setData(updatedList)
        setOptionAddModalOpened(false)



    }



    return (
        <>
            <div style={{  }}>
                <Modal open={isOptionAddModalOpened} onClose={() => setOptionAddModalOpened(false)}>

                <div style={{ padding: "10px", background: "#888888", maxHeight: "auto" }}>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <textarea  ref={labelsTextareaRef} style={{ width: "100%", minHeight: "300px", height: "auto", resize: "none" ,padding:"10px"}} defaultValue={data.map(item=>item.label+"\r\n").join("").trim()}></textarea>
                                <textarea  ref={valuesTextareaRef} style={{ width: "100%", minHeight: "300px", height: "auto", resize: "none" ,padding:"10px"}} defaultValue={data.map(item=>item.value+"\r\n").join("").trim()}></textarea>
                            </div>

                            <button style={{ marginTop: "5px" }} onClick={handleOptionTextData}>Add Options</button>
                        </div>
                </Modal>

                <button onClick={(e) => { 
                    e.preventDefault(); 
                    setOptionAddModalOpened(true);
                    labelsTextareaRef.current.value=data.join("")
                    valuesTextareaRef.current.value=data.join("")
                    }}>Option Generate</button>

                <div style={{ position: "relative",width:"700px", maxHeight: "400px", overflowY: "scroll" }}>

                    <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId="list-container"
                        
                        //this is used if the dragged item movies out of position if there is atransform animation to parent ex modal
                        renderClone={(provided, snapshot, rubric) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              Move
                            </div>
                          )}
                        
                        
                        >
                            {(provided) => (
                                <div

                                    className=" fieldList"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    
                               


                                >
                                    <table>
                                        <tr>
                                        <td>No.</td>
                                                    <td>Label</td>
                                                    <td>Value</td>
                                                    <td>Disabled</td>
                                                    <td>Remove</td>
                                                
                                        </tr>
                                    {data.map((item, index) => {
                                        if (item == null) return null;
                                        return <Draggable key={index} draggableId={index + ""} index={index}>
                                            {(provided) => (
                                                // <div
                                                //     className={`field`}

                                                //     ref={provided.innerRef}
                                                //     {...provided.dragHandleProps}
                                                //     {...provided.draggableProps}


                                                // >
                                                //     <div className='display' >

                                                //         <div style={{ display: "grid", gridTemplateColumns: "5px 1fr", gap: "10px" }}>
                                                //             <div style={{display:"flex",alignItems:"center",fontSize:"12px",color:"#444"}}>{index}</div>
                                                //             <div>
                                                //                 <div style={{ display: "flex", gap: "18px", padding: "5px 10px 5px 20px" }} >
                                                //                     <input type="text" value={item.label} data-index={index} onChange={handleLabelChange} />
                                                //                     <input type="text" value={item.value} data-index={index} onChange={handleValueChange} />
                                                //                     <input type="checkbox" checked={item.disabled || false} data-index={index} onChange={handleDisableCheckboxChange} />
                                                //                     <button style={{ width: "18px" }} data-index={index} onClick={handleDeleteItem}>X</button>
                                                //                 </div>
                                                //             </div>
                                                //         </div>
                                                //     </div>
                                                // </div>

                                                <tr ref={provided.innerRef}
                                                  {...provided.dragHandleProps}
                                                  {...provided.draggableProps}>
                                                    <td>{index}</td>
                                                    <td><input type="text" value={item.label} data-index={index} onChange={handleLabelChange} /></td>
                                                    <td><input type="text" value={item.value} data-index={index} onChange={handleValueChange} /></td>
                                                    <td align="center"> <input type="checkbox" checked={item.disabled || false} data-index={index} onChange={handleDisableCheckboxChange} /></td>
                                                    <td align="center"><button style={{ width: "18px" }} data-index={index} onClick={handleDeleteItem}>X</button></td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    }
                                    )}
                                    </table>
                                    {provided.placeholder}

                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button onClick={handleAddItem} style={{padding:"5px",color:"green",border:"1px solid green"}}>+ Add Option</button>
                </div>
            </div>



        </>
    )
}

export default OptionList