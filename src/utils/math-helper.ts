export const math = {
  /** 浮点数加法运算 */
  floatAdd: (arg1: number, arg2: number): number => {
    let r1, r2, m, n;
    try {
      r1 = ('' + arg1).split('.')[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = ('' + arg2).split('.')[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
  },

  /** 浮点数减法运算 */
  floatSub: (arg1: number, arg2: number): number => {
    let r1, r2, m, n;
    try {
      r1 = ('' + arg1).split('.')[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = ('' + arg2).split('.')[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },

  /** 浮点数乘法运算 */
  floatMul: (arg1: number, arg2: number): number => {
    let m = 0, s1 = '' + arg1, s2 = '' + arg2;
    try {
      m += s1.split('.')[1].length;
    }
    catch (e) {
      // T.log(e);
    }
    try {
      m += s2.split('.')[1].length;
    }
    catch (e) {
      // T.log(e);
    }
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
  },

  /** 浮点数除法运算 */
  floatDiv: (arg1: number, arg2: number): number => {
    let t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = ('' + arg1).split('.')[1].length;
    }
    catch (e) {
      // T.log(e);
    }
    try {
      t2 = ('' + arg2).split('.')[1].length;
    }
    catch (e) {
      // T.log(e);
    }
    r1 = Number(('' + arg1).replace('.', ''));
    r2 = Number(('' + arg2).replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }
};
export default math;
