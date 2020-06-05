'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const roleSchema = new Schema({
    name: { type: String },
    // parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'role' },
  });
  return mongoose.model('role', roleSchema);
};
