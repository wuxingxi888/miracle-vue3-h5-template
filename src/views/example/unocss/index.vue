<script setup lang="ts">
	const addAnimation = () => {
		const demo = document.querySelector('.demo')
		demo?.classList.add('animate-bounce-alt', 'animate-count-infinite', 'animate-duration-1s')
	}

	const removeAnimation = () => {
		const demo = document.querySelector('.demo')
		demo?.classList.remove('animate-bounce-alt', 'animate-count-infinite', 'animate-duration-1s')
	}

	const changeFont = () => {
		const demo = document.querySelector('.demo')
		demo?.classList.add('font-msz')
	}

	const resetFont = () => {
		const demo = document.querySelector('.demo')
		demo?.classList.remove('font-msz')
	}
</script>

<template>
	<div>
		<custom-nav-bar />
		<div class="p-20px">
			<div class="custom-card">
				<span class="demo dark:text-black text-18px">即时按需的原子CSS引擎</span>
			</div>

			<div>
				<mi-space
					wrap
					class="mt-10px"
				>
					<mi-button
						type="primary"
						size="small"
						@click="addAnimation"
					>
						添加动画
					</mi-button>

					<mi-button
						type="primary"
						size="small"
						@click="removeAnimation"
					>
						移除动画
					</mi-button>

					<mi-button
						type="primary"
						size="small"
						@click="changeFont"
					>
						修改字体
					</mi-button>

					<mi-button
						type="primary"
						size="small"
						@click="resetFont"
					>
						重置字体
					</mi-button>
				</mi-space>
			</div>

			<div class="custom-card mt-20px flex-col">
				<span class="dark:text-black text-18px">CSS图标</span>
				<div class="mt-10px">
					<div class="icon i-ic:baseline-10k"></div>
					<div class="icon i-ic:baseline-agriculture"></div>
					<div class="icon i-ic:baseline-21mp"></div>
					<div class="icon i-ic:baseline-60fps"></div>
					<div class="icon i-ic:baseline-light-mode"></div>
					<div class="icon i-ic:baseline-surfing"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.custom-card {
		--at-apply: w-auto h-30 flex-center bg-white rounded-10px;
	}

	.icon {
		--at-apply: w-3em h-3em;
	}
</style>
