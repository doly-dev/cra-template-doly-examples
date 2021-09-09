# keep-alive

> 参考 [react-activation]

## 安装依赖

```bash
yarn add react-activation
```

## 使用步骤

1. config/config.js 配置 babel

```javascript
babel: {
  plugins: [
    // ...
    'react-activation/babel',
  ];
}
```

2. 修改 App.tsx

```typescript
import { AliveScope } from 'react-activation';

// ...
// Router 下包裹 AliveScope 组件
<Router>
  <AliveScope>
    <div className='App'>
      <Routes routes={routes} ... />
    </div>
  </AliveScope>
</Router>
```

3. 修改路由文件 components/Routes

```typescript
// ...
// 引入模块
import KeepAlive from 'react-activation';

// 扩展routes配置项
export type RouteItem = {
  // ...

  keepAlive?: boolean;
  keepAliveParamsKey?: string;
  keepAliveName?: string;
}

// ...

// 页面包裹 KeepAlive 组件
const routeView = (
  <div className="router">
    <Helmet>
      <title>{name || ''}</title>
    </Helmet>
    {
      keepAlive ? (
        <KeepAlive
          name={keepAliveName || path}
          id={keepAliveParamsKey && match?.params[keepAliveParamsKey] ? match.params[keepAliveParamsKey] : (void 0)}
        >
          <C {...routeProps} />
        </KeepAlive>
      ) : (
        <C {...routeProps} />
      )
    }
  </div>
)
```

## 常见问题

- [当前缓存页面 useActivate 会执行多次](https://github.com/CJY0208/react-activation/issues/111) - 由 React.StrictMode 影响。查阅 严格模式
- [用 KeepAlive 包裹的组件中，react-router-dom 无法获取 params](https://github.com/CJY0208/react-activation/issues/43)

[react-activation]: https://www.npmjs.com/package/react-activation

## 注意事项

- 如果区分 `登录`/`未登录` 场景，需要在`退出登录`或`登录时`，清除缓存页面。
- 如非必要，尽量不用。
