# basic

介绍不同应用场景的构建配置

## 应用发布

通过工程化平台发布，部署路径在申请应用时已确认好了，只需配置 `PUBLIC_URL` 即可。

示例：应用申请的部署路径为 `webapp/business-product`

- **config/env.js**

```javascript
prod: {
  PUBLIC_URL: "/webapp/business-product/",
  // ...
}
```

另外，通过工程化平台发布还需要添加 `build.sh` 文件，这个和其他项目一样即可。

## 静态资源

自定义项目路径，没有强规范约束。开发完成后，资源打包 zip 文件，直接发布。

> 约定项目路径规则：/seashell/{电脑端=website | 移动端=webapp}/{业务名称}/{产品名称}/index.html

示例：发布一个静态资源应用，部署在 `/seashell/webapp/business/product/` 路径下

- **config/env.js**

```javascript
prod: {
  PUBLIC_URL: "https://img.example.com/seashell/webapp/business/product/",
  // ...
}
```

- **config/zip.js**

```javascript
pathPrefix = 'seashell/webapp/business/product/'
```

- 构建

```bash
yarn build
```

- zip

```bash
yarn zip
```

## sandbox 环境 或 部署第三方服务器

部署在特殊环境 或 第三方服务器，一般只是静态资源路径和接口地址不同，其它都和静态资源一样。

所以只需要新增一个构建环境配置即可。


示例：将上面静态资源，部署到 `sandbox.example.com` 域名，接口地址为 `http://sandbox.api.example.com/v1`

- **package.json**

```json
"scripts": {
  "build:sandbox": "env-cmd -r ./config/env.js -e default,sandbox craco build",
}
```

- **config/env.js**

```javascript
sandbox: {
  PUBLIC_URL: "/seashell/webapp/business/product/",
  REACT_APP_API: "http://sandbox.api.example.com/v1",
  REACT_APP_ENV: "sandbox",
  BUILD_PATH: "dist"
},
```

- **config/zip.js**

```javascript
pathPrefix = 'seashell/webapp/business/product/'
```

- 构建

```bash
yarn build:sandbox
```

- zip

```bash
yarn zip
```

## 如何在工具模块中使用history

> 参考：[react-router Router](https://reactrouter.com/web/api/Router)

原理就是传入 Router 的 history 是一个引用类型，新增一个变量指向它即可。

**注意，react-router@5 对应 history@4。如果使用 react-router@6 对应 history@5，不需要另外安装类型。**

- 安装依赖

```bash
yarn add history@4
```

```bash
yarn add @types/history --dev
```

- 新增文件 `utils/routerHistory.ts`

```typescript
import type { History } from 'history';

export let routerHistory: History;

export function syncHistory(his: History) {
  routerHistory = his;
}
```

- 改写 `src/App.tsx`

原本使用 HashRouter 改为 Router，然后将 history 同步到 routerHistory 模块，并传到 Router 组件。

```typescript
// ...
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { syncHistory } from '@/utils/routerHistory';

const hashHistory = createHashHistory();
syncHistory(hashHistory);

//...

function App() {
  return (
    <HelmetProvider>
      <Router history={hashHistory}>
        {/* ... */}
      </Router >
    </HelmetProvider>
  )
}
```
