import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import RolePopup from "./RolePopup.jsx";
import AddRole from "./AddRole.jsx";
import Config from "../../Config.js";
import Modal from "react-responsive-modal";
const RoleList = () => {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [deleted, setDeleted] = useState([]);
  const [roleData, setRoleData] = useState("");

  const [addRolePopup, setAddRolePopup] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    const response = await axios.get(Config.API_BASE_URL+`/user/getAllRoles`);

  setData(response.data.roles)
  console.log(response.data.roles,"---");
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);



  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Action',
      cell: row => <button onClick={()=>openEditRolePopup(row)}>Edit</button>
    }
  ];
  




function openEditRolePopup(rowData) {
  setRoleData(rowData);
}


  return (
    <>

<button onClick={()=>setAddRolePopup(true)}>Add Role </button>

<Modal open={addRolePopup} onClose={()=>{setAddRolePopup(false)}} center>
        
        <AddRole setAddRolePopup={setAddRolePopup}/>
</Modal>

 
    <DataTable
      title="Roles"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      // selectableRows
      // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />


    
    <Modal open={roleData?true:false} onClose={()=>{setRoleData('')}} center>
      <RolePopup roleData={roleData} setRoleData={setRoleData} />
    </Modal>

    </>
  );
}

export default RoleList;

 