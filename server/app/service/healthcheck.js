'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
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
      const res = await ctx.model.Healthcheck.find().limit(10);
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
}

module.exports = RoleService;
