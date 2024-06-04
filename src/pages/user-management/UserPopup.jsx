import React, { useEffect, useState } from 'react'
import axios from "axios";
import DataTable from "react-data-table-component";
import '../campaign/LinksPopupModal.scss'
import Config from '../../Config';

const UserPopup = ({ userData, setUserData }) => {
    const [roleList, setRoleList] = useState([]);

    const [formValue, setformValue] = React.useState({
        id:userData.id,
        userName:userData.name,
        empID:userData.empid,
        role:userData.role,
        status:userData.status
    });

    useEffect(() => {
        (async () => {
            const response = await axios.get(Config.API_BASE_URL+`/user/getAllRoles`);

            setRoleList(response.data.roles)
            // console.log(response.data.roles);
        })()
        //   return () => {  }
    }, [])

    const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.id]: event.target.value
        });
      }

async function submitForm(e){
e.preventDefault();
try {
    // make axios post request
    const response = await axios.post("http://localhost:8888/user/editUser",formValue);

    alert(response.data.message)
    location.reload();
  } catch(error) {
    console.log(error)
  }


}

    return (


        <div className="popupOuter">
            <div className="popup">

                <form id="popupForm" >
                    <div >
                        <label htmlFor="userName">Name</label>
                        <input type="text" id="userName" placeholder=" Name" onChange={handleChange} defaultValue={userData.name} />
                    </div>

                    <div >
                        <label htmlFor="empID">Employee ID</label>
                        <input type="text" id="empID" placeholder="Employee ID" onChange={handleChange} defaultValue={userData.empid} />
                    </div>

                    <div >
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" onChange={handleChange} defaultValue={userData.role}>
                       { roleList.map((data,i)=>{
                       return <option key={i} selected={userData.role==data.id ? true:false} value={data.id}>{data.name}</option>
                        })}
                            
                        </select>
                    </div>

                    <div >
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" onChange={handleChange} defaultValue={userData.status ? '1':'0'}>
                            <option  value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        
                    </div>

                    <button onClick={ submitForm} type='submit'>Save Changes</button>

                </form>

                <button onClick={() => setUserData('')} >Close</button>

            </div>
        </div>
    )
}

export default UserPopup;