/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587343948811_2636';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    // domainWhiteList: ['*'],
  };
  config.multipart = {
    fileExtensions: [ '.pdf', '.png', '.jpg', '.jpeg' ],
  };
  // 配置跨域
  config.cors = {
    origin: 'http://localhost:8081',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  config.uploadPath = './app/public/';
  config.mongoose = {
    client: {
      url: 'mongodb://localhost/personnelStructure',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
