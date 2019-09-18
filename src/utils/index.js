import tool from './tool';
import date from './date-helper';
import http from './http-helper';
import error from './error-helper';
import regex from './regex';

/**
 * 注意:
 * 如果不是使用很频繁的方法,用上面的形式引入
 * 下面这些方法是使用比较频繁的一些方法
 */
/* eslint-disable no-undef */

export const getResourcePath = (name) => {
  return `${CONFIG.resourcePath}${name}`;
};

export const getFrontPath = (name) => {
  return `${CONFIG.frontPath}${name}`;
};

// 根据用户id找到用户头像
export const getUserLogo = (userId) => {
  return `${CONFIG.frontPath}/user/userLogoUrl.htm?userId=${userId}`;
};

/**
 * 动态引入图片
 *
 * @param {string} name
 * @returns
 */
export const getImg = (name) => {
  let img = require(`@img/${name}`);
  if (img.indexOf('data:image') > -1) {
    return img;
  } else {
    return `${CONFIG.resourcePath}/images/${name}`;
  }
};

/**
 * @description 获取错误信息
 *
 * @param {object} data
 * @returns
 */
export const getError = error.getError;
export const getErrorCode = error.getErrorCode;
export const showErrorModal = error.showErrorModal;
export const showErrorMessage = error.showErrorMessage;

/**
 * @description 请求数据方法
 */
export const request = http.request;
export const get = http.get;
export const post = http.post;
export const upload = http.upload;

/**
 * @description 获取权限
 */
export const getAuth = (auth) => {
  const authorities = CONFIG.authorities;
  const reg = new RegExp(auth + '(]|,)');
  if (reg.test(authorities)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description 设置分页
 * @param {object} config pagination的配置选项
 * @returns {object} pagination的配置
 */

export const setPagination = (config) => {
  if (Object.prototype.toString.call(config) !== '[object Object]') {
    T.logError('T.setPagination()方法的参数格式必须是对象哦');
    return CONFIG.pagination;
  }
  return Object.assign(CONFIG.pagination, config);
};

/**
 * ================
 * 开发环境调试用功能
 * ================
 */

/*eslint-disable no-console */
export const log = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
export const logError = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

// 获得URL地址中对应参数的值
export const getParamName = (attr) => {
  let match = RegExp(`[?&]${attr}=([^&]*)`) //分组运算符是为了把结果存到exec函数返回的结果里
    .exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')); // url中+号表示空格,要替换掉
};

export default (window.T = {
  tool,
  date,
  regex,
  error,
  getResourcePath,
  getFrontPath,
  getUserLogo,
  getImg,
  request,
  get,
  post,
  upload,
  getError,
  getErrorCode,
  showErrorModal,
  showErrorMessage,
  getAuth,
  setPagination,
  log,
  logError,
  getParamName
});
