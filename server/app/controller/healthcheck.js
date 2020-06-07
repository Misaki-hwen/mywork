'use strict';

const Controller = require('egg').Controller;

class HealthCheckController extends Controller {
  // 添加角色名
  async add() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.healthcheck.add(params);
    ctx.body = { code: 200, msg: '添加成功', data: res };

  }
  async get() {
    const { ctx } = this;
    const res = await ctx.service.healthcheck.get();
    ctx.body = { code: 200, data: res };
  }
  async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.healthcheck.delete(params);
    ctx.body = { code: 200, data: res };
  }
  // 更新单条数据
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.healthcheck.update(params);
    console.log(res)

    ctx.body = { code: 200, msg:"修改成功", data: res };

  }
  // 提交按钮提交所有数据
  async updateMany() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await this.ctx.service.healthcheck.updateMany(params);
    ctx.body = { code: 200, data: res };
  }
}

module.exports = HealthCheckController;
