import React, { useEffect, useState } from 'react'
import './LinksPopupModal.scss'
import axios from "axios";
import DataTable from "react-data-table-component";


const LinksModal = ({ campData, setCampData }) => {

    const [miniSwitch, setMiniSwitch] = useState(false);
    const [links, setLinks] = useState('');


    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `http://localhost:8888/camplist/getLinks?camp_name=${campData.camp_name}`
            );

            setLinks(response.data)
        })()
        //   return () => {  }
    }, [])

    const columns = [
        {
            name: 'Link Title',
            selector: row => row.link_title,
            sortable: true,
        },
        {
            name: 'Links',
            selector: row => <a href={row.link}>{row.link}</a>,
            sortable: true,
        },
        {
            name: 'Language',
            selector: row => row.language,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row.Link_Created_By,
            sortable: true,
        },
    ]

    return (

        <div>

            {/* ******************** This is popup window for campaign only links update ***************** */}
            <div className="popupOuter">
                <div className="popup">
                    <ul className="nav nav-tabs" id="myTab" >
                        <li  >
                            <a id="show-links-tab" onClick={() => setMiniSwitch(false)} >Show Links</a>
                        </li>
                        <li  >
                            <a id="add-links-tab" onClick={() => setMiniSwitch(true)} >Camp Details</a>
                        </li>
                    </ul>
                    <button type="button" className="btn closeBtn" id="cancelBtn" onClick={() => setCampData("")}>
                    </button>
                    {miniSwitch ?
                        <form id="popupForm" >
                            <div className="editDetails">
                                <p>Last Updated By : <b id="UpdatedBy" /></p>
                            </div>
                            <div>
                                <div >
                                        <label htmlFor="campaign-name-column">Campaign Name</label>
                                        <input type="text" id="campaign-name-column"  placeholder="Campaign Name" readOnly value={campData.camp_name}/>
                                </div>
                                <div>
                                        <label htmlFor="campaign-id-column">Campaign ID</label>
                                        <input type="text" id="campaign-id-column"  placeholder="Campaign ID" readOnly value={campData.camp_id}/>
                                </div>
                                <div >
                                        <label htmlFor="client-code-select">Client Code</label>
                                            <input type="text" id="client-code-select"  placeholder="Client Code" readOnly value={campData.Client_Code}/>
                                </div>
                                <div >
                                        <label htmlFor="category-select">Category</label>
                                            <input type="text" id="category-select"  placeholder="category" readOnly value={campData.Category}/>
                                </div>
                                <div >
                                        <label htmlFor="country-floating">Country</label>
                                            <input type="text" id="country-select"  placeholder="country" readOnly value={campData.Country} />
                                </div>
                                <div >
                                        <label htmlFor="campaign-name-column">Created By</label>
                                        <input type="text" id="created-by-column"  placeholder="name" name="fname-column" readOnly value={campData.camp_Created_By}/>
                                </div>
                                <div >
                                <label htmlFor="comment">
                                        Comment
                                    </label>
                                    <textarea  placeholder="If any" id="comment" rows={2} defaultValue={campData.comment} />
                                </div>
                              
                                <div >
                                    <button type="submit"  id="editBtn">Update</button>
                                    <button type="button"  id="cancelBtn">Cancel</button>
                                </div>
                              
                                {/* ******************************* */}
                            </div>
                        </form>
                        :
                        <div id="linksTable">
                         
                            <DataTable
                                title="Links Table"
                                columns={columns}
                                data={links}
                                // progressPending={'loading'}
                                pagination
                            />

                        </div>
                    }
                </div>
            </div>
            {/* ***************************************************************************************************** */}
        </div>

    )
}

export default LinksModal;