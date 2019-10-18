interface Window extends Window {
  T: any
  globHistory: any
  gotoPage: Function
}
declare namespace CONFIG {
  const frontPath: string;
  const resourcePath: string;
  const timeDiff: number;
  const loginUserLogo: string;
  const username: string;
  const userId: string;
  const authorities: string;
  let timeRanges: any;
  let normalForm: Function;
  let formItemLayout: {};
  let pagination: {
    pageSizeOptions: Array<string>
    currentPageSize: number
  };
}

declare namespace T {
  // 获取资源地址
  function getResourcePath(name: string): string;
  function getFrontPath(name: string): string;
  function getUserLogo(userId: string): string;
  function getImg(name: string): string;

  // 数据请求
  function request(config: object, callback?: Function): Promise<any>;
  function get(url: string, param?: object, withCredentials?: boolean): Promise<any>;
  function post(url: string, param?: object): Promise<any>;
  function upload(url: string, param: FormData): Promise<any>;

  // 捕获错误
  function getError(data: object): string;
  function getErrorCode(data: object): string;
  function showCatchError(data: object): void;
  function showErrorModal(data: object): void;
  function showErrorMessage(data: object): void;

  // 获取权限
  function getAuth(auth: string): boolean;

  // 调试
  function log(...args: any): void;
  function logError(...args: any): void;

  function getParamName(data: string): string

  // 时间相关工具
  namespace date {
    function getNow(): Date;
    function toDate(dataString: string): Date | null;
    function format(date: Date, _format?: string): string;
    function checkRangePickerDate(date: any[]): boolean;
    function formatRangePickerDate(date: any[], min: string, max: string, needMinAndSec?: boolean): {};
    function getSubjectTime(date: any, needMinAndSec?: boolean): string
  }

  // 数据请求
  namespace http {
    function request(config: object, callback?: Function): Promise<any>;
    function get(url: string, param?: object, withCredentials?: boolean): Promise<any>;
    function post(url: string, param?: object): Promise<any>;
    function upload(url: string, param: FormData): Promise<any>;
  }

  // 工具
  namespace tool {
    function zeropad(val: number, len: number): string;
    function debounce(func: Function, wait: number, immediate: boolean): Function;
    function throttle(fn: Function, delay: number): Function;
    function splitBase64(base64: string): string;
    function dataURLtoBlob(dataURI: string): Blob;
  }

  // 错误处理
  namespace error {
    function getError(data: object): string;
    function getErrorCode(data: object): string;
    function showCatchError(data: object): void;
    function showErrorModal(data: object): void;
    function showErrorMessage(data: object): void;
  }

  namespace math {
    function floatAdd(arg1, arg2): number;
    function floatSub(arg1, arg2): number;
    function floatMul(arg1, arg2): number;
    function floatDiv(arg1, arg2): number;
  }

  // 常用正则
  namespace regex {
    const password: RegExp; //字符验证，支持字母、数字和特殊字符（仅限!@#$%^&*())
    const cell: RegExp; // 手机号
    const chinese: RegExp; // 中文
    const notSymbol: RegExp; // 中英文数字
    const positiveInteger: RegExp; // 正整数
    const twoDigitNumber: RegExp; // 两位小数
    const reallyName: RegExp; // 中英文姓名
    const checkCardNo: RegExp; // 银行卡号
  }
}
