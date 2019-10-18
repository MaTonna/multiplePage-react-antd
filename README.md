## 命令汇总

```sh
开发阶段：
npm run dll-dev (打包vendor)
npm run dev (实时打包)
npm run start (运行本地http服务，如果报错可以考虑webpack-dev-server和webpack-cli的版本兼容性问题)

发布阶段：
npm run dll
npm run build
```

### API 调用

在 api 文件中有分别对应四个模块的 api 接口的 map，使用前在对应的 map 中增加接口名

- customer：客户管理接口类

```js
import api from '@api/index';
api.get('接口名', {});
api.post('接口名', {});
api.upload('接口名', new FormDate());
```

## 路由的使用

在 menuConfig.tsx 中配置了菜单，在 index.tsx 中会循环遍历出应该增加的 Router

- 添加路由：

1. 调用方：window.gotoPage({ pathname: '/nav1-3-1', search: '?the=query', state: { some: 'state' } })
2. 组件方：this.props.location 获取 search、state

## 交互、书写约定

1. 查询类页面样式

```html
<div className="content-wrap">
  <div className="content-header"></div>
  <div className="content-main"></div>
</div>
```

2. 表格中多个操作用分隔符隔开

```html
<Divider type="vertical" />
```

3. 针对表格选项的操作（比如批量审核）写在 Table 组件的 footer 属性中

```html
<Table footer={() => <button>批量审核</button> }/>
```

4. Table 的 columns 属性的变量设置在 this 中，不放在 state 或者 render 中，避免重复渲染

5. 在组件中加入注释，如果没有使用 Form 组件，则在 class 前加入注释，使用了 Form 组件，在 Form.create() 前加入注释，例如：

```
/**
 * 客户关联申请-详情弹窗
 */
```

## 常用工具函数

1. 查询条件对时间的处理
   T.date.formatRangePickerDate 方法参数为，在 form 中命名的字段，接口参数的范围命名（分两个字段），是否需要时分秒

```javascript
if (T.date.checkRangePickerDate(params.createGmt)) {
  params = Object.assign(
    params,
    T.date.formatRangePickerDate(params.createGmt, 'minGmtCreate', 'maxGmtCreate', true)
  );
  delete params.createGmt;
}
```

## 常用样式

1. info-block，适用于弹窗内静态信息的展示

```css
<div className="info-block">
  <h3>客户信息</h3>
  <p>
    <label>用户名：</label>
    <span>吉米</span>
  </p>
  <p>
    <label>归属销售：</label>
    <span>admin</span>
  </p>
</div>
```

2. 时间控件的样式，用于查询条件的对齐，.calendar-picker，设置了宽度

## code review 注意点

1. 类型写全，eslint 没有报错
2. 是否有多余的函数或变量或引入的组件，还有测试代码，不需要的删掉，函数的第一个无用的变量使用下划线（\_）代替
3. 弹窗里如果有输入框，第一个输入框 autofocus，弹窗确定按钮确定最好是 submit 的，除非有换行
4. 写法上是否有可以优化的地方，避免代码冗余
5. 检查自己的变量命名，尽量语义化，最好是两个词组成的，形容词+名词说明这个变量的意义
6. 检查每个文件是否加入了 fileheader，格式为【页面名】-【组件名】

## 用户代码片段模板

```json
"Print ts class": {
    "prefix": "tsClass",
    "body": [
      "import React, { Component,ReactNode } from 'react';",
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
      "<div className='content-wrap'>",
      "<div className='content-header'>",
      "$2",
      "</div>",
      "<div className='content-main'>",
      "$2",
      "</div>",
      "</div>",
      ")",
      "}",
      "}",
      "export default Demo"
    ],
    "description": "new a page class"
  },
```
