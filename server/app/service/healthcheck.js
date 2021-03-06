'use strict';

const Service = require('egg').Service;

class ReportService extends Service {
  async add(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Healthcheck.create(params);
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async get() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Healthcheck.find().limit(5);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async delete(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Healthcheck.remove({ _id: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async update(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Healthcheck.update({ _id: params._id }, { $set: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async insertMany(params) {
    const { ctx } = this;
    try {
      console.log(params);
      const res = await ctx.model.Healthcheck.insertMany(params.params);
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async findyear(params) {
    const { ctx } = this;
    try {
      console.log(params);
      let res = ''
      if(params.year == ''){
         res = await ctx.model.Healthcheck.find();
      }else{
         res = await ctx.model.Healthcheck.find({year:params.year});
      }
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReportService;
