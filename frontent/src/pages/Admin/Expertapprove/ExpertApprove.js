import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axiox from 'axios'


function AdminExpertInfoPage() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllUsers();
    async function getAllUsers() {
        
      const response = await axiox.get('http://localhost:4000/admin/expert_approve');
      setUserDetails(response.data.details);
    }
  }, [userDetails]);

  async function block(id) {
    const token = localStorage.getItem('adminToken');
   
    const data = await axiox.put(`http://localhost:4000/admin/expertPending/${id}`);
    console.log(data);
    if (data.blocked) {
      setUserDetails(data.userDetails);
    }
  }

  async function unblock(id) {
    const token = localStorage.getItem('adminToken');
    
    const data = await axiox.put(`http://localhost:4000/admin/expertnotapproved/${id}`);
    console.log(data);
    if (data.blocked) {
      window.location.reload(true);
      setUserDetails(data.userDetails);
    }
  }



  const columns = [
    {
      name: 'Name',

      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name:"service",
      selector:(row)=>row.service
    },
  
  
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.approved ? (
              
                <button
                
                  onClick={()=>unblock(row._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                   Approved
                </button>

            ) : (
              <button
                onClick={() => block(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
               Pending
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mx-auto ">

    

        <DataTable
          title="All Users"
          columns={columns}
          data={userDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default AdminExpertInfoPage;