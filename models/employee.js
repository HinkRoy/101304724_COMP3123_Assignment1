const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  first_name: {type: String, max: 100, required: true},
  last_name: {type: String, max: 50, required: true},
  email: {type: String, max: 50, required: true, unique: true},
  gender: {type: String, max: 25, enum: ['Male', 'Female', 'Other']},
  salary: {type: Number, required: true},
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
