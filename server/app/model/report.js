'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const reportSchema = new Schema({
    year: String, // 年度
    company : String,  
    principal: String,  
    accidentReport: String,
    contact: String, 
    takeplace: String,     
    site:String,
    postContent:String,
    contactPeople:String,
    infected:String,
    reated: String,
    die:String,
    factorName:String,
    describe:String,
    opinion:String,
    reportTime:String 
  });
  return mongoose.model('report', reportSchema);
};
