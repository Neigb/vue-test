import { throttle } from 'throttle-debounce'
const msgTitle = '[el-table-dynamic-scroll]: '
const elTableScrollWrapperClass = '.el-table__body-wrapper'
const elTableScrollHeaderClass = '.el-table__header-wrapper'
const scrollBackgroundClass = 'scroll-background'
let globalDataLen = 0
let globalRowLimit = 0

const ElTableDynamicScroll = {
  // 被绑定元素插入父节点时调用
  inserted(el: { querySelector: (arg0: string) => any; style: { height: string }; appendChild: (arg0: HTMLDivElement) => void }, binding: { value: { isOpen: any; rowHeight: any; dataLength: any; scrollFn: any; rowLimit: any; headerHeight: any } }) {
    const { isOpen, rowHeight, dataLength, scrollFn, rowLimit, headerHeight } =
      binding.value
    if (!isOpen) return
    globalDataLen = dataLength
    const tableWrapperElem = el.querySelector(elTableScrollWrapperClass)
    const tableHeaderElem = el.querySelector(elTableScrollHeaderClass)
    const elHeight = el.style.height
    if (!elHeight || elHeight.slice(-2) !== 'px') {
      el.style.height = '400px'
    }

    // 如果当前要显示的数量小于可视区域表格高度，需不断增加显示数量
    const showHeight = +el.style.height.slice(0, -2)
    globalRowLimit = rowLimit
    // 初始化dataLength有值，则会自动添加limit，没值则不会执行，还是使用 rowLimit
    while (dataLength && rowHeight * globalRowLimit <= showHeight) {
      globalRowLimit++
    }
    // 初始化赋值
    scrollFn(0, globalRowLimit)

    if (!tableWrapperElem) {
      throw new Error(
        `${msgTitle}${elTableScrollWrapperClass} element not found.`,
      )
    }
    // 新增scroll 节点， 用于滚动

    setTimeout(() => {
      // 动态让父元素宽度等于子元素宽度
      const tableWidth =
        tableWrapperElem.querySelector('table').style.width || 'fit-content'
      tableWrapperElem.style.width = tableWidth
      // 解决给组件传高被动态减掉问题
      tableHeaderElem.style.width = tableWidth

      // header的高度
      const topHeight =
        headerHeight || tableHeaderElem.getBoundingClientRect().height || 42
      // 创建dom并添加
      const scrollBackgroundElem = document.createElement('div')
      scrollBackgroundElem.style.top = `${topHeight}px`
      scrollBackgroundElem.style.height = dataLength * rowHeight + 'px'
      scrollBackgroundElem.className = scrollBackgroundClass
      el.appendChild(scrollBackgroundElem)

      tableWrapperElem.style.top = `${topHeight}px`

      listenerElem(el, tableWrapperElem, binding.value)
    })
  },

  componentUpdated(el: { querySelector: (arg0: string) => any }, binding: { value: { isOpen: any; rowHeight: any; dataLength: any } }) {
    const { isOpen, rowHeight, dataLength } = binding.value
    if (!isOpen) return

    // 如果高度相等，无需处理
    if (dataLength === globalDataLen) return
    // 全局高度更新
    globalDataLen = dataLength
    const scrollBackgroundElem = el.querySelector(`.${scrollBackgroundClass}`)
    // 数据变更后，改变滚动背景的高度，这个值变化，我们的监听滚动条也会变化
    if (scrollBackgroundElem) {
      scrollBackgroundElem.style.height = dataLength * rowHeight + 'px'
    }
  },

  // 只调用一次，指令与元素解绑时调用。
  unbind(el: { querySelector: (arg0: string) => any }, binding: { value: { isOpen: any } }) {
    const { isOpen } = binding.value
    if (!isOpen) return

    // 初始化全局长度
    globalDataLen = 0
    listenerElem(
      el,
      el.querySelector(elTableScrollWrapperClass),
      binding.value,
      false,
    )
  },
}

export default ElTableDynamicScroll

// 监听与取消监听
function listenerElem(bodyElem: { querySelector?: ((arg0: string) => any) | ((arg0: string) => any); style?: { height: string }; appendChild?: (arg0: HTMLDivElement) => void; addEventListener?: any; removeEventListener?: any }, tableWrapperElem: { style: { transform: string } }, params: { isOpen?: any; rowHeight?: any; dataLength?: any; scrollFn?: any; rowLimit?: any; headerHeight?: any; throttleTime?: any }, isBinding = true) {
  const { rowHeight, scrollFn, throttleTime = 50 } = params
  if (!bodyElem || !tableWrapperElem) return

  const scrollHandler = (e: { target: { scrollTop: any } }) => {
    const scrollTop = e.target.scrollTop
    let start = Math.floor(scrollTop / rowHeight)
    if (start < 0) start = 0
    let end = start + globalRowLimit
    // 偏移量
    let startOffset = scrollTop - (scrollTop % rowHeight)
    tableWrapperElem.style.transform = `translate3d(0,${startOffset}px,0)`
    scrollFn(start, end)
  }
  const throttleFunc = throttle(throttleTime, true, scrollHandler)
  if (isBinding) {
    bodyElem.addEventListener('scroll', throttleFunc)
  } else {
    bodyElem.removeEventListener('scroll', throttleFunc)
  }
}
