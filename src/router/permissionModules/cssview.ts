/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-08 19:21:46
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 21:26:26
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const cssRouter: Array<RouteRecordRaw> = [
  {
    path: '/cssview',
    component: Layout,
    redirect: 'noredirect',
    name: 'css',
    meta: {
      title: 'css',
      icon: '#iconchart1'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/cssview/Index.vue'
          ),
        name: 'Index',
        meta: {
          title: 'css',
          icon: '#iconcopy'
        }
      }
    ]
  }
]

export default cssRouter
