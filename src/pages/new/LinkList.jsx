import React, { useEffect, useState } from 'react'
import axios from "axios";
import DataTable from "react-data-table-component";
import Config from '../../Config';
import { useLocation, useNavigate } from 'react-router-dom';
 import TemplateManager from '../editor/templates/TemplateManager';

 import "./LinkList.css"
import CampaignDetails from './CampaignDetails';
import instance from './ApiService';
import Modal from 'react-responsive-modal';

const LinkList = ({ campData={}, setCampData=null }) => {

    
    const navigate=useNavigate()
    const location = useLocation()

    const [isUpdateCampaignModalOpened,setUpdateCampaignModalOpened]=useState(false)
    const [miniSwitch, setMiniSwitch] = useState(false);
    const [links, setLinks] = useState('');
    const templates=TemplateManager.find(client=>client.clientCode==location?.state?.clientCode)

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                Config.API_BASE_URL+`/camplist/getLinks?camp_name=${location?.state?.campaignName}`
            );

            setLinks(response.data)
        })()
        //   return () => {  }
    }, [])



    
    const updateCampaign = async (campaignData) => {
        const response = await instance({
          url: `/camplist/editCampList`, method: "post",
    
          data: campaignData
    
        })
    
        if (response.data.status == 200) {
          //  navigate(`/editor/${clientCode}`,{state: { 
          
          alert("campaign updated")
    
    
    
        } else {
          alert(response.data.message)
        }
      }

    const handleCreateLink=(campData,templateId,templateType)=>{

        const { 
            Client_Code:clientCode,
            Category:category,
            camp_id:campaignId,
            camp_name:campaignName,
            camp_Created_By:campCreatedBy,
            last_edited_By:lastEditedBy,
            comment:comment,
            Country:country,
          }=location?.state


        navigate(`/editor`,{state: { 
           ...location?.state,
            
            templateId,
            templateType
  
          }})
    }



    const handleEditLink=async (e,linkId)=>{

        e.preventDefault()


        

        try {
            const response = await axios.post(
                Config.API_BASE_URL+`/camplist/getLinkJsonData?id=${linkId}`
            );

            alert(response )
            console.log(response.data);
            const jobject=JSON.parse(response.data.json_data)
            navigate(`/editor/`,{state: { 
                ...location?.state,
                mode:"edit",
                linkId:linkId,
                jsonObject:jobject,
                 
                templateId:jobject.TEMPLATE_ID,
                templateType:jobject.LINK_TYPE
      
            }})
        } catch (error) {
            alert(error)
            console.log(error);
        }
    
    }


    const parsePage=(d)=>{
        console.log(d.link);
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        
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
          }).catch(function (error){
            alert("ERROR")
        });
        
        
        // axios
        //     .get(d.link)
        //     .then(function (response) {
        //         const $ = cheerio.load(response);
        //         console.log(response);
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     });
       
    }

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
        {
            name: 'Link Type',
            selector: row => row.link_type,
            sortable: true,
        },
        {
            cell:(row) => <button onClick={(e)=>handleEditLink(e,row.id)} id={row.ID}>Action</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    return (

        <div>

{/* {JSON.stringify(location?.state) }

 */}



<div style={{display:"flex",justifyContent:"space-between"}}>

<div className="dropdown">
  <button className="dropbtn">Create Link</button>
  <div className="dropdown-content">

  {templates?.templates.map( (template,i) => { 
    return <button key={i}  onClick={()=>{  handleCreateLink(location?.state,template.id,template.type) } }>{template.title}</button>
    })}
  </div>
</div>

<div>
    <button  className="btn--primary" onClick={() => setUpdateCampaignModalOpened(true)} >Camp Details</button>
</div>
</div>

            {/* ******************** This is popup window for campaign only links update ***************** */}
            <div className="">
                <div className="">
                    <Modal
center
open={isUpdateCampaignModalOpened}
onClose={()=>setUpdateCampaignModalOpened(false)}>

                        <CampaignDetails campaignData={location?.state} onSubmit={(data)=>{updateCampaign(data)}} onCancel={()=>setUpdateCampaignModalOpened(false)}/>
                     </Modal> 
                    {miniSwitch ?


<></>  :
                        <div id="linksTable">
                         
                            <DataTable
                                title="Links Table"
                                columns={columns}
                                data={links}
                                onRowClicked={parsePage}
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