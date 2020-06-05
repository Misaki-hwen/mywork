'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const employeeSchema = new Schema({
    name: { type: String },
    // user: { type: mongoose.SchemaTypes.ObjectId, ref: 'employee' },
    // parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'role' },
  });
  return mongoose.model('employee', employeeSchema);
};
