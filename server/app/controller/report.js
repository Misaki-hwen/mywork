'use strict';

const Controller = require('egg').Controller;

class ReportController extends Controller {
  // 添加角色名
  async add() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.report.add(params);
    ctx.body = { code: 200, msg: '添加成功', data: res };
  }
  async get() {
    const { ctx } = this;
    const res = await ctx.service.report.get();
    ctx.body = { code: 200, data: res };
  }
  async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.report.delete(params);
    ctx.body = { code: 200, data: res };
  }
  // 更新单条数据
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.report.update(params);
    console.log(res);

    ctx.body = { code: 200, msg: '修改成功', data: res };

  }
  // 提交按钮提交所有数据
  async insertMany() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await this.ctx.service.report.insertMany(params);
    ctx.body = { code: 200, data: res };
  }
  async findyear() {
    const { ctx } = this;
    const params = ctx.request.query;
    console.log(params);
    const res = await this.ctx.service.report.findyear(params);
    ctx.body = { code: 200, data: res };
  }
}

module.exports = ReportController;
