import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const employeeService = {
  getAllEmployees: async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  },

  getEmployeesByDepartment: async (department) => {
    const response = await axios.get(`${API_URL}/employees/department/${department}`);
    return response.data;
  },

  createEmployee: async (employeeData) => {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  },

  updateEmployee: async (id, employeeData) => {
    const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
  }
};

export default employeeService;
