# webpack-prerender-react
> react预渲染webpack脚手架

## 主要依赖
* react 16.6
* webpack  4.1
* bable/* 7.2
* postcss 3.0

---
## CLI
### 编译dll
> dll包是优化webpack打包时间的一种常见手段，可以将一些变化不频繁的第三方包提前打包为dll包，在webpack开发编译或者正式打包编译过程中，可以忽略这些第三方包的编译，从而提高编译速度。
```shell
npm run dll
```
dll配置文件路径为:`/configs/webpack.dll.js`；

### 开发 
```shell
npm run dev
```

### 编译
```shell
npm run build
```

### 创建多页面
```shell
npm run page:create <page_route>
```
`<page_name>`是页面的名称，比如你期望打包出一个`index.html`，那么你应该输入`npm run page:create index`的命令。  

再比如，你期望开启服务器后，通过路由`/family/mother.html`访问到这个html文件，那么你应该输入`npm run page:create /family/mother`

### 查看已有的页面
```shell
npm run page:list
```

### 删除一个或多个页面
```shell
npm run page:remove
```
无需多余参数，遵循cli提示即可删除页面。

---