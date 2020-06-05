'use strict';

const Controller = require('egg').Controller;

class EmployeeController extends Controller {
  // 添加角色名
  async addemployee() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.employee.add(params);
    ctx.body = { code: 200, data: res };

  }
  // 根据id修改角色名
  async addbyid() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('看这里');
    console.log(params);
    const res = await ctx.service.employee.addbyid(params);
    ctx.body = { code: 200, data: res };

  }
  // 删除角色名
  async deletebyid() {
    const { ctx } = this;
    const params = ctx.params.id;
    const res = await ctx.service.employee.deletebyid(params);
    ctx.body = { code: 200, data: res };

  }
  // 获取角色名
  async get() {
    const { ctx } = this;
    const res = await ctx.service.employee.get();
    ctx.body = { code: 200, data: res };
  }
  // 根据id获取角色名
  async getById() {
    const { ctx } = this;
    const result = ctx.params.id;
    const res = await ctx.service.employee.getById(result);
    ctx.body = { code: 200, data: res };
  }
}

module.exports = EmployeeController;
