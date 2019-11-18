# mainichi
小程序UI组件库, 采用小程序原生写法，支持less

参考自有赞[Vant Weapp](https://github.com/youzan/vant-weapp)，若对其感兴趣，欢迎点击

## 使用

### 方式一：通过npm安装

```bash
npm install mainichi --save
```

在微信开发者工具里选择构建npm

### 方式二：下载代码

拷贝dist目录下的代码到项目中

## 在开发者工具中预览

```bash
npm run dev
```
在微信开发者工具中打开test目录

## 使用组件

以按钮组件为例，只需在json文件中引入按钮对应的自定义组件即可
```json
{
    "usingComponents": {
        "mainichi-button": "mainichi/button/index"
    }
}
```

接着就可以在wxml中直接使用组件
```html
<mainichi-button className="tutu">
    <text>haha</text>
</mainichi-button>
```

## 发布

```bash
npm run release
```

## 持续开发

后续开发请在`src/components`目录下添加组件，并添加日志

组件公用样式请在`src/components/common`下添加

## 版本日志
### v1.0.0
