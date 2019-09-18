import axios from 'axios';
import qs from 'qs';
/**
 * @example <caption>请求数据方法</caption>
 * T.request(config).then();
 *
 * @param {object} config - 参数,格式与axios的一致
 *
 * @returns
 */
const request = (config, callback = null) => {
  const CancelToken = axios.CancelToken;
  return axios(
    Object.assign(
      {
        method: 'get',
        cancelToken: new CancelToken(function executor(c) {
          if (callback) {
            callback(c);
          }
        }),
      },
      config
    )
  );
};

/**
 * @example <caption>get请求数据方法</caption>
 * T.get(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const get = (url, params = {}, withCredentials = false) => {
  Object.assign(params, { _: new Date().valueOf() });
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        withCredentials,
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(() => {
        reject('系统错误');
      });
  });
};

/**
 * @example <caption>post请求数据方法</caption>
 * T.post(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */

const post = (url, data = {}, withCredentials = false) => {
  return new Promise((resolve, reject) => {
    const params = qs.stringify(data);
    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: params,
      url,
      withCredentials,
    })
      .then((response) => {
        const data = response.data;
        /* eslint-disable*/
        if (process.env.NODE_ENV === 'development') {
          if (!CONFIG.noDebug) {
            // console.log('接口', url, '参数', params);
            //console.log('返回结果: ', data, JSON.stringify(data));
          }
        }
        /* eslint-enable*/
        if (data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(() => {
        reject('系统错误');
      });
  });
};

/**
 * @example <caption>上传数据方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {object} formData - new FormData()
 *
 * @returns
 */
const upload = (url, formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(() => {
        reject('系统错误');
      });
  });
};

/**
 * @description 响应拦截器,异常处理
 */
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error && error.response) {
//       switch (error.response.status) {
//         case 400:
//           error.message = '错误请求';
//           break;
//         case 401:
//           error.message = '未授权，请重新登录';
//           break;
//         case 403:
//           error.message = '拒绝访问';
//           break;
//         case 404:
//           error.message = '请求错误,未找到该资源';
//           break;
//         case 405:
//           error.message = '请求方法未允许';
//           break;
//         case 408:
//           error.message = '请求超时';
//           break;
//         case 500:
//           error.message = '服务器端出错';
//           break;
//         case 501:
//           error.message = '网络未实现';
//           break;
//         case 502:
//           error.message = '网络错误';
//           break;
//         case 503:
//           error.message = '服务不可用';
//           break;
//         case 504:
//           error.message = '网络超时';
//           break;
//         case 505:
//           error.message = 'http版本不支持该请求';
//           break;
//         default:
//           error.message = `连接错误${error.response.status}`;
//       }
//     } else if (axios.isCancel(error)) {
//       error.message = '请求超时或者被中断';
//     } else {
//       error.message = '连接到服务器失败';
//     }
//     // message.error(error.message);
//     T.logError(error.response.status, error.message);
//     return Promise.resolve(error.response);
//   }
// );

// axios.defaults.timeout = 10000;

export default {
  request,
  get,
  post,
  upload,
};
