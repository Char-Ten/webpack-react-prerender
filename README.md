# webpack-prerender-react

> react 预渲染 webpack 脚手架

### 主要依赖

-   node 8.0 +
-   react 16.6
-   webpack 4.1
-   bable/\* 7.2
-   postcss 3.0

### CLI

#### 编译 dll

> dll 包是优化 webpack 打包时间的一种常见手段，可以将一些变化不频繁的第三方包提前打包为 dll 包，在 webpack 开发编译或者正式打包编译过程中，可以忽略这些第三方包的编译，从而提高编译速度。

```shell
npm run dll
```

dll 配置文件路径为:`/configs/webpack.dll.js`；

#### 开发

```shell
npm run dev
```

#### 编译

```shell
npm run build
```

#### 创建多页面

```shell
npm run page:create <page_route>
```

`<page_name>`是页面的名称，比如你期望打包出一个`index.html`，那么你应该输入`npm run page:create index`的命令。

再比如，你期望开启服务器后，通过路由`/family/mother.html`访问到这个 html 文件，那么你应该输入`npm run page:create /family/mother`

#### 查看已有的页面

```shell
npm run page:list
```

#### 删除一个或多个页面

```shell
npm run page:remove
```

无需多余参数，遵循 cli 提示即可删除页面及其资源。

### 限制

#### 关于 web api 的使用

因为使用 nodejs 去将组件代码渲染成 html 字符串，web api 的调用会导致渲染失败，因此 web api 的调用需要注意：

1. 只有`src/routes/*/client.js`的全局作用域才可以直接调用 web api，因为这个文件不参与生成 html 字符串的打包工作。
1. 除了`constructor`和`render`这两个 react 生命周期，其他生命周期回调函数里面都可以直接调用 web api。
1. 如果必须在全局作用域或者在`constructor`和`render`两个生命周期里面执行某些 web api，那只能加个`if`判断，如:
    ```javascript
    if (module.IS_DEV) {
        let ele = document.getElementById('id');
        /**....do something*/
    }
    ```
