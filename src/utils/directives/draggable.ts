import type { Directive } from 'vue'

interface ElType extends HTMLElement {
	parentNode: HTMLElement
}

/**
 * 拖动指令
 * 该指令用于拖动元素
 * v-drag （设置需要拖拽的元素为absolute，其父元素为relative）
 * <button v-drag>拖动我</button>
 */
const draggable: Directive = {
	mounted: function (el: ElType) {
		el.style.cursor = 'move'
		el.style.position = 'absolute'

		function startDrag(e: MouseEvent | TouchEvent, isTouch: boolean) {
			e.preventDefault()
			const startX = isTouch ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX
			const startY = isTouch ? (e as TouchEvent).touches[0].pageY : (e as MouseEvent).pageY
			const disX = startX - el.offsetLeft
			const disY = startY - el.offsetTop

			function move(e: MouseEvent | TouchEvent) {
				const x = isTouch ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX
				const y = isTouch ? (e as TouchEvent).touches[0].pageY : (e as MouseEvent).pageY
				let newX = x - disX
				let newY = y - disY
				const maxX = el.parentNode.offsetWidth - el.offsetWidth
				const maxY = el.parentNode.offsetHeight - el.offsetHeight

				if (newX < 0) {
					newX = 0
				} else if (newX > maxX) {
					newX = maxX
				}

				if (newY < 0) {
					newY = 0
				} else if (newY > maxY) {
					newY = maxY
				}

				requestAnimationFrame(() => {
					el.style.left = newX + 'px'
					el.style.top = newY + 'px'
				})
			}

			function endDrag() {
				document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', move)
				document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endDrag)
			}

			document.addEventListener(isTouch ? 'touchmove' : 'mousemove', move)
			document.addEventListener(isTouch ? 'touchend' : 'mouseup', endDrag)
		}

		el.addEventListener('touchstart', (e) => startDrag(e, true))
		el.addEventListener('mousedown', (e) => startDrag(e, false))
	}
}

export default draggable
