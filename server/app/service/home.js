'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async add(params) {
    const { ctx } = this;
    console.log('传给service的参数');
    console.log(params);
    try {
      const res = await ctx.model.Middleware.create(params);
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async addbyid(params) {
    const { ctx } = this;
    console.log(params);
    try {
      const res = await ctx.model.Middleware.update({ _id: params.id }, { $set: { user: params.user } });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async addbyid2(params) {
    const { ctx } = this;
    console.log(params);
    try {
      const res = await ctx.model.Middleware.update({ _id: params.id }, { $set: { user: params.user } });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async get() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Middleware.find().populate('roleName').populate('user');
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getById(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Middleware.findById(params);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async deletebyid(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Middleware.remove({ _id: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HomeService;
