import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";


const HDataTable = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [campData, setCampData] = useState("");


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
          width: "120px" 
      },
      {
          name: 'Created By',
          selector: row => row.Link_Created_By,
          sortable: true,
          width: "120px" 
      },
  ]

      
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




  const fetchUsers = async (page, size = perPage) => {
    setLoading(true);
    const response = await axios.get(
      `http://192.168.1.14:8888/camplist/getLinks?camp_name=46990%20-%20WTWH%20Media%20LLC-CPL-Q2-ABM-Liquid%20Instruments-APAC-Incremental-XDBS%20Corp`
    );

    console.log(response.data);
  setData(response.data)

    setTotalRows(response.data.totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);
    return (
        <>
            <DataTable
                //title="Users"
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
                onRowClicked={(e) => {alert("EE")}}
                
            // selectableRows
            // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
            />
           
        </>
    )
}

export default HDataTable