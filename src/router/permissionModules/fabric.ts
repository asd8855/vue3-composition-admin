/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-08 19:21:46
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 21:26:26
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const fabricRouter: Array<RouteRecordRaw> = [
  {
    path: '/fabric',
    component: Layout,
    redirect: 'noredirect',
    name: 'Fabric',
    meta: {
      title: 'fabric',
      icon: '#iconchart1'
    },
    children: [
      {
        path: 'start',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/fabricJS/base/Start.vue'
          ),
        name: 'Start',
        meta: {
          title: 'start',
          noCache: true
        }
      },
      {
        path: 'basic-graph',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/fabricJS/base/BasicGraph.vue'
          ),
        name: 'BasicGraph',
        meta: {
          title: 'basicGraph',
          noCache: true
        }
      },
      {
        path: 'filter',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/fabricJS/base/Filter.vue'
          ),
        name: 'Filter',
        meta: {
          title: 'filter',
          noCache: true
        }
      },
      {
        path: 'filter2',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/fabricJS/base/Filter2.vue'
          ),
        name: 'Filter2',
        meta: {
          title: 'filter2',
          noCache: true
        }
      }
    ]

  }
]

export default fabricRouter
