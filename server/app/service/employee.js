'use strict';

const Service = require('egg').Service;

class EmployeeService extends Service {
  async add(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Employee.create(params);
      console.log('---------');
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async addbyid(params) {
    const { ctx } = this;
    console.log(params);
    try {
      const res = await ctx.model.Employee.update({ _id: params._id }, { $set: { name: params.name } });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async deletebyid(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Employee.remove({ _id: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async get() {
    const { ctx } = this;
    try {
      // const res = await ctx.model.Employee.find().populate('parent').populate('user')
      const res = await ctx.model.Employee.find()
        .limit(10);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getById(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Employee.findById(params);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmployeeService;
