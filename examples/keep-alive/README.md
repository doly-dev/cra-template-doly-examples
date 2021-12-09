# keep-alive

> 参考 [react-activation]

## 安装依赖

```bash
yarn add react-activation
```

## 使用步骤

1. `config/config.js` 配置 babel

```javascript
babel: {
  plugins: [
    // ...
    'react-activation/babel'
  ];
}
```

2. 修改 `components/Router/index.tsx`

```typescript
import KeepAlive, { AliveScope } from 'react-activation';

// ...
export type RouteItem = {
  // ...
  keepAlive?: boolean;
  keepAliveParamsKey?: string;
  keepAliveName?: string;
}

// AnimatedRoute 组件
// props 增加 keepAlive = true, keepAliveName, keepAliveParamsKey
// ...
const routeView = (
  <div className="router">
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

// WrapperRouter
// Router 组件下添加 AliveScope
<Router history={routerHistory}>
  <AliveScope>
    // ...
  </AliveScope>
</Router>
```

## 常见问题

- [当前缓存页面 useActivate 会执行多次](https://github.com/CJY0208/react-activation/issues/111) - 由 React.StrictMode 影响。查阅 [严格模式](https://zh-hans.reactjs.org/docs/strict-mode.html)
- [用 KeepAlive 包裹的组件中，react-router-dom 无法获取 params](https://github.com/CJY0208/react-activation/issues/43)

## 注意事项

- 如果区分 `登录`/`未登录` 场景，需要在`退出登录`或`登录时`，清除缓存页面。
- 如非必要，尽量不用。

[react-activation]: https://www.npmjs.com/package/react-activation
