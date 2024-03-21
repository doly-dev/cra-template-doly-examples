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

2. `src/index.tsx` 改用 `render` 方法

> [react-activation](https://www.npmjs.com/package/react-activation) NOTICE:
> (React v18+) DO NOT use ReactDOMClient.createRoot, use ReactDOM.render instead,

```diff
- import ReactDOM from 'react-dom/client';
+ import ReactDOM from 'react-dom';

// ...

-const root = ReactDOM.createRoot(document.getElementById('root')!);
-root.render(<App />);
+ReactDOM.render(<App />, document.getElementById('root')!);
```

3. `src/router.tsx` 包裹 `AliveScope` 组件

```typescript
import { AliveScope } from 'react-activation';
// ...

const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="*"
      element={
        <AliveScope>
          <AnimatedRoutes routes={transformCustomRoutes(routes)} />
        </AliveScope>
      }
    />
  )
);
// ...
```

4. 在需要保持状态的组件中使用 `KeepAlive`

如 `src/pages/repos/Detail.tsx`

```typescript
import KeepAlive from 'react-activation';

// ...

const WrapperDetailPage = (props: any) => {
  const { name } = useParams();

  return (
    <KeepAlive name="detail" id={name}>
      <DetailPage {...props} />
    </KeepAlive>
  );
};

export default WrapperDetailPage;
```

**同时也要在 `src/components/AsyncComponent` 增加页面激活时设置标题**

```typescript
import { useActivate } from 'react-activation';

// ...

useActivate(() => {
  if (title) {
    document.title = title;
  }
});
```

## 常见问题

- [当前缓存页面 useActivate 会执行多次](https://github.com/CJY0208/react-activation/issues/111) - 由 React.StrictMode 影响。查阅 [严格模式](https://zh-hans.reactjs.org/docs/strict-mode.html)
- [用 KeepAlive 包裹的组件中，react-router-dom 无法获取 params](https://github.com/CJY0208/react-activation/issues/43)

## 注意事项

- 如果区分 `登录`/`未登录` 场景，需要在`退出登录`或`登录时`，清除缓存页面。
- 如非必要，尽量不用。

[react-activation]: https://www.npmjs.com/package/react-activation
