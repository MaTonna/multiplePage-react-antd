// import tool from './tool';

// const TIME_DAY = 24 * 60 * 60 * 1000;

/**
 * @description 返回服务器现在的时候
 * @returns
 */
const getNow = () => {
  let date = new Date();
  if (CONFIG['timeDiff']) {
    date.setTime(date.valueOf() - CONFIG['timeDiff']);
  }
  return date;
};

/**
 * 把 yyyy-mm-dd hh:mm:ss
 * yyyy-mm-dd
 * yyyy/mm/dd
 * 转成 Date 格式
 * @param {String} v 日期字符
 * @returns {Date} 时间
 */
const toDate = (v) => {
  return v ? new Date(Date.parse(v.replace(/-/g, '/'))) : null;
};

/**
 * 格式化时间
 *
 * @param {Date} date 时间
 * @param {String} _format 格式 默认为 "yyyy-MM-dd hh:mm:ss";
 * @returns {String} 返回字符
 */
const format = (date, _format) => {
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

// 检测RangePicker组件时间值是否存在
const checkRangePickerDate = (date) => {
  if (Array.isArray(date) && date.length) {
    return true;
  }
  return false;
};

// RangePickerDate组件时间格式化
const formatRangePickerDate = (date, min, max, showTime = false) => {
  const formatConfig = 'YYYY-MM-DD';
  if (checkRangePickerDate(date)) {
    if (showTime) {
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

const getSubjectTime = function(_dt, needMinAndSec) {
  // _dt = '2016-05-15 09:10:04'; // 测试时间用

  if (typeof _dt !== 'string') {
    _dt = _dt.toString();
  }
  // let dayTime = _dt.split(' ')[0] + ' 00:00:00';

  // 如果不是日期类型
  if (!_dt.getDate) {
    _dt = this.toDate(_dt);
  }
  var _now = this.getNow(),
    _isThisYear = _now.getFullYear() === _dt.getFullYear(),
    _isToday = _now.getDate() === _dt.getDate(),
    _bt = _now.getTime() / 1e3 - _dt.getTime() / 1e3, // 差值
    _hour = _dt.getHours(),
    _min = _dt.getMinutes(),
    _day = _dt.getDay(),
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
      _rt = zeropad(_dt.getMonth() + 1) + '月' + zeropad(_dt.getDate()) + '日' +' ' + hourMinSuffix;
      break;

    default:
      _rt = _dt.getFullYear() + '年' + zeropad(_dt.getMonth() + 1) + '月' + zeropad(_dt.getDate()) + '日' + '' + hourMinSuffix;
      break;
  }
  return _rt;
};

const zeropad = function(val, len) {
  val = '' + val;
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
};

export default {
  getNow,
  toDate,
  format,
  getSubjectTime,
  checkRangePickerDate,
  formatRangePickerDate,
};
