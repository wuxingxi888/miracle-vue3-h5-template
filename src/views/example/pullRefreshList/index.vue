<script setup lang="ts">
	import PullRefreshList from '@/components/PullRefreshList/index.vue'

	defineOptions({ name: 'PullRefreshList' })

	const loading = ref(false)
	const refreshing = ref(false)
	const finished = ref(false)
	const loadError = ref(false)

	const list = ref<number[]>([])

	const disabledRefresh = ref(false)

	// 切换是否刷新
	const toggleRefresh = () => {
		disabledRefresh.value = !disabledRefresh.value
	}

	// 模拟加载失败
	const simulateLoadError = () => {
		loadError.value = true
	}

	const onLoad = () => {
		setTimeout(() => {
			if (refreshing.value) {
				list.value = []
				refreshing.value = false
			}

			for (let i = 0; i < 10; i++) {
				list.value.push(list.value.length + 1)
			}

			loading.value = false
			loadError.value = false

			if (list.value.length >= 50) {
				finished.value = true
			}
		}, 1000)
	}

	const onRefresh = () => {
		finished.value = false
		loading.value = true
		onLoad()
	}

	const retryLoad = () => {
		loading.value = true
		onLoad()
	}
</script>

<template>
	<div class="h-screen">
		<custom-nav-bar></custom-nav-bar>

		<mi-space class="w-full h-10 flex items-center justify-center">
			<mi-button
				type="primary"
				size="small"
				@click="toggleRefresh"
			>
				{{ disabledRefresh ? '开启刷新' : '关闭刷新' }}
			</mi-button>

			<mi-button
				type="primary"
				size="small"
				@click="simulateLoadError"
			>
				模拟加载失败
			</mi-button>
		</mi-space>

		<div class="h-[calc(100vh-86px)] overflow-y-scroll">
			<pull-refresh-list
				v-model:loading="loading"
				v-model:refreshing="refreshing"
				:finished="finished"
				:error="loadError"
				:disabled="disabledRefresh"
				@on-refresh="onRefresh"
				@on-load="onLoad"
				@on-load-error="retryLoad"
			>
				<template #default>
					<div class="p-2">
						<mi-cell
							mb-1
							v-for="item in list"
							:key="item"
							:title="item"
						/>
					</div>
				</template>
			</pull-refresh-list>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
