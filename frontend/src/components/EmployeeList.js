import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="employee-list">
      {employees.length === 0 ? (
        <div className="empty-state">
          <p>No employees found</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="department-badge">
                      {employee.department}
                    </span>
                  </td>
                  <td>{employee.role}</td>
                  <td>{formatDate(employee.hireDate)}</td>
                  <td className="actions">
                    <button 
                      className="btn-action btn-view" 
                      onClick={() => onView(employee)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-action btn-edit" 
                      onClick={() => onEdit(employee)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-action btn-delete" 
                      onClick={() => onDelete(employee)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
