import tool from './tool';
import date from './date-helper';
import http from './http-helper';
import error from './error-helper';
import regex from './regex';
import math from './math-helper';

/**
 * 注意:
 * 如果不是使用很频繁的方法,用上面的形式引入
 * 下面这些方法是使用比较频繁的一些方法
 */
/* eslint-disable no-undef */

export const getResourcePath = (name: string): string => {
  return `${CONFIG.resourcePath}${name}`;
};

export const getFrontPath = (name: string): string => {
  return `${CONFIG.frontPath}${name}`;
};

export const getUserLogo = (userId: string): string => {
  return `${CONFIG.frontPath}/user/userLogoUrl.htm?userId=${userId}`;
};

declare const require: Function;
export const getImg = (name: string): string => {
  let img = require(`@img/${name}`);
  if (img.indexOf('data:image') > -1) {
    return img;
  } else {
    return `${CONFIG.resourcePath}/images/${name}`;
  }
};

/**
 * @description 获取权限
 */
export const getAuth = (auth: string): boolean => {
  const authorities = CONFIG.authorities;
  const reg = new RegExp(auth + '(]|,)');
  if (reg.test(authorities)) {
    return true;
  } else {
    return false;
  }
};

declare const process: any;
export const log = (...args: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
export const logError = (...args: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

// 获得URL地址中对应参数的值
export const getParamName = (attr: string): string => {
  let match = RegExp(`[?&]${attr}=([^&]*)`) //分组运算符是为了把结果存到exec函数返回的结果里
    .exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')); // url中+号表示空格,要替换掉
};

/**
 * @description 获取错误信息
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

const tools = {
  tool,
  date,
  regex,
  error,
  math,
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
  log,
  logError,
  getParamName
}
window.T = tools;
export default tools;
