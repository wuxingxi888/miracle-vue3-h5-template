import scrollUtil from './scrollUtil'

/**
 * useScrollCache 页面缓存
 * 1.确保页面有keepAlive属性
 * 2.确保页面文件名称和路由name字段名称一致
 * 3.如果不一致（可设置页面组件名称）如：	defineOptions({ name: 'ScrollCache' })
 * @param dom
 * @param animeStatus
 * @returns
 */
export function useScrollCache(dom, animeStatus = false) {
	const scrollTop = ref(0)
	const duration = 200

	dom.onscroll = () => {
		const result = scrollUtil({ dom })
		scrollTop.value = result.scrollTop
	}

	const route = useRoute()

	if (!route.meta.keepAlive) {
		try {
			throw new Error('当前页面没有keepAlive属性')
		} catch (error) {
			console.error(error)
		}
	}

	onActivated(() => {
		const maxScrollTop = scrollTop.value
		const split = maxScrollTop / 10
		const anime = async () => {
			if (dom.scrollTop + 50 >= maxScrollTop) return
			dom.scrollTop = dom.scrollTop + split
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve()
				}, duration / 10)
			})
			anime()
		}
		animeStatus ? anime() : (dom.scrollTop = maxScrollTop)
	})

	return scrollTop
}
