<template>
	<div class="h-screen flex flex-col">
		<routerView class="flex-1 overflow-x-hidden">
			<template #default="{ Component, route }">
				<keep-alive
					v-if="keepAliveComponents"
					:include="keepAliveComponents"
				>
					<component
						:is="Component"
						:key="route.fullPath"
					/>
				</keep-alive>
				<component
					:is="Component"
					v-else
					:key="route.fullPath"
				/>
			</template>
		</routerView>

		<mi-tabbar
			route
			fixed
			placeholder
		>
			<mi-tabbar-item
				v-for="menu in getMenus"
				:key="menu.name"
				replace
				:to="menu.path"
			>
				<template #icon>
					<i :class="menu.meta?.icon" />
				</template>
				{{ menu.meta?.title }}
			</mi-tabbar-item>
		</mi-tabbar>
	</div>
</template>

<script setup lang="ts">
	import type { ComputedRef } from 'vue'
	import { computed } from 'vue'
	import type { RouteRecordRaw } from 'vue-router'
	import { useRouteStore } from '@/store/modules/route'

	const routeStore = useRouteStore()

	const keepAliveComponents = computed(() => routeStore.keepAliveComponents)

	const getMenus: ComputedRef<RouteRecordRaw[]> = computed(() => routeStore.menus)
</script>
