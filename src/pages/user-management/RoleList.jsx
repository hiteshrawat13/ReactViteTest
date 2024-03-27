import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import RolePopup from "./RolePopup.jsx";
import AddRole from "./AddRole.jsx";
const RoleList = () => {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [deleted, setDeleted] = useState([]);
  const [roleData, setRoleData] = useState("");

  const [addRolePopup, setAddRolePopup] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8888/user/getAllRoles`
    );

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
      cell: row => <button onClick={()=>openPopup(row)}>Edit</button>
    }
  ];
  




function openPopup(rowData) {
  setRoleData(rowData);
}


  return (
    <>

<button onClick={()=>setAddRolePopup(true)}>Add Role </button>


{addRolePopup && (<AddRole setAddRolePopup={setAddRolePopup}/>)}


    <DataTable
      title="Roles"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      
      // selectableRows
      // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />
    {roleData !== "" && (<RolePopup roleData={roleData} setRoleData={setRoleData} />)}
    </>
  );
}

export default RoleList;

 