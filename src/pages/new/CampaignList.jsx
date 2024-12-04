import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
 
import Config from "../../Config.js";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const CampaignList = () => {
   const navigate=useNavigate()
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
      Config.API_BASE_URL+`/camplist/getCampList?page=${page}&per_page=${size}&user_id=${Cookies.get("user_id")}`
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
      name: 'Client Code',
      selector: row => row.Client_Code,
      sortable: true,
      width: "100px"  
    },
    
    {
      name: 'Campaign ID',
      selector: row => row.camp_id,
      sortable: true,
      width: "100px"  
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
      width: "100px"  
    },

   

    {
      name: 'Country',
      selector: row => row.Country,
      sortable: true,
      width: "100px"  
    },

    { 
      name: 'Created By',
      selector: row => row.camp_Created_By,
      sortable: true,
      width: "180px"  
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

    const { 
        Client_Code:clientCode,
        Category:category,
        camp_id:campaignId,
        camp_name:campaignName,
        camp_Created_By:campCreatedBy,
        last_edited_By:lastEditedBy,
        comment:comment,
        Country:country
      }=data

    navigate(`/linklist`,{state:
        {
           clientCode,
           category,
            campaignId,
            campaignName,
            campCreatedBy,
            lastEditedBy,
            comment,
            country,

        }

    })
   
    console.log(data);
  }

  return (
    <>
    <DataTable
      title="My Campaigns"
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

    
     </>
  );
}

export default CampaignList



 
  
 