import React from 'react';
import './EmployeeDetail.css';

const EmployeeDetail = ({ employee, onClose, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="employee-detail" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h2>Employee Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="detail-content">
          <div className="detail-item">
            <label>ID:</label>
            <span>{employee.id}</span>
          </div>

          <div className="detail-item">
            <label>Name:</label>
            <span>{employee.name}</span>
          </div>

          <div className="detail-item">
            <label>Email:</label>
            <span>{employee.email}</span>
          </div>

          <div className="detail-item">
            <label>Department:</label>
            <span className="department-badge">{employee.department}</span>
          </div>

          <div className="detail-item">
            <label>Role:</label>
            <span>{employee.role}</span>
          </div>

          <div className="detail-item">
            <label>Hire Date:</label>
            <span>{formatDate(employee.hireDate)}</span>
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn btn-primary" onClick={() => onEdit(employee)}>
            Edit Employee
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
