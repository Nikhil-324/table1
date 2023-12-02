// Table.js

import React, { useState, useEffect } from 'react';
import './style.css';
import Data from './data';
import Pagination from './pagination';

function Table() {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentpage, setcurrentdata] = useState(1);
  const [datasperpage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const keys = ['name', 'email', 'role'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      filterMembers(searchTerm);
    }
  };

  const filterMembers = (term) => {
    const filteredData = members.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredMembers(filteredData);
    setcurrentdata(1); 
  };

  const indexoflastdata = currentpage * datasperpage;
  const indexoffirstdata = indexoflastdata - datasperpage;
  const currentdatas = filteredMembers.slice(indexoffirstdata, indexoflastdata);

  const paginate = (pagenumber) => {
    setcurrentdata(pagenumber);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    const newMembers = members.filter((member) => !selectedRows.includes(member.id));
    setMembers(newMembers);
    setFilteredMembers(newMembers);
    setSelectedRows([]);
  };
  const handleDelete= (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
    setFilteredMembers(newMembers);
  };
  const handleHeaderCheckboxChange = () => {
    if (selectedRows.length === currentdatas.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentdatas.map((member) => member.id));
    }
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search"
      />
      <div>
        <table className="table">
          <thead>
            <tr className="tr">
              <th>
                <input   type="checkbox"
                  className="checkbox"
                  checked={selectedRows.length === currentdatas.length}
                  onChange={handleHeaderCheckboxChange}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <Data members={currentdatas} handleCheckboxChange={handleCheckboxChange} handleDelete={handleDelete} selectedRows={selectedRows}/>
        </table>
        <div className='bottom'>
          <button className='delet-selected' onClick={handleDeleteSelected}>
            Delete Selected
          </button>
          <Pagination datasperpage={datasperpage} totaldatas={filteredMembers.length} paginate={paginate} currentpage={currentpage} />
        </div>
      </div>
    </div>
  );
}

export default Table;
