# webpack-prerender-react
> react预渲染webpack脚手架

### 主要依赖
* react 16.6
* webpack  4.1
* bable/* 7.2
* postcss 3.0

### CLI
#### 编译dll
> dll包是优化webpack打包时间的一种常见手段，可以将一些变化不频繁的第三方包提前打包为dll包，在webpack开发编译或者正式打包编译过程中，可以忽略这些第三方包的编译，从而提高编译速度。
```shell
npm run dll
```
dll配置文件路径为:`/configs/webpack.dll.js`；

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

再比如，你期望开启服务器后，通过路由`/family/mother.html`访问到这个html文件，那么你应该输入`npm run page:create /family/mother`

#### 查看已有的页面
```shell
npm run page:list
```

#### 删除一个或多个页面
```shell
npm run page:remove
```
无需多余参数，遵循cli提示即可删除页面及其资源。

### 限制
#### 关于web api的使用
因为使用nodejs去将组件代码渲染成html字符串，web api的调用会导致渲染失败，因此web api的调用需要注意：
1. 只有`src/routes/*/client.js`的全局作用域才可以直接调用web api，因为这个文件不参与生成html字符串的打包工作。
1. 除了`constructor`和`render`这两个react生命周期，其他生命周期回调函数里面都可以直接调用web api。
1. 如果必须在全局作用域或者在`constructor`和`render`两个生命周期里面执行某些web api，那只能加个`if`判断，如:
   ```javascript
   if(typeof document === "undefined"){
	   let ele = document.getElementById("id");
	   
	   /**....do something*/
   }
   ```