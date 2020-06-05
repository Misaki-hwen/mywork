'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async add(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Role.create(params);
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async addbyid(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Role.update({ _id: params._id }, { $set: { name: params.name } });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async deletebyid(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Role.remove({ _id: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async get() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Role.find().limit(10);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getById(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Role.findById(params);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoleService;
