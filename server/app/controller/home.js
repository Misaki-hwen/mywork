'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async addtomw() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.home.add(params);
    ctx.body = { code: 200, data: res };
  }
  async addbyid() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('看这里');
    console.log(params);
    const res = await ctx.service.home.addbyid(params);
    this.ctx.body = { code: 200, data: res };
  }
  async addbyid2() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('看这里');
    console.log(params);
    const res = await ctx.service.home.addbyid2(params);
    this.ctx.body = { code: 200, data: res };
  }
  async getmanage() {
    const { ctx } = this;
    const res = await ctx.service.home.get();
    ctx.body = { code: 200, data: res };
  }
  async getById() {
    const { ctx } = this;
    const result = ctx.params.id;
    const res = await ctx.service.home.getById(result);
    ctx.body = { code: 200, data: res };
  }
  async deletebyid() {
    const { ctx } = this;
    const params = ctx.params.id;
    const res = await ctx.service.home.deletebyid(params);
    ctx.body = { code: 200, data: res };

  }
}

module.exports = HomeController;
