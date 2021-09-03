# mst

集成 [mobx-state-tree] 数据管理，参考 [React and MST]


## 安装依赖

```bash
yarn add mobx mobx-react-lite mobx-state-tree
```

## 数据管理

将 [https://github.com/ecklf/react-hooks-mobx-state-tree/tree/main/src/models](https://github.com/ecklf/react-hooks-mobx-state-tree/tree/main/src/models) 复制到 `src/models`下，部分类型错误需要调整，使用快速修复即可。

然后，修改 `src/App.tsx`

```typescript
import { Provider, rootStore } from "@/models/Root";
// ...

function App() {
  return (
    <Provider value={rootStore}>
      <HashRouter>
        <div className='App'>
          <Routes routes={routes} noMatch={asyncComponent(() => import('./pages/404'))} />
        </div>
      </HashRouter >
    </Provider>
  )
}
```







[mobx-state-tree]: https://mobx-state-tree.js.org/
[react and mst]: https://mobx-state-tree.js.org/concepts/using-react