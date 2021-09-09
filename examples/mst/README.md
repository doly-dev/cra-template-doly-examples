# MST

集成 [mobx-state-tree] 数据管理，参考 [React and MST]


## 安装依赖

```bash
yarn add mobx mobx-react-lite mobx-state-tree
```

## 使用步骤

1. 将 [https://github.com/ecklf/react-hooks-mobx-state-tree/tree/main/src/models](https://github.com/ecklf/react-hooks-mobx-state-tree/tree/main/src/models) 复制到 `src/models`下，部分类型错误需要调整，使用快速修复即可。

2. 修改 `src/App.tsx`

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

## 枚举类型管理

> - [Support Enums and union type for enumeration](https://github.com/mobxjs/mobx-state-tree/issues/605)

注意区分数字枚举和字符串枚举。


- 服务接口定义的枚举数据

**services/types/enum.ts**

```typescript
// 是否添加水印标记
// 0-不添加 1-添加
export enum WaterFlag {
  No,
  Yes,
}

// 颜色
// red-红 green-绿 blue-蓝
export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}
```

- MST 中的枚举

**models/enum.ts**

```typescript
import { types } from 'mobx-state-box';
import { WaterFlag, Color } from '@/services/types/enum';

// 是否添加水印标记（数字枚举）
// 0-不添加 1-添加
export const EnumWaterFlag = types.union(
  types.literal(WaterFlag.No),
  types.literal(WaterFlag.Yes)
);

// 颜色（字符串枚举）
// red-红 green-绿 blue-蓝
export const EnumColor = types.enumeration<Color>(Object.values(Color));
```


[mobx-state-tree]: https://mobx-state-tree.js.org/
[react and mst]: https://mobx-state-tree.js.org/concepts/using-react