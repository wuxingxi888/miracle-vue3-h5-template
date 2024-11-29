import { useEnv } from '@/hooks/useEnv'
import { asyncLoadScript } from '@/utils/script'

const { isDevMode } = useEnv()
/**
 * 动态加载脚本
 */
export const useLoadScript = () => {
	if (isDevMode()) {
		asyncLoadScript({ src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'eruda' }).then(() => {
			window.eruda.init()
		})
	}
}
