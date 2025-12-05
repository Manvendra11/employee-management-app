# Employee Management System

A full-stack employee management application with CRUD operations, built with Node.js, Express, SQLite, and React.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete employee records
- 🔍 **Search & Filter**: Search employees by name, email, or role
- 🏢 **Department Filter**: Filter employees by department
- 📊 **Employee Fields**: ID, Name, Email, Department, Role, Hire Date
- 🎨 **Modern UI**: Clean and responsive React interface
- 🔒 **Error Handling**: Comprehensive validation and error handling
- 🚀 **RESTful API**: Well-structured API design

## Tech Stack

**Backend:**
- Node.js
- Express.js
- SQLite3
- CORS

**Frontend:**
- React 18
- Axios
- CSS3

## Project Structure

```
employee-management-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── employeeController.js
│   │   ├── models/
│   │   │   └── Employee.js
│   │   ├── routes/
│   │   │   └── employeeRoutes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── database.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EmployeeList.js
    │   │   ├── EmployeeForm.js
    │   │   └── EmployeeDetail.js
    │   ├── services/
    │   │   └── employeeService.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| GET | `/api/employees/department/:department` | Get employees by department |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## API Request Examples

### Create Employee
```bash
POST /api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "role": "Software Engineer",
  "hireDate": "2024-01-15"
}
```

### Update Employee
```bash
PUT /api/employees/1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "role": "Senior Software Engineer",
  "hireDate": "2024-01-15"
}
```

## Available Departments

- Engineering
- HR
- Finance
- Marketing
- Sales
- Operations

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # React development server with hot reload
```

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## License

MIT License - see LICENSE file for details
