import React, { useState, useEffect } from 'react';

export default function Data({ members,handleCheckboxChange,handleDelete,selectedRows}) {
  const [updatedMembers, setUpdatedMembers] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);

  useEffect(() => {
    setUpdatedMembers(members);
  }, [members]);

  const handleEdit = (id) => {
    setEditingRowId(id);
  };

  const handleSave = (id) => {
    setEditingRowId(null);
    alert(`Save changes for member with ID: ${id}`);
  };

 

  const handleInputChange = (id, field, value) => {
    const updatedMembersCopy = [...updatedMembers];
    const memberIndex = updatedMembersCopy.findIndex((member) => member.id === id);
    updatedMembersCopy[memberIndex][field] = value;
    setUpdatedMembers(updatedMembersCopy);
  };

  return (
    <tbody>
      {updatedMembers.map((member) => (
         <tr key={member.id} className={selectedRows.includes(member.id) ? 'selected' : ''}>
          <td> <input
               type="checkbox"
               className='checkbox'
               checked={selectedRows.includes(member.id)}
               onChange={() => handleCheckboxChange(member.id)}
            /></td>
          <td>
            {editingRowId === member.id ? (
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleInputChange(member.id, 'name', e.target.value)}
              />
            ) : (
              member.name
            )}
          </td>
          <td>
            {editingRowId === member.id ? (
              <input
                type="text"
                value={member.email}
                onChange={(e) => handleInputChange(member.id, 'email', e.target.value)}
              />
            ) : (
              member.email
            )}
          </td>
          <td>
            {editingRowId === member.id ? (
              <input
                type="text"
                value={member.role}
                onChange={(e) => handleInputChange(member.id, 'role', e.target.value)}
              />
            ) : (
              member.role
            )}
          </td>
          <td>
            {editingRowId === member.id ? (
              <button onClick={() => handleSave(member.id)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(member.id)}>Edit</button>
            )}
            <button onClick={() => handleDelete(member.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
