'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/add', controller.role.add);
  // router.put('/add/:id', controller.role.addbyid);
  router.post('/addbyid', controller.role.addbyid);
  // router.delete('/delete/:id', controller.role.deletebyid);
  router.post('/delete', controller.role.deletebyid);
  router.get('/get', controller.role.get);
  router.get('/getbyid', controller.role.getById);
  // employee
  router.post('/addemployee', controller.employee.addemployee);
  router.put('/addemployee/:id', controller.employee.addbyid);
  router.delete('/deleteemployee/:id', controller.employee.deletebyid);
  router.get('/getemployee', controller.employee.get);
  router.get('/getbyidemployee/:id', controller.employee.getById);
  // middleware
  router.post('/addtomiddleware', controller.home.addtomw);
  router.post('/addtomiddlewarebyid', controller.home.addbyid);
  router.put('/addtomiddlewarebyidya/:id', controller.home.addbyid2);
  router.get('/getmanage', controller.home.getmanage);
  router.get('/getmanagebyid/:id', controller.home.getById);
  router.delete('/deletemw/:id', controller.home.deletebyid);
  // 个人防护用品管理
  // 提交
  router.post('/adddefendproduct', controller.defendproducts.add);
  // 获取数据
  router.get('/getdefendproduct', controller.defendproducts.get);
  // 更新数据
  router.post('/updatedefendproduct', controller.defendproducts.update);
  // 表格删除
  router.post('/deletedefendproduct', controller.defendproducts.delete);
  // 文件删除
  router.post('/deletefile', controller.defendproducts.deletefile);
  router.post('/upload', controller.defendproducts.add);

  // 职业健康检查
  router.post('/addCheckInfo', controller.healthcheck.add);
  router.get('/getCheckInfo', controller.healthcheck.get);
  router.post('/deleteCheckInfo', controller.healthcheck.delete);
  router.post('/updateCheckInfo', controller.healthcheck.update);
  router.post('/updateManyCheckInfo', controller.healthcheck.insertMany);

  // 疑似职业病患者表
  router.post('/addSuspectInfo', controller.suspectlist.add);
  router.post('/insertSuspectInfo', controller.suspectlist.insertMany);
  router.get('/findSuspectInfo', controller.suspectlist.get);
  router.post('/deleteInllnessFile', controller.suspectlist.deletefile);
};
