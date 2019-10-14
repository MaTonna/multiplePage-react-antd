## 命令汇总

```cmd
开发阶段：
npm run dll-dev (打包antd和vendor)
npm run dev (实时打包)
npm run start (运行本地http服务，如果报错可以考虑webpack-dev-server和webpack-cli的版本兼容性问题)

发布阶段：
npm run dll
npm run build
```

## 用户代码片段模板

```json
"Print ts class": {
    "prefix": "tsClass",
    "body": [
      "import React, { Component,ReactNode } from 'react';",
      "import BasicLayout from '@layouts/BasicLayout';",
      "$2",
      "interface Prop {",
      "$2",
      "}",
      "const initialState = {",
      "$2",
      "};",
      "type State = Readonly<typeof initialState>;",
      "$2",
      "class Demo extends Component<Prop,State> {",
      "readonly state: State = initialState;",
      "render():ReactNode{",
      "return (",
      "<BasicLayout></BasicLayout>",
      ")",
      "}",
      "}",
      "ReactDOM.render(<Demo />, document.getElementById('root'));"
    ],
    "description": "new a page class"
  }
```

## 常用工具函数

1. 查询条件对时间的处理
   T.date.formatRangePickerDate 方法参数为，在 form 中命名的字段，接口参数的范围命名（分两个字段），是否需要时分秒

```javascript
if (T.date.checkRangePickerDate(params.createGmt)) {
  params = Object.assign(params, T.date.formatRangePickerDate(params.createGmt, 'minGmtCreate', 'maxGmtCreate', true));
  delete params.createGmt;
}
```
