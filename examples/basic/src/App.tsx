import React from 'react';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { syncHistory } from '@/utils/routerHistory';
import { HelmetProvider } from 'react-helmet-async';
import Routes from '@/components/Routes';
import asyncComponent from '@/components/AsyncComponent';
import './App.less';

const hashHistory = createHashHistory();
syncHistory(hashHistory);

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
      <Router history={hashHistory}>
        <div className='App'>
          <Routes routes={routes} noMatch={asyncComponent(() => import('./pages/404'))} />
        </div>
      </Router >
    </HelmetProvider>
  )
}

export default App;
