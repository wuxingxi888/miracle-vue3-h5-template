<script setup lang="ts">
	defineOptions({
		name: 'PullRefreshList'
	})

	const props = defineProps({
		// 加载状态
		loading: {
			type: Boolean,
			default: false
		},
		// 刷新状态
		refreshing: {
			type: Boolean,
			default: false
		},
		// 是否已加载完成
		finished: {
			type: Boolean,
			default: false
		},
		// 是否加载失败
		error: {
			type: Boolean,
			default: false
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否在初始化时立即执行滚动位置检查
		immediateCheck: {
			type: Boolean,
			default: true
		},
		// 滚动条与底部距离小于 offset 时触发load事件
		offset: {
			type: Number,
			default: 100
		},
		finishedText: {
			type: String,
			default: '没有更多了'
		},
		errorText: {
			type: String,
			default: '加载失败，点击重试'
		}
	})

	const isLoading = ref(false)

	const isRefreshing = ref(false)

	watch(
		() => props.loading,
		(val) => {
			isLoading.value = val
		},
		{
			immediate: true
		}
	)

	watch(
		() => props.refreshing,
		(val) => {
			isRefreshing.value = val
		},
		{
			immediate: true
		}
	)

	const emit = defineEmits(['update:loading', 'update:refreshing', 'onRefresh', 'onLoad', 'onLoadError'])

	// 处理刷新操作
	const handleRefresh = () => {
		emit('update:refreshing', true)
		emit('onRefresh')
	}

	// 处理加载操作
	const handleLoad = () => {
		if (props.finished || props.error) return
		emit('update:loading', true)
		emit('onLoad')
	}

	// 处理错误点击
	const handleErrorClick = () => {
		emit('onLoadError')
	}
</script>

<template>
	<mi-pull-refresh
		v-model="isRefreshing"
		:disabled="disabled"
		@refresh="handleRefresh"
	>
		<!-- 自定义下拉刷新插槽 -->
		<template #pulling="props">
			<slot
				name="pulling"
				v-bind="props"
			>
				<div class="mi-default-pulling">下拉刷新</div>
			</slot>
		</template>

		<template #loosing>
			<slot name="loosing">
				<div class="mi-default-loosing">释放立即刷新</div>
			</slot>
		</template>

		<template #loading>
			<slot name="loading">
				<div class="mi-default-loading">
					<mi-loading size="22px">加载中...</mi-loading>
				</div>
			</slot>
		</template>

		<template #success>
			<slot name="loosing">
				<div class="mi-default-success">刷新成功</div>
			</slot>
		</template>

		<mi-list
			v-model:loading="isLoading"
			:finished="finished"
			:error="error"
			:immediate-check="immediateCheck"
			:offset="offset"
			:finished-text="finishedText"
			:error-text="errorText"
			@load="handleLoad"
		>
			<!-- 默认插槽用于列表内容 -->
			<slot></slot>

			<!-- 自定义加载状态插槽 -->
			<template #loading>
				<slot name="load-loading">
					<div class="mi-default-loading">
						<mi-loading size="22px">加载中...</mi-loading>
					</div>
				</slot>
			</template>

			<template #finished>
				<slot name="load-finished">
					<div class="mi-default-finished">没有更多了</div>
				</slot>
			</template>

			<template #error>
				<slot name="load-error">
					<div
						class="mi-default-error"
						@click="handleErrorClick"
					>
						加载失败，点击重试
					</div>
				</slot>
			</template>
		</mi-list>
	</mi-pull-refresh>
</template>

<style lang="scss" scoped>
	.mi-default-pulling,
	.mi-default-loosing,
	.mi-default-loading,
	.mi-default-finished,
	.mi-default-error {
		text-align: center;
		color: #969799;
		font-size: 14px;
	}

	.mi-default-error {
		color: #ee0a24;
	}
</style>
