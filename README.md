# cra-template-doly-examples

[cra-template-doly] 脚手架使用示例

## [basic]

介绍几种应用场景的构建配置

- 应用发布
- 静态资源
- sandbox 环境 或 部署第三方服务器

## [MST]

集成 [mobx-state-tree] 数据管理，参考 [React and MST]。

> 学习文档：[MobX State Tree 数据组件化开发](https://juejin.cn/post/6844903772972384263)

## [keep-alive]

集成 [react-activation]

## [freemode]

在 APP 中，如果某些页面需要 native 提供下拉重新加载当前 webview。就要用 body 的滚动条，以防止和 Android 的下拉操作冲突。

[cra-template-doly]: https://www.npmjs.com/package/cra-template-doly
[basic]: ./examples/basic
[mst]: ./examples/mst
[keep-alive]: ./examples/keep-alive
[freemode]: ./examples/freemode
[mobx-state-tree]: https://mobx-state-tree.js.org/
[react and mst]: https://mobx-state-tree.js.org/concepts/using-react
[react-activation]: https://www.npmjs.com/package/react-activation
