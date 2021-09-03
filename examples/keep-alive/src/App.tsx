import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import Routes from '@/components/Routes';
import asyncComponent from '@/components/AsyncComponent';
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
        component: asyncComponent(() => import('./pages/repos/Detail')),
        keepAliveParamsKey: 'name'
      },
    ]
  }
];

function App() {
  return (
    <HashRouter>
      <AliveScope>
        <div className='App'>
          <Routes routes={routes} noMatch={asyncComponent(() => import('./pages/404'))} />
        </div>
      </AliveScope>
    </HashRouter >
  )
}

export default App;
