'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const pump = require('pump');

class SuspectedListController extends Controller {
  async add() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('hereeeeeee');
    console.log(params);
    const res = await ctx.service.suspectlist.add(params);
    ctx.body = { code: 200, msg: '添加成功', data: res };

  }
  async get() {
    const { ctx } = this;
    const res = await ctx.service.suspectlist.get({ companyId: '人生无极限有限公司' });
    ctx.body = { code: 200, data: res };
  }
  async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.suspectlist.delete(params);
    ctx.body = { code: 200, data: res };
  }
  async deletefile() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.suspectlist.deletefile(params);
    ctx.body = { code: 200, data: res };
  }
  // 更新单条数据
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.suspectlist.update(params);
    console.log(res);

    ctx.body = { code: 200, msg: '修改成功', data: res };

  }
  // 提交按钮提交所有数据
  async insertMany() {
    const { ctx } = this;
    // const params = ctx.request.body;
    const params = await this.parseData();
    console.log(params);
    const res = await this.ctx.service.suspectlist.insertMany(params);
    ctx.body = { code: 200, data: res };
  }
  async parseData() {
    const { ctx, config } = this;
    const parts = await ctx.multipart({ autoFields: true });
    const params = {};
    const fileList = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) { // 注意如果没有传入直接返回
        return;
      }
      console.log(stream);
      const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
      // 图片存放在静态资源public/img文件夹下
      const target = path.resolve(config.uploadPath, filename);
      // 生成一个文件写入 文件流
      const writeStream = fs.createWriteStream(target);
      console.log('==========================================');
      console.log(target);
      console.log(filename);
      if (stream.fieldname.startsWith('file')) {
        // certifications.push
        // invoiceFiles
        const obj = {};
        obj.webname = filename;
        obj.name = stream.filename; // 文件原始名
        fileList.push(obj);
      }
      try {
        // 异步把文件流 写入
        await pump(stream, writeStream); // 写入并销毁当前流
        // await awaitWriteStream(stream.pipe(writeStream));
      } catch (error) {
        // 如果出现错误，关闭管道,防止浏览器响应卡死
        await sendToWormhole(stream);
        writeStream.destroy();
        throw error;
      }
    }
    console.log(parts);
    const originalFile = JSON.parse(parts.field.originalFile).filter(item => {
      return item.name && item.webname;
    });
    originalFile.map(item => {
      return fileList.push(item);
    });
    params.companyId = parts.field.companyId;
    params.formData = JSON.parse(parts.field.formData);
    params.fileList = fileList;
    console.log('===========kkkkkkkk===============');
    console.log(params);
    return params;
  }
}

module.exports = SuspectedListController;
