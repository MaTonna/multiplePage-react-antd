/**
 * 返回服务器现在的时候
 * @returns {Date} 返回当前时间
 */
const getNow = (): Date => {
  let date = new Date();
  if (CONFIG['timeDiff']) {
    date.setTime(date.valueOf() - CONFIG['timeDiff']);
  }
  return date;
};

/**
 * 字符串转成 Date 格式
 * @param {String} dataString 日期字符
 * @returns {Date} 返回Date类型的时间
 */
const toDate = (dataString: string): Date | null => {
  return dataString ? new Date(Date.parse(dataString.replace(/-/g, '/'))) : null;
};

/**
 * 格式化时间
 *
 * @param {Date} date 时间
 * @param {String} _format 格式 默认为 "yyyy-MM-dd hh:mm:ss";
 * @returns {String} 返回字符
 */
const format = (date: Date, _format?: string): string => {
  const _map = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds(), //millisecond
  };

  _format = _format || 'yyyy-MM-dd hh:mm:ss';

  if (/(y+)/.test(_format)) {
    _format = _format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in _map) {
    if (new RegExp('(' + k + ')').test(_format)) {
      _format = _format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? _map[k] : ('00' + _map[k]).substr(('' + _map[k]).length)
      );
    }
  }

  return _format;
};

/**
 * 检测RangePicker组件时间值是否存在
 *
 * @param {Array} date 时间组件值;
 * @returns {Boolean} 返回布尔值
 */
const checkRangePickerDate = (date: any[]): boolean => {
  if (Array.isArray(date) && date.length) {
    return true;
  }
  return false;
};

/**
 * RangePickerDate组件时间格式化
 *
 * @param {Array} date 时间组件值
 * @param {string} min 范围最小的字段名
 * @param {string} max 范围最大的字段名
 * @param {boolean} needMinAndSec 是否显示时分秒
 * @returns {Object} 返回格式化后的对象
 */

const formatRangePickerDate = (date: any[], min: string, max: string, needMinAndSec: boolean = false): {} => {
  const formatConfig = 'YYYY-MM-DD';
  if (checkRangePickerDate(date)) {
    if (needMinAndSec) {
      return {
        [min]: `${date[0].format(formatConfig)} 00:00:00`,
        [max]: `${date[1].format(formatConfig)} 23:59:59`,
      };
    } else {
      return {
        [min]: date[0].format(formatConfig),
        [max]: date[1].format(formatConfig),
      };
    }
  } else {
    return {
      [min]: null,
      [max]: null,
    };
  }
};

/**
  * 获取时间转换成距离当前时间的格式

  @param {any} date 时间
  @param {boolean} needMinAndSec 是否显示时分
  @returns {string} 返回距离当前的时间
*/
const getSubjectTime = (date: any, needMinAndSec: boolean): string => {
  // date = '2016-05-15 09:10:04'; // 测试时间用

  if (typeof date !== 'string') {
    date = date.toString();
  }

  // 如果不是日期类型
  if (!date.getDate) {
    date = this.toDate(date);
  }
  var _now = this.getNow(),
    _isThisYear = _now.getFullYear() === date.getFullYear(),
    _isToday = _now.getDate() === date.getDate(),
    _bt = _now.getTime() / 1e3 - date.getTime() / 1e3, // 差值
    _hour = date.getHours(),
    _min = date.getMinutes(),
    _day = date.getDay(),
    _yesterdayBt = 86400 + _now.getHours() * 3600 + _now.getMinutes() * 60 + _now.getSeconds(),
    _rt = '';
  _hour = zeropad(_hour, 2);
  _min = zeropad(_min, 2);
  //是否显示 时分 后缀
  let hourMinSuffix = needMinAndSec ? _hour + ':' + _min : '';

  switch (!0) {
    case _bt < 60:
      _rt = (Math.ceil(_bt) < 0 ? '0' : Math.ceil(_bt)) + '秒前';
      _rt = hourMinSuffix ? hourMinSuffix : _rt;
      break;

    case _bt >= 60 && _bt < 3600:
      _rt = Math.ceil(_bt / 60) + '分钟前';
      _rt = hourMinSuffix ? hourMinSuffix : _rt;
      break;

    case _bt >= 3600 && _bt < 86400:
      _rt = _isToday ? _hour + ':' + _min : '昨天' + hourMinSuffix;
      break;

    case _bt >= 86400 && _bt <= _yesterdayBt:
      _rt = '昨天' + hourMinSuffix;
      break;

    case _bt >= _yesterdayBt && _isThisYear:
      _rt = zeropad(date.getMonth() + 1) + '月' + zeropad(date.getDate()) + '日' + ' ' + hourMinSuffix;
      break;

    default:
      _rt = date.getFullYear() + '年' + zeropad(date.getMonth() + 1) + '月' + zeropad(date.getDate()) + '日' + '' + hourMinSuffix;
      break;
  }
  return _rt;
};

const zeropad = (val: number, len?: number): string => {
  let value = '' + val;
  let zeropadLen = len || 2;
  while (value.length < zeropadLen) {
    value = '0' + val;
  }
  return value;
};

export default {
  getNow,
  toDate,
  format,
  getSubjectTime,
  checkRangePickerDate,
  formatRangePickerDate,
};
