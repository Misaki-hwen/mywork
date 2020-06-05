'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const middlewareSchema = new Schema({
    user: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'employee' }],
    roleName: { type: mongoose.SchemaTypes.ObjectId, ref: 'role' },
  });
  return mongoose.model('middleware', middlewareSchema);
};
