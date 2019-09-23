import axios from 'axios';
import qs from 'qs';
/**
 * @example <caption>请求数据方法</caption>
 * T.request(config).then();
 *
 * @param {object} config - 参数,格式与axios的一致
 * @param {Function} callback - 回调函数
 */
const request = (config: object, callback?: Function): Promise<any> => {
  const CancelToken = axios.CancelToken;
  return axios(
    Object.assign(
      {
        method: 'get',
        cancelToken: new CancelToken(function executor(c: any) {
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
 * T.get(url, params).then();
 *
 * @param {string} url - 路径
 * @param {object} params - 参数
 */
const get = (url: string, params: object = {}, withCredentials: boolean = false): Promise<any> => {
  Object.assign(params, { _: new Date().valueOf() });
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        withCredentials,
      })
      .then((response: any) => {
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
 */

const post = (url: string, data: object = {}, withCredentials: boolean = false): Promise<any> => {
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
      .then((response: any) => {
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
 * @example <caption>上传数据方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {FormData} formData - new FormData()
 */
const upload = (url: string, formData: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => {
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

export default {
  request,
  get,
  post,
  upload,
};
