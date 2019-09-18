declare namespace CONFIG {
  const frontPath: string;
  const kkWorkerWebPath: string;
  const resourcePath: string;
  const timeDiff: number;
  let pageSizeOption: number;
  let pagination: {
    pageSizeOptions: Array<string>
  };
  const username: string;
  const userId: string;
  // 为 true，不显示通用调试信息
  let noDebug: boolean;
  const option: any;
  let formItemLayout: {};
}

declare namespace T {
  // 获取资源地址
  function getResourcePath(name: string): string;
  function getFrontPath(name: string): string;
  function getUserLogo(userId: string): string;
  function getImg(name: string): string;

  // 数据请求
  function request(config: object): Promise<any>;
  function get(url: string, data?: object): Promise<any>;
  function post(url: string, data?: object, withCredentials?: boolean): Promise<any>;
  function upload(url: string, data: object): Promise<any>;

  // 捕获错误
  function getError(data: object);
  function getErrorCode(data: object);
  function showErrorModal(data: object);
  function showErrorMessage(data: object);

  // 获取权限
  function getAuth(auth: string);

  // 设置分页
  function setPagination(config: object);

  // 调试
  function log(...args);
  function logError(...args);

  function getParamName(data: string)

  // 时间相关工具
  namespace date {
    function getNow(): Date;
    function toDate(): Date | null;
    function format(): string;
    function checkRangePickerDate(date: any[]): boolean;
    function formatRangePickerDate(date: any[], min: string, max: string);
  }

  // 数据请求
  namespace http {
    function request(config: object): void;
    function get(url: string, data?: object): Promise<any>;
    function post(url: string, data?: object): Promise<any>;
    function upload(url: string, data: object): void;
  }

  // 工具
  namespace tool {
    function zeropad(val: number, len: number);
    function debounce(func: Function, wait: number, immediate: boolean);
    function throttle(fn: Function, delay: number);
    function splitBase64(base64: string);
    function dataURLtoBlob(...args);
  }

  // 错误处理
  namespace error {
    function getError(data: object);
    function getErrorCode(data: object);
    function showCatchError(data: object);
    function showErrorModal(data: object);
    function showErrorMessage(data: object);
  }

  // 常用正则
  namespace regex {
    var password: RegExp; //字符验证，支持字母、数字和特殊字符（仅限!@#$%^&*())
    var cell: RegExp; // 手机号
    var chinese: RegExp; // 中文
    var notSymbol: RegExp; // 中英文数字
    var positiveInteger: RegExp; // 正整数
    var twoDigitNumber: RegExp; // 两位小数
    var reallyName: RegExp; // 中英文姓名
    var checkCardNo: RegExp; // 银行卡号
  }
}
