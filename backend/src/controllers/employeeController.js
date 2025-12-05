const Employee = require('../models/Employee');

const validateEmployeeData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }
  
  if (!data.department || data.department.trim().length === 0) {
    errors.push('Department is required');
  }
  
  if (!data.role || data.role.trim().length === 0) {
    errors.push('Role is required');
  }
  
  if (!data.hireDate) {
    errors.push('Hire date is required');
  }
  
  return errors;
};

exports.createEmployee = async (req, res) => {
  try {
    const errors = validateEmployeeData(req.body);
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors 
      });
    }

    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ 
        error: 'Employee with this email already exists' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to create employee',
        details: error.message 
      });
    }
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json({
      message: 'Employees retrieved successfully',
      data: employees,
      count: employees.length
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve employees',
      details: error.message 
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ 
        error: 'Employee not found' 
      });
    }
    
    res.json({
      message: 'Employee retrieved successfully',
      data: employee
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve employee',
      details: error.message 
    });
  }
};

exports.getEmployeesByDepartment = async (req, res) => {
  try {
    const employees = await Employee.findByDepartment(req.params.department);
    res.json({
      message: 'Employees retrieved successfully',
      data: employees,
      count: employees.length,
      department: req.params.department
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve employees',
      details: error.message 
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const errors = validateEmployeeData(req.body);
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors 
      });
    }

    const employee = await Employee.update(req.params.id, req.body);
    res.json({
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    if (error.message === 'Employee not found') {
      res.status(404).json({ error: 'Employee not found' });
    } else if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ 
        error: 'Employee with this email already exists' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to update employee',
        details: error.message 
      });
    }
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.delete(req.params.id);
    res.json({
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Employee not found') {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.status(500).json({ 
        error: 'Failed to delete employee',
        details: error.message 
      });
    }
  }
};
