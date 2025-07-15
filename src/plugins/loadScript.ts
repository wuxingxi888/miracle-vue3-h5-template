import { useEnv } from '@/hooks/useEnv'
import { asyncLoadScript } from '@/utils/script'

const { getEnvMode } = useEnv()
/**
 * 动态加载脚本
 */
export const useLoadScript = () => {
	if (getEnvMode() !== 'production') {
		asyncLoadScript({ src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'eruda' }).then(() => {
			window.eruda.init()
		})
	}
}
