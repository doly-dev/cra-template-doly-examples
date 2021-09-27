# freemode

> 假定一些公共配置在 PageContainer 中，例如 NavBar 

在 APP 中，如果某些页面需要 native 提供下拉重新加载当前 webview。就只能用 body 的滚动条，以防止和 Android 的下拉操作冲突。

路由增加 freemode 配置项，开启后关闭对应页面切换动画，并重置 .router 和 .page 节点样式 (position、overflow)，使得对应页面启用 body 的滚动条。

## 使用步骤

1. `src/components/Router`

新增 `RouterContext.ts`

```typescript
import { createContext } from 'react';

export default createContext<{
  freemode?: boolean;
}>({});
```

修改 `index.tsx`

```typescript
// ...
import classnames from 'classnames';
import RouterContext from './RouterContext';

export {
  RouterContext
}

// ...


export type RouteItem = {
  //...
  freemode?: boolean;
}

// ...

const WrapperRouter: React.FC<RoutesProps> = ({
  routes,
  animated = true,
  noMatchPath,
  onRouteChange
}) => {
  const formattedRoutes = React.useMemo(() => formatRoutes(routes), [routes]);
  const onRouteChangeRef = React.useRef(onRouteChange);
  onRouteChangeRef.current = onRouteChange;
  const [freemode, setFreemode] = React.useState(false);

  React.useEffect(() => {
    // 初次加载执行onRouteChange
    const match = matchPathInRoutes(formattedRoutes, routerHistory.location.pathname);
    setFreemode(!!match?.freemode);
    onRouteChangeRef.current?.(match);
  }, [formattedRoutes]);

  React.useEffect(() => {
    const unlisten = routerHistory.listen((location) => {
      if (!onRouteChangeRef.current) {
        return;
      }

      const match = matchPathInRoutes(formattedRoutes, location.pathname);
      setFreemode(!!match?.freemode);
      onRouteChangeRef.current?.(match);
    });
    return () => {
      unlisten();
    }
  }, [formattedRoutes]);

  return (
    <RouterContext.Provider value={{ freemode }}>
      <Router history={routerHistory}>
        <div className={classnames('router-wrapper', { freemode })}>
          {formattedRoutes.map(route => (
            <AnimatedRoute {...route} animated={(animated || route.animated) && !freemode && !route.freemode} key={route.path} />
          ))}
          <WrapperNoMatch routes={formattedRoutes} noMatchPath={noMatchPath} />
        </div>
      </Router >
    </RouterContext.Provider>
  );
}
```

修改 `index.less`

```less
// ...

.router-wrapper.freemode{
  position: static;
  overflow: visible;

  .router{
    position: static;
    overflow: visible;
  }
}
```

2. `src/components/PageContainer`

修改 `index.tsx`

```typescript
// ...
import { RouterContext } from '../Router';
import { getScrollTop, getScrollHeight, getClientHeight } from '@/utils/dom'; // 新增文件

// ...

  const { freemode } = React.useContext(RouterContext);

  React.useEffect(() => {
    const scrollContainer = freemode ? window : innerRef.current;

    if (scrollContainer && typeof scrollTopLowerRef.current === 'function') {
      const handleScroll = () => {
        const sTop = getScrollTop(scrollContainer);
        const sHeight = getScrollHeight(scrollContainer);
        const cHeight = getClientHeight(scrollContainer);
        const realLowerThreshold = lowerThreshold < 0 ? 0 : lowerThreshold;

        if (sHeight - cHeight - sTop <= realLowerThreshold) {
          scrollTopLowerRef.current?.();
        }
      }
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }
  }, [freemode, lowerThreshold]);

// ...

  <div
    {...restProps}
    className={classnames(styles.page, { freemode }, className)}
    ref={innerRef}
    onScroll={handleScroll}
  >
```

修改 `index.module.less`

```less
.page {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background-color: #f5f5f5;

  &:global {
    &.freemode{
      position: static;
      overflow: visible;
    }
  }
}
```

3. `src/App.tsx`

比如首页启用 `freemode`

```typescript
const routes = [
  {
    path: '/',
    name: '首页',
    component: asyncComponent(() => import('./pages/home')),
    freemode: true
  },
  // ...
];
```
