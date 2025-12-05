const db = require('../database');

class Employee {
  static create(employeeData) {
    return new Promise((resolve, reject) => {
      const { name, email, department, role, hireDate } = employeeData;
      const sql = `
        INSERT INTO employees (name, email, department, role, hireDate)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [name, email, department, role, hireDate], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...employeeData });
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM employees ORDER BY id DESC';
      
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM employees WHERE id = ?';
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findByDepartment(department) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM employees WHERE department = ? ORDER BY id DESC';
      
      db.all(sql, [department], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, employeeData) {
    return new Promise((resolve, reject) => {
      const { name, email, department, role, hireDate } = employeeData;
      const sql = `
        UPDATE employees 
        SET name = ?, email = ?, department = ?, role = ?, hireDate = ?, 
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [name, email, department, role, hireDate, id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Employee not found'));
        } else {
          resolve({ id, ...employeeData });
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM employees WHERE id = ?';
      
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Employee not found'));
        } else {
          resolve({ deleted: true, id });
        }
      });
    });
  }
}

module.exports = Employee;
