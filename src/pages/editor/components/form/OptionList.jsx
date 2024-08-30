import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from '../../../../components/ui/Modal';

const OptionList = ({ setOptions, options }) => {

    const [data, setData] = useState(Array.isArray(options) ? [...Object.assign([], options)] : [])


    const [isOptionAddModalOpened, setOptionAddModalOpened] = useState(false)


    useEffect(() => {
        setOptions(data)
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


    const labelsTextareaRef = useRef()
    const valuesTextareaRef = useRef()
    return (
        <>
            <div style={{ position: "relative" }}>


                {<Modal setOpened={setOptionAddModalOpened} isOpened={isOptionAddModalOpened} title={"My Modal"} style={{ width: "90%", height: "90%" }}>


                    <div style={{ zIndex: "999", width: "100%", display: `${(isOptionAddModalOpened) ? 'block' : 'none'}` }}>
                        <div style={{ padding: "10px", background: "#888888", maxHeight: "auto" }}>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <textarea ref={labelsTextareaRef} style={{ width: "100%", minHeight: "300px", height: "auto", resize: "none" }}></textarea>
                                <textarea ref={valuesTextareaRef} style={{ width: "100%", minHeight: "300px", height: "auto", resize: "none" }}></textarea>
                            </div>

                            <button style={{ marginTop: "5px" }} onClick={handleOptionTextData}>Add Options</button>
                        </div>


                    </div>
                </Modal>}






                <button onClick={(e) => { e.preventDefault(); setOptionAddModalOpened(true) }}>+</button>
                <div style={{ position: "relative", maxHeight: "400px", overflowY: "scroll" }}>

                    <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div

                                    className=" fieldList"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {data.map((item, index) => {
                                        if (item == null) return null;
                                        return <Draggable key={index} draggableId={index + ""} index={index}>
                                            {(provided) => (
                                                <div
                                                    className={`field`}

                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}


                                                >
                                                    <div className='display' >

                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>

                                                            <div>
                                                                <div style={{ display: "flex", gap: "18px", padding: "5px 10px 5px 20px" }} >

                                                                    <input type="text" value={item.label} data-index={index} onChange={handleLabelChange} />
                                                                    <input type="text" value={item.value} data-index={index} onChange={handleValueChange} />

                                                                    <button style={{ width: "18px" }} data-index={index} onClick={handleDeleteItem}>X</button>
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
                    <button onClick={handleAddItem}>Add</button>
                </div>
            </div>



        </>
    )
}

export default OptionList