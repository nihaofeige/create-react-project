/* eslint-disable import/extensions */
import { lazy } from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/login', // 路由路径
        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
        icon: 'setting', // 菜单图标
        component: lazy(() => import('@/pages/Login')), // 懒加载 路由组件
      },
      {
        path: '/',
        // exact: true,
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: 'smile',
            component: lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/unordered-list',
            name: '列表页',
            icon: 'unordered-list',
            component: lazy(() => import('@/pages/Table')),
          },
          { path: '/', exact: true, redirect: '/welcome' },
          { path: '*', exact: true, redirect: '/exception/404' },
        ]
      }
    ],
  },
];

export default config;