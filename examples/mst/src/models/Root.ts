import type { Instance } from 'mobx-state-tree';
import { onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Cart } from './Cart';
import { Counter } from './Counter';

const RootModel = types.model({
  counter: Counter,
  cart: Cart
});

let initialState = RootModel.create({
  counter: {
    count: 0
  },
  cart: { items: [] }
});

// 实例 model 时，如果有缓存数据就使用
// 需要注意退出登录清除、进入页面更新数据
const data = localStorage.getItem('rootState');
if (data) {
  const json = JSON.parse(data);
  if (RootModel.is(json)) {
    initialState = RootModel.create(json);
  }
}

export const rootStore = initialState;

// 监听数据变动缓存数据
onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
  localStorage.setItem('rootState', JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
