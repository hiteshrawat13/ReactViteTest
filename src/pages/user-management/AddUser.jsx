import React, { useEffect, useState } from 'react'
import axios from "axios";
import Config from '../../Config';

const AddUser = ({setAddUserPopup }) => {

    const [roleList, setRoleList] = useState([]);
    const [formValue, setFormValue] = useState({});

    useEffect(() => {
        (async () => {
            const response = await axios.get(Config.API_BASE_URL+`/user/getAllRoles`);

            setRoleList(response.data.roles)
            // console.log(response.data.roles);
        })()
        //   return () => {  }
    }, [])

    const handleChange = (event) => {
        setFormValue({
          ...formValue,
          [event.target.id]: event.target.value
        });
      }

async function submitForm(e){
e.preventDefault();
try {
    // make axios post request
    const response = await axios.post(Config.API_BASE_URL+"/user/createUser",formValue);

    alert(response.data.message)
    location.reload();
  } catch(error) {
    console.log(error)
  }


}

    return (


        <div>
            <div>

                <form  onSubmit={ submitForm}>
                    <div >
                        <label htmlFor="userName">Name</label>
                        <input type="text" id="userName" placeholder="" required onChange={handleChange}  />
                    </div>

                    <div >
                        <label htmlFor="empID">Employee ID</label>
                        <input type="text" id="empID" placeholder="" required onChange={handleChange}  />
                    </div>

                    <div >
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" required onChange={handleChange} >
                        <option selected={true} value='' >Select</option>
                       { roleList.map((data,i)=>{
                       return <option key={i} value={data.id}>{data.name}</option>
                        })}
                            
                        </select>
                    </div>

                    <div >
                        <label htmlFor="status">Status</label>
                        <select selected={true} value='' name="status" id="status" required onChange={handleChange} >
                        <option selected value>Select</option>
                            <option  value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        
                    </div>

                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" required placeholder="" onChange={handleChange}  />
                    </div>

                    <button  type='submit'>Save Changes</button>

                </form>

                <button onClick={() => setAddUserPopup(false)} >Close</button>

            </div>
        </div>
    )
}

export default AddUser;