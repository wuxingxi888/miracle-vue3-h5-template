import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const menuRouteList: Array<RouteRecordRaw> = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		redirect: '/dashboard/index',
		component: Layout,
		meta: {
			title: '主控台',
			icon: 'i-mage:dashboard-2-fill'
		},
		children: [
			{
				path: 'index',
				name: 'DashboardPage',
				meta: {
					keepAlive: false
				},
				component: () => import('@/views/dashboard/index.vue')
			}
		]
	},

	{
		path: '/example',
		name: 'Example',
		redirect: '/example/index',
		component: Layout,
		meta: {
			title: '示例',
			icon: 'i-mingcute:list-expansion-fill'
		},
		children: [
			{
				path: 'index',
				name: 'ExamplePage',
				meta: {
					keepAlive: false
				},
				component: () => import('@/views/example/index.vue')
			}
		]
	},

	{
		path: '/chart',
		name: 'Chart',
		redirect: '/chart/index',
		component: Layout,
		meta: {
			title: '图表',
			icon: 'i-bxs:chart'
		},
		children: [
			{
				path: 'index',
				name: 'ChartPage',
				meta: {
					keepAlive: false
				},
				component: () => import('@/views/chart/index.vue')
			}
		]
	},

	{
		path: '/mine',
		name: 'Mine',
		redirect: '/mine/index',
		component: Layout,
		meta: {
			title: '我的',
			icon: 'i-tabler:brand-minecraft'
		},
		children: [
			{
				path: 'index',
				name: 'MinePage',
				meta: {
					keepAlive: false,
					hiddenHeader: true
				},
				component: () => import('@/views/mine/index.vue')
			}
		]
	}
]

export default menuRouteList
