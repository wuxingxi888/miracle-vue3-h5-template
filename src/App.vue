<template>
	<mi-config-provider
		:theme="getThemeMode"
		:theme-vars="getThemeVars()"
	>
		<routerView
			v-slot="{ Component, route }"
			class="absolute bottom-0 top-0 w-full overflow-hidden"
		>
			<transition
				:name="getTransitionName"
				mode="out-in"
				appear
			>
				<keep-alive :include="keepAliveComponents">
					<component
						:is="Component"
						:key="getFirstLevelRoute(route).name"
						v-if="getFirstLevelRoute(route).meta.keepAlive"
					/>
				</keep-alive>
			</transition>

			<component
				:is="Component"
				:key="getFirstLevelRoute(route).name"
				v-if="!getFirstLevelRoute(route).meta.keepAlive"
			/>
		</routerView>
	</mi-config-provider>
</template>

<script setup lang="ts">
	import { useRouteStore } from '@/store/modules/route'
	import { useTheme } from '@/hooks/useTheme'

	const routeStore = useRouteStore()

	const { getThemeMode, getIsPageAnimate, getPageAnimateType, getThemeVars } = useTheme()

	// 需要缓存的路由组件
	const keepAliveComponents = computed(() => routeStore.keepAliveComponents)

	const getTransitionName = computed(() => {
		return getIsPageAnimate.value ? getPageAnimateType.value : undefined
	})

	const getFirstLevelRoute = (route) => {
		if (!Array.isArray(route.matched) || route.matched.length === 0) {
			return route
		}
		return route.matched[0]
	}
</script>
