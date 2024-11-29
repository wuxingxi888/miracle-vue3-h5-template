/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean): Plugin | Plugin[] {
	const plugins: Plugin[] = []

	const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

	// const getAppConfigSrc = () => {
	// 	const normalizedPath = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`
	// 	return `${normalizedPath}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${Date.now()}`
	// }

	// const scriptTag = isBuild ? [{ tag: 'script', attrs: { src: getAppConfigSrc() } }] : []

	const htmlPlugin = createHtmlPlugin({
		minify: true,
		inject: {
			data: {
				title: VITE_GLOB_APP_TITLE
			}
			// tags: scriptTag
		}
	}) as Plugin[]

	if (htmlPlugin) {
		plugins.push(...htmlPlugin)
	}

	return plugins
}
