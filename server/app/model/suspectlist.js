'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const suspectlistSchema = new Schema({
    companyId: { type: String },
    formData: [{
      num: { type: String },
      name: { type: String },
      sex: { type: String },
      age: { type: String },
      position: { type: String },
      factorOfDanger: { type: String },
      illness: { type: String },
      CwithO: { type: String },
      status: { type: String },
    }],
    fileList: [{
      name: { type: String },
      webname: { type: String },
    }],
  });
  return mongoose.model('suspectlist', suspectlistSchema);
};
