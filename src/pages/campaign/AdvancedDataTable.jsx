import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import LinksModal from "./LinksPopupModal.jsx";
import Config from "../../Config.js";

const AdvancedDataTable = () => {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [campData, setCampData] = useState("");
  // const [deleted, setDeleted] = useState([]);

  const fetchUsers = async (page, size = perPage) => {
    setLoading(true);
    const response = await axios.get(
      Config.API_BASE_URL+`/camplist/getCampList?page=${page}&per_page=${size}`
    );

  setData(response.data.data)

    setTotalRows(response.data.totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleDelete = useCallback(
    row => async () => {
      // await axios.delete(`https://reqres.in/api/users/${row.id}`);
      // const response = await axios.get(
      //   `https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
      // );

      // setData(removeItem(response.data.data, row));
      // setTotalRows(totalRows - 1);
    },
    [currentPage, perPage, totalRows]
  );

  const columns = [
    {
      name: 'Campaign ID',
      selector: row => row.camp_id,
      sortable: true,
    },
    {
      name: 'Campaign Name',
      selector: row => row.camp_name,
      sortable: true,
    },

    {
      name: 'Category',
      selector: row => row.Category,
      sortable: true,
    },

    {
      name: 'Client Code',
      selector: row => row.Client_Code,
      sortable: true,
    },

    {
      name: 'Country',
      selector: row => row.Country,
      sortable: true,
    },

    { 
      name: 'Created By',
      selector: row => row.camp_Created_By,
      sortable: true,
    }
   
    // {
    //   cell: row => <button onClick={()=>alert("DD")}>Delete</button>
    // }
  ];
  


  const handlePageChange = page => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  function openLinksPopup(data){
    setCampData(data);
  }

  return (
    <>
    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      highlightOnHover={true}
      onRowClicked={(e)=>{openLinksPopup(e)}}
      // selectableRows
      // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />

    {campData !== "" && (<LinksModal campData={campData} setCampData={setCampData} />)}
     </>
  );
}

export default AdvancedDataTable



const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(newArray.findIndex(a => a === item), 1);
  
    return newArray;
  };
  
 