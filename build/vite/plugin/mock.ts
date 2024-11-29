/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isEnabled: boolean) {
	return viteMockServe({
		ignore: /^\_/,
		mockPath: 'mock',
		enable: isEnabled
	})
}