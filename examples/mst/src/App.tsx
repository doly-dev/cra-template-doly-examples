import React from 'react';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Routes from '@/components/Routes';
import asyncComponent from '@/components/AsyncComponent';
import { Provider, rootStore } from "@/models/Root";
import './App.less';

const routes = [
  {
    path: '/',
    name: '首页',
    component: asyncComponent(() => import('./pages/home'))
  },
  {
    path: 'repos',
    name: '仓库',
    routes: [
      {
        path: 'list',
        name: '仓库列表',
        component: asyncComponent(() => import('./pages/repos/List'))
      },
      {
        path: 'detail/:name',
        name: '仓库详情',
        component: asyncComponent(() => import('./pages/repos/Detail'))
      },
    ]
  }
];

function App() {
  return (
    <HelmetProvider>
      <Provider value={rootStore}>
        <HashRouter>
          <div className='App'>
            <Routes routes={routes} noMatch={asyncComponent(() => import('./pages/404'))} />
          </div>
        </HashRouter >
      </Provider>
    </HelmetProvider>
  )
}

export default App;
