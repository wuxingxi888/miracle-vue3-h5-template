import type { BuildOptions } from 'vite'

export function createBuild(viteEnv: ViteEnv): BuildOptions {
	const { VITE_OUTPUT_DIR } = viteEnv
	return {
		sourcemap: false, // 是否启用
		outDir: VITE_OUTPUT_DIR,
		cssCodeSplit: false, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
		target: 'modules', // esnext
		minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
		assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
		chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）
		// rollup 打包配置
		rollupOptions: {
			output: {
				// 拆分js到模块文件夹
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				// 拆分静态资源文件夹，[ext]表示文件扩展名
				assetFileNames: (chunkInfo) => {
					if (chunkInfo.name) {
						const info = chunkInfo.name.split('.')
						let extType = info[info.length - 1]
						if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(chunkInfo.name)) {
							extType = 'media'
						} else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(chunkInfo.name)) {
							extType = 'images'
						} else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(chunkInfo.name)) {
							extType = 'fonts'
						}
						return `static/${extType}/[name]-[hash][extname]`
					}
					return 'static/[ext]/[name]-[hash].[ext]'
				},
				manualChunks(id) {
					// 最小化拆分包
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString()
					}
					return
				}
			}
		}
	}
}
