import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const AdvancedDataTable = () => {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);

  const fetchUsers = async (page, size = perPage) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8888/list?page=${page}&per_page=${size}`
    );

  setData(response.data.data)

  console.log(response.data.data,"---");
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
      name: 'Campaign Name',
      selector: row => row.camp_name,
      sortable: true,
    },
    {
      name: 'Campaign Type',
      selector: row => row.camp_id,
      sortable: true,
    },
    {
      // eslint-disable-next-line react/button-has-type
      cell: row => <button onClick={()=>alert("DD")}>Delete</button>
    }
  ];
  

 

  const handlePageChange = page => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  return (
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
      onRowClicked={(e)=>{alert(e);console.log(e,"EEEEEEEEEE");}}
     
      selectableRows
      onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />
  );
}

export default AdvancedDataTable



const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(newArray.findIndex(a => a === item), 1);
  
    return newArray;
  };
  
 