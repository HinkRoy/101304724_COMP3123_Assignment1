var express = require('express');
const Employee = require("../models/employee");
var router = express.Router();

// User can get all employee list
router.get('/', async function(req, res, next) {
  const employees = await Employee.find({}, '-__v -_id');
  res.json(employees);
});

// User can create new employee
router.post('/', async function(req, res, next) {
  const { first_name, last_name, email, gender, salary } = req.body;

  // Validate the data
  if (!first_name) {
    res.json({
      status: false,
      message: "First name required!"
    });
    return;
  }

  if (!last_name) {
    res.json({
      status: false,
      message: "Last name required!"
    });
    return;
  }

  if (!email) {
    res.json({
      status: false,
      message: "Email required!"
    });
    return;
  }

  let matchedEmployee = Employee.findOne({ email: email });
  if (matchedEmployee.length > 0) {
    res.json({
      status: false,
      message: "Duplicate email!"
    });
    return;
  }

  if (!gender || !["Male", "Female", "Other"].includes(gender)) {
    res.json({
      status: false,
      message: "Gender should be Male/Female/Other"
    });
    return;
  }

  if (!salary) {
    res.json({
      status: false,
      message: "Salary required!"
    });
    return;
  }

  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json({
    status: true,
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    gender: employee.gender,
    salary: employee.salary,
    message: "Employee created successfully"
  });
});

// User can get employee details by employee id
router.get('/:eid', async function(req, res, next) {
  const { eid } = req.params;
  const employee = await Employee.findById(eid, '-__v -_id');
  if (employee) {
    res.json(employee);
  } else {
    res.json({
      status: false,
      message: "Employee not found"
    })
  }
});

// User can update employee details
router.put('/:eid', async function(req, res, next) {
  const { eid } = req.params;

  try {
    await Employee.findByIdAndUpdate(eid, req.body);
    res.json({
      status: true,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      salary: req.body.salary,
      message: "Employee updated successfully"
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});

// User can delete employee by employee id
router.delete('/:eid', async function(req, res, next) {
  const { eid } = req.params;

  try {
    await Employee.deleteOne({ _id: eid });
    res.status(204).json({
      status: true,
      message: "Employee " + eid + " deleted successfully"
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});

module.exports = router;
