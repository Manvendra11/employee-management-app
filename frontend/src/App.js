import React, { useState, useEffect } from 'react';
import employeeService from './services/employeeService';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees, departmentFilter, searchTerm]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data || []);
    } catch (err) {
      setError('Failed to load employees. Please try again later.');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.department === departmentFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.role.toLowerCase().includes(term)
      );
    }

    setFilteredEmployees(filtered);
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
    setViewEmployee(null);
  };

  const handleView = (employee) => {
    setViewEmployee(employee);
  };

  const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      try {
        await employeeService.deleteEmployee(employee.id);
        await loadEmployees();
      } catch (err) {
        alert('Failed to delete employee. Please try again.');
        console.error('Error deleting employee:', err);
      }
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setSelectedEmployee(null);
    await loadEmployees();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  const handleCloseDetail = () => {
    setViewEmployee(null);
  };

  const departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏢 Employee Management System</h1>
        <p>Manage your workforce efficiently</p>
      </header>

      <main className="app-main">
        {showForm ? (
          <EmployeeForm
            employee={selectedEmployee}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="controls">
              <div className="controls-left">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filter-box">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-add" onClick={handleAddNew}>
                + Add Employee
              </button>
            </div>

            <div className="stats">
              <div className="stat-card">
                <span className="stat-value">{filteredEmployees.length}</span>
                <span className="stat-label">
                  {departmentFilter ? `in ${departmentFilter}` : 'Total Employees'}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading employees...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}
          </>
        )}
      </main>

      {viewEmployee && (
        <EmployeeDetail
          employee={viewEmployee}
          onClose={handleCloseDetail}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
