'use strict';

const Controller = require('egg').Controller;

class HealthCheckController extends Controller {
  // 添加角色名
  async add() {
    const { ctx } = this;
    const params = ctx.request.body;
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
}

module.exports = HealthCheckController;
