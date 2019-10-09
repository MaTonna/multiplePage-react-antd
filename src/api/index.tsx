
import { Modal } from "antd";
const { get, post, upload } = T;

const urlMap = {
  uploadImg: "/imageUpload.json",
  refreshAuths: "/refreshAuthority.json",
  exitLogin: "/userLogout.json"
};

const api = {
  getOrigin(url: string) {
    return `${CONFIG.frontPath}/${url}`;
  },

  getResourseOrigin(url: string) {
    return `${CONFIG.resourcePath}/${url}`;
  },

  get(apiName: string, param?: {}) {
    return this.apiDataReq(apiName, param, get);
  },

  post(apiName: string, param?: {}) {
    return this.apiDataReq(apiName, param, post);
  },

  upload(apiName: string, formData: FormData) {
    return this.apiDataReq(apiName, formData, upload);
  },

  apiDataReq(apiName: string, param: {} | FormData, method: Function) {
    return new Promise((resolve, reject) => {
      method(urlMap[apiName], param)
        .then((req: {}) => {
          resolve(req);
        })
        .catch((err: { outputParameters: { targetUrl: "" } }) => {
          if (T.getErrorCode(err) === "USER_NOT_LOGIN") {
            Modal.error({
              title: "错误",
              content: "用户未登录",
              onOk: () => {
                window.location.href = `${window.CONFIG.frontPath}/userLogin.htm`;
              }
            });
          } else {
            reject(err);
          }
        });
    });
  }
};

export default api;
