<template>
	<mi-config-provider
		:theme="getThemeMode"
		:theme-vars="getThemeVars()"
	>
		<routerView v-slot="{ Component, route }">
			<div class="absolute bottom-0 top-0 w-full overflow-hidden">
				<transition
					:name="getTransitionName"
					mode="out-in"
					appear
				>
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
				</transition>
			</div>
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
</script>
