'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
// const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const pump = require('pump');

class DefendProductsController extends Controller {
  async parseData() {
    const { ctx, config } = this;
    // 获取文件流
    // 多个图片/文件
    const parts = await ctx.multipart({ autoFields: true });
    // 如果要获取同时上传的多个文件，不能通过ctx.getFileStream()来获取
    // 需要通过 ctx.multipart({ autoFields:true }) 获取
    // autoFields: true 表示获取除了文件字段以外的其他信息字段
    const params = {};
    const invoiceFiles = [];
    const certificationFiles = [];
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
      if (stream.fieldname.startsWith('certification')) {
        // certifications.push
        // invoiceFiles
        const obj = {};
        obj.webname = filename;
        obj.name = stream.filename;
        console.log('certification');
        certificationFiles.push(obj);
      } else if (stream.fieldname.startsWith('invoice')) {
        const obj = {};
        obj.webname = filename;
        obj.name = stream.filename;
        invoiceFiles.push(obj);
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
    // const invioces = parts.field.invioceFile.map(item => {
    //   if(item.name && item.webname && parts.field.invioceFile.length!=0){
    //     return {}
    //   }
    // });
    const invoiceData = JSON.parse(parts.field.invioceFile).filter(item => {
      return item.name && item.webname;
    });
    invoiceData.map(item => {
      return invoiceFiles.push(item);
    });
    const certificationData = JSON.parse(parts.field.certificationFile).filter(item => {
      return item.name && item.webname;
    });
    certificationData.map(item => {
      return certificationFiles.push(item);
    });
    console.log('here is mama');
    console.log(invoiceFiles);
    console.log(certificationFiles);
    params.companyId = parts.field.companyId;
    params.formData = JSON.parse(parts.field.formData);
    params.invoice = invoiceFiles;
    params.certifications = certificationFiles;
    console.log(params);
    return params;
  }
  /* async parseData() {
    // 获取文件流
    const { ctx, config } = this;
    // const stream = await ctx.getFileStream();
    const parts = ctx.multipart({ autoFields: true });
     let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) { // 注意如果没有传入直接返回
        return;
      }
      console.log(stream);
      console.log('=================================================');
      const filedname = stream.filedname;
      console.log(filedname);
      const formData = stream.formData;
      const companyId = stream.companyId;

      // 文件名:随机数+时间戳+原文件后缀
      const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
      const params = { companyId, formData, invoice: filename };
      // JSON.parse()
      // 图片存放在静态资源public/img文件夹下
      const target = path.resolve(config.uploadPath, filename);
      try {
      // 生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        // 异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (error) {
      // 如果出现错误，关闭管道,要不然浏览器响应会卡死
        await sendToWormhole(stream);
        throw error;
      }
      return params;
    }
  }*/
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async get() {
    const { ctx } = this;
    const res = await ctx.service.defendproducts.get({ companyId: '人生无极限有限公司' });
    ctx.body = { code: 200, data: res };
  }
  async add() {
    const { ctx } = this;
    const params = await this.parseData();
    console.log('333333333333333333333333333333333333333');
    console.log(params);
    // const params = ctx.request.body
    const res = await ctx.service.defendproducts.add(params);
    ctx.body = { code: 200, data: res };
  }
  async update() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    console.log(params);
    const res = await this.ctx.service.defendproducts.update(params);
    ctx.body = { code: 200, data: res };
  }
  async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.defendproducts.delete(params);
    ctx.body = { code: 200, data: res };
  }
  async deletefile() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const res = await ctx.service.defendproducts.deletefile(params);
    ctx.body = { code: 200, data: res };
  }
}

module.exports = DefendProductsController;
