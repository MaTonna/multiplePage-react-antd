import { message, Modal } from 'antd';

/**
 * 获取错误信息
 *
 * @param {object} data
 * @returns 错误信息
 */
const getError = (data: object): string => {
  if (!data) return '';
  if (typeof data !== 'object') {
    return data;
  }
  if (data['detailMessage']) {
    return data['detailMessage'];
  }
  if (data['errorMessage']) {
    if (typeof data['errorMessage'] === 'object') {
      return data['errorMessage']['message'];
    }
    return data['errorMessage'];
  } else if (typeof data['errorEnum'] === 'object') {
    return data['errorEnum']['message'];
  } else if (data['errorCode']) {
    return data['errorCode'];
  } else if (data['error']) {
    if (typeof data['error'] === 'object') {
      return data['error']['message'] || data['error']['code'];
    }
    return data['error'];
  } else if (data['fieldErrors']) {
    return data['fieldErrors'];
  } else {
    T.logError(data);
    return '系统错误';
  }
};

/**
 * 获取错误信息(主要针对的是没有请求到后端接口的情况)[提前拦截了，用不上]
 *
 * @param {object} error
 */
const showCatchError = (error: object): void => {
  T.logError('catchError:', error);
  message.error('系统错误');
};

/**
 * 获取错误代码
 *
 * @param {object} data
 * @returns 错误代码
 */
const getErrorCode = (data: object): string => {
  if (data['errorCode']) {
    return data['errorCode'];
  } else if (data['error'] && typeof data['error'] === 'object') {
    return data['error']['code'];
  } else if (data['errorEnum'] && typeof data['error'] === 'object') {
    return data['errorEnum']['name'] || data['errorEnum']['message'];
  } else if (data['target']) {
    // window.location = data['target'];
  } else {
    return null;
  }
};

/**
 * 用modal显示错误信息
 *
 * @param {object} data
 * @returns
 */
const showErrorModal = (data: object): void => {
  if (getErrorCode(data) === 'USER_NOT_LOGIN') {
    Modal.error({
      title: '提示',
      content: '未登录，请先登录！',
      okText: '去登录',
      onOk() {
        window.location.reload();
      },
    });
  } else {
    Modal.error({
      title: '提示',
      content: getError(data),
    });
  }
};

/**
 * 用message显示错误信息
 *
 * @param {object} data
 */
const showErrorMessage = (data: object): void => {
  if (getErrorCode(data) === 'USER_NOT_LOGIN') {
    Modal.error({
      title: '提示',
      content: '未登录，请先登录！',
      okText: '去登录',
      onOk() {
        window.location.reload();
      },
    });
  } else {
    message.error(getError(data));
  }
};

export default {
  getError,
  getErrorCode,
  showCatchError,
  showErrorModal,
  showErrorMessage,
};
