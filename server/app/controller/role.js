'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  // 添加角色名
  async add() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.role.add(params);
    ctx.body = { code: 200, data: res };

  }
  // 根据id修改角色名
  async addbyid() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.role.addbyid(params);
    ctx.body = { code: 200, data: res };

  }
  // 删除角色名
  async deletebyid() {
    const { ctx } = this;
    // const params = ctx.params.id;
    const params = ctx.request.body;
    console.log('看这里');
    console.log(params);
    const res = await ctx.service.role.deletebyid(params);
    ctx.body = { code: 200, data: res };

  }
  // 获取角色名
  async get() {
    const { ctx } = this;
    const res = await ctx.service.role.get();
    ctx.body = { code: 200, data: res };
  }
  // 根据id获取角色名
  async getById() {
    const { ctx } = this;
    const result = ctx.request.query;
    const res = await ctx.service.role.getById(result);
    ctx.body = { code: 200, data: res };
  }
}

module.exports = RoleController;
