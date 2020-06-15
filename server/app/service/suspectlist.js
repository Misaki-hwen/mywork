'use strict';

const Service = require('egg').Service;

class SuspectedListService extends Service {
  async add(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Suspectlist.updateOne({ companyId: '人生无极限有限公司' }, { $addToSet: { formData: params } });
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async get(e) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Suspectlist.findOne({ companyId: e.companyId }).limit(5);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async delete(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Suspectlist.remove({ _id: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async deletefile(params) {
    const { ctx } = this;
    try {
      if (params.file) {
        // await ctx.model.Defendproducts.updateOne({ _id: params._id }, { $unset: { invoice: { webname: params.invoice } } });
        await ctx.model.Suspectlist.updateOne({ _id: params._id }, { $pull: { fileList: { webname: params.file } } });
      }
    } catch (error) {
      throw error;
    }
  }
  async update(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Suspectlist.update({ _id: params._id }, { $set: params });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  async insertMany(params) {
    const { ctx } = this;
    try {
      console.log(params);
      const res = await ctx.model.Suspectlist.update({ companyId: params.companyId }, params, { upsert: true });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SuspectedListService;
