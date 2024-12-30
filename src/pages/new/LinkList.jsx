import React, { useEffect, useState } from 'react'
import axios from "axios";
import DataTable from "react-data-table-component";
import Config from '../../Config';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateManager from '../editor/templates/TemplateManager';
import "./LinkList.css"
import CampaignDetails from './CampaignDetails';
// import instance from './ApiService';
import Modal from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { setData, clearData, addData, updateData } from '../../store/campaign/CampaignSlice'
import Breadcrumbs from '../editor/components/BreadCrumbs';
const LinkList = ({ campData = {}, setCampData = null }) => {

    const dispatch = useDispatch()

    useEffect(() => {
 
        dispatch(clearData())
    }, [])

    const [openNewLinkModal, setOpenNewLinkModal] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);

    const [isUpdateCampaignModalOpened, setUpdateCampaignModalOpened] = useState(false)
    const [campaignDetails,setCampaignDetails]=useState(null)
    const [templates,setTemplates]=useState(null)
    const [miniSwitch, setMiniSwitch] = useState(false);
    const [links, setLinks] = useState('');
    //console.log("STATE", TemplateManager);
    //console.log("STATE", location?.state?.clientCode);
  
 
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                //Config.API_BASE_URL + `/camplist/getLinks?camp_name=${encodeURIComponent(location?.state?.campaignName)}`
                Config.API_BASE_URL + `/camplist/getLinks?camp_name=${encodeURIComponent(queryParams.get("campaignName"))}`
            );

            const { 
                Client_Code:clientCode,
                Category:category,
                camp_id:campaignId,
                camp_name:campaignName,
                camp_Created_By:campCreatedBy,
                last_edited_By:lastEditedBy,
                comment:comment,
                Country:country
              }=response.data?.campaign

            setCampaignDetails({
                clientCode,
                category,
                 campaignId,
                 campaignName,
                 campCreatedBy,
                 lastEditedBy,
                 comment,
                 country,
     
             })
            setLinks(response.data?.links)
           
            setTemplates( TemplateManager.find(client => client.clientCode == clientCode) )
        })()
        //   return () => {  }
    }, [])






    const updateCampaign = async (campaignData) => {


        const response = await axios.post(
            Config.API_BASE_URL + `/camplist/editCampList`,
            campaignData
        );

        // const response = await instance({
        //     url: `/camplist/editCampList`, method: "post",

        //     data: campaignData

        // })

        if (response.data.status == 200) {
            //  navigate(`/editor/${clientCode}`,{state: { 
            alert("campaign updated")
        } else {
            alert(response.data.message)
        }
    }

    const handleCreateLink = (campData, templateId, templateType) => {

        // const {
        //     Client_Code: clientCode,
        //     Category: category,
        //     camp_id: campaignId,
        //     camp_name: campaignName,
        //     camp_Created_By: campCreatedBy,
        //     last_edited_By: lastEditedBy,
        //     comment: comment,
        //     Country: country,
        // } = campaignDetails


        navigate(`/editor`, {
            state: {
                ...campaignDetails,

                templateId,
                templateType

            }
        })
    }



    const handleEditLink = async (e, linkId) => {

        e.preventDefault()




        try {
            const response = await axios.post(
                Config.API_BASE_URL + `/camplist/getLinkJsonData?link=${encodeURIComponent(linkId)}`
            );


            //console.log(response.data);
            const jobject = JSON.parse(response.data.json_data)
            navigate(`/editor/`, {
                state: {
                    ...campaignDetails,
                    mode: "edit",
                    linkId: linkId,
                    jsonObject: jobject,

                    templateId: jobject.TEMPLATE_ID,
                    templateType: jobject.LINK_TYPE

                }
            })
        } catch (error) {
            alert(error)
            console.log(error);
        }

    }


    const handleCreateNewFromExistingLink = async (e, linkId) => {

        e.preventDefault()




        try {
            const response = await axios.post(
                Config.API_BASE_URL + `/camplist/getLinkJsonData?link=${encodeURIComponent(linkId)}`
            );

            //alert(response )
            console.log(response.data);
            const jobject = JSON.parse(response.data.json_data)
            if(jobject.files){
                jobject.files=[]
            }
            navigate(`/editor/`, {
                state: {
                    ...campaignDetails,
                    mode: "new",
                    linkId: linkId,
                    jsonObject: jobject,

                    templateId: jobject.TEMPLATE_ID,
                    templateType: jobject.LINK_TYPE
                }
            })
        } catch (error) {
            alert(error)
            console.log(error);
        }

    }




    const handleCopyJsonData = async (e, linkId) => {

        e.preventDefault()




        // try {
        //     const response = await axios.post(
        //         Config.API_BASE_URL+`/camplist/getLinkJsonData?id=${linkId}`
        //     );
        //     const json=response.data.json_data
        //     //alert( response.data.json_data )

        //     navigator.clipboard.writeText(json).then(function() {
        //         alert('Copying to clipboard was successful!')

        //       }, function(err) {
        //         alert(' Could not copy text: ', err)

        //     });

        // } catch (error) {
        //     alert(error)
        //     console.log(error);
        // }

        try {
            const response = await axios.post(
                Config.API_BASE_URL + `/camplist/getLinkJsonData?id=${linkId}`
            );
            const state = JSON.parse(response.data.json_data)


            //alert( response.data.json_data )


            handleCreateLink(state, state['LINK_ID'], ['LINK_TYPE'])

        } catch (error) {
            alert(error)
            console.log(error);
        }


    }


    const parsePage = (d) => {
        console.log(d.link);
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios(d.link, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => {
            alert(response)
        }).catch(function (error) {
            alert("ERROR")
        });


 
    }

    const columns = [
        {
            name: 'Link Title',
            selector: row => row.link_title,
            sortable: true,

            wrap: true,
            style: { fontWeight: "bold", maxWidth: "250px" }
        },
        {
            name: 'Links',
            selector: row => <a href={row.link} target='_blank'>{row.link}</a>,
            sortable: true,

            style: { fontWeight: "bold", maxWidth: "350px" }
        },
        {
            name: 'Language',
            selector: row => row.language,
            sortable: true,
            width: "100px",                     // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            name: 'Created By',
            selector: row => row.Link_Created_By,
            sortable: true,
            width: "100px",                     // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            name: 'Link Type',
            selector: row => row.link_type,
            sortable: true,
            width: "100px",                     // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            name: 'Published',
            selector: row => row.is_published,
            sortable: true,
            width: "100px",                     // added line here
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
        },
        {
            name: "Actions",
            minWidth: "180px",
            cell: (row) => <>
                <button key="edit button" className='dropbtn' style={{ marginRight: '10px', marginTop: '10px' }} onClick={(e) => handleEditLink(e, row.link)} id={row.ID}>Edit</button>
                {/* <button onClick={(e)=>handleCopyJsonData(e,row.id)} id={row.ID}>Copy Data</button> */}
                <button key="duplicate button" className='greenBtn' onClick={(e) => handleCreateNewFromExistingLink(e, row.link)} id={row.ID}>Duplicate Link</button>


            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    return (

        <div>
            


            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
 
                <div className="dropdown">
                    <button className="dropbtn">Create Link</button>
                    <div className="dropdown-content">

                        {templates?.templates.map((template, i) => {
                            return <button key={i} onClick={() => { handleCreateLink(campaignDetails, template.id, template.type) }}>
                                {/* {JSON.stringify(template)}  */}
                                {template.title}
                                </button>
                        })}
                    </div>
                </div>

                <div>
                    <button className="btn--primary" onClick={() => setUpdateCampaignModalOpened(true)} >Campaign Details</button>
                </div>
            </div>

            {/* ******************** This is popup window for campaign only links update ***************** */}
            <div className="">
                <div className="">
                    <Modal
                        center
                        open={isUpdateCampaignModalOpened}
                        onClose={() => setUpdateCampaignModalOpened(false)}>

                        <CampaignDetails campaignData={campaignDetails} onSubmit={(data) => { updateCampaign(data) }} onCancel={() => setUpdateCampaignModalOpened(false)}  edit={true} />
                    </Modal>
                    {miniSwitch ?
                        <></> :
                        <div id="linksTable">

                            <DataTable
                                title={campaignDetails?.campaignName}
                                columns={columns}
                                data={links}
                                onRowClicked={() => { }}
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

export default LinkList;