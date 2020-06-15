'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const healthcheckSchema = new Schema({
    year: String, // 年度
    checkDate: Date,
    organization: { type: String },
    checkType: { type: String },
    shouldCheckNum: { type: String },
    actuallNum: { type: String },
    normal: { type: String },
    re_examination: { type: String },
    suspected: { type: String },
    forbid: { type: String },
    otherDisease: { type: String },
    comment: { type: String },
  });
  return mongoose.model('healthcheck', healthcheckSchema);
};
