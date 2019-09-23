/**
 * 自动补充0，比如在分钟把 3 变成 03
 *
 * @param {Int} val 传入的数字
 * @param {Int} len 要填补0的个数
 * @returns {String} val
 */
const zeropad = (val: number, len?: number): string => {
  let value = '' + val;
  let zeropadLen = len || 2;
  while (value.length < zeropadLen) {
    value = '0' + val;
  }
  return value;
};

/**防抖
 * 触发完事件 n 秒内不再触发事件,一般用在事件频繁触发的情况
 *
 * @param {*} func 回调函数
 * @param {*} wait 等待时间
 * @param {*} immediate  是否立即执行
 */
const debounce = (func: Function, wait: number, immediate: boolean): Function => {
  let timeout, result;

  const debounced = function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

// 节流
const throttle = function (fn: Function, delay: number): Function {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

// 分割base64,后端要用
const splitBase64 = (base64: string): string => {
  if (base64.indexOf(';base64,') !== -1) {
    return base64.split(';base64,')[1];
  }
  return base64;
};

//base64转blob
const dataURLtoBlob = (dataURI: string): Blob => {
  let byteString = atob(dataURI.split(',')[1]);

  let mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  let arrayBuffer = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  let dataView = new DataView(arrayBuffer);
  let blob = new Blob([dataView], { type: mimeString });
  return blob;
};

//图片转base64
const getBase64Image = (imgUrl: string): Promise<any> => {
  return new Promise((resolve) => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = imgUrl;
    img.onload = () => {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = (err) => {
      throw new Error(`图片加载出错,地址：${imgUrl},error为${err}`);
    };
  });
};

export default {
  zeropad,
  dataURLtoBlob,
  debounce,
  throttle,
  splitBase64,
  getBase64Image,
};
