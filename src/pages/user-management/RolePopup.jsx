 import React, { useEffect, useState } from 'react'
import axios from "axios";
import DataTable from "react-data-table-component";
import '../campaign/LinksPopupModal.scss'

const RolePopup = ({ roleData, setRoleData }) => {

let accessFormValue={};

const [accessFormValue2 , setAccessformValue2] = useState({});


useEffect(() => {
    (async () => {
        const response1 = await axios.get(
            `http://localhost:8888/user/getAllModules`
        );


            response1.data.moduleList.forEach(element => {
            accessFormValue[element.id]={
                'name':element.name,
                'create':false,
                'read':false,
                'update':false,
                'delete':false,
            }
        });

            fetchAccess(accessFormValue);
        
    })()
    
}, [])


async function fetchAccess(accessFormValue) {
    
    // useEffect(() => {
    //     (async () => {
           
    try {
        
   
    const response = await axios.get(
        `http://localhost:8888/user/getRolePermission?roleid=${roleData.id}`
    );
    
    response.data.roles.forEach(element => {

         accessFormValue[element.module_id]={
            'name':element.module_name,
            'create':element.create_p,
            'read':element.read_p,
            'update':element.update_p,
            'delete':element.delete_p,
        }

});
} catch (error) {
        
}
    
    setAccessformValue2(accessFormValue);
    
}

    const handleChange = (moduleID,access,e) => {

        setAccessformValue2({  
            ...accessFormValue2,
            [moduleID]:{ ...accessFormValue2[moduleID],[access]:e.target.checked}
        });

    }

async function updatePermissions(e){
e.preventDefault();
try {

    const response = await axios.post("http://localhost:8888/user/editRole",{'roleid':roleData.id,'accessFormValue':accessFormValue2});

    alert(response.data.message)
    location.reload();
  } catch(error) {
    console.log(error)
  }

}

async function deleteRole(){

    try {

        const response = await axios.post("http://localhost:8888/user/deleteRole",{'roleid':roleData.id});
    
        alert(response.data.message)
        
        location.reload();
      } catch(error) {
        console.log(error)
      }
}



    return (


        <div className="popupOuter">
            <div className="popup">

             
            <form >

                <table className='table table-bordered'>
      <thead>
        <tr>
        <th>Module</th>
         <th>Create</th>
         <th>Read</th>
         <th>Update</th>
         <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
            Object.keys(accessFormValue2).map((keyName, i) => 
              <tr key={i}>
            {console.log(accessFormValue2[keyName])}
                 <td>{accessFormValue2[keyName].name}</td>
                 {/* <input type="text" name="" id="" hidden value={item.module_id} /> */}
                 <td> <input type="checkbox" name="" id="" onChange={(e)=>handleChange(keyName,'create',e)} defaultChecked={accessFormValue2[keyName].create} /></td>
                 <td> <input type="checkbox" name="" id="" onChange={(e)=>handleChange(keyName,'read',e)} defaultChecked={accessFormValue2[keyName].read} /></td>
                 <td> <input type="checkbox" name="" id="" onChange={(e)=>handleChange(keyName,'update',e)} defaultChecked={accessFormValue2[keyName].update} /></td>
                 <td> <input type="checkbox" name="" id="" onChange={(e)=>handleChange(keyName,'delete',e)} defaultChecked={accessFormValue2[keyName].delete} /></td>
               
              </tr>
            )
        }
      </tbody>
    </table>
    <button onClick={(e) => updatePermissions(e)} >Update</button>
    <button onClick={deleteRole} >Delete</button>
    <button onClick={() => setRoleData('')} >Cancel</button>

    </form>
            </div>
        </div>
    )
}

export default RolePopup;