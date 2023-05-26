/**
 * ElSelect懒加载指令
 * @param lazyShowOptions 当前展示的数据，指令会修改这个值，必须传这个值
 * @param rowHeight option的行高,默认34
 * @param threshold 加载提前行数阈值, 默认5行
 * @param loadNum 每次加载行数, 默认30行
 */
// 用法示例
// <el-select
//     v-lazy-select="options"
//     ref="select"
//     v-model="value"
//     :lazyShowOptions.sync="lazyShowOptions"  // 实际上.sync有没有都一样，只是为了提示这个值会被修改 
//     placeholder="请选择"
//     collapse-tags
//     multiple
//     clearable
//     autoComplate
//     filterable>
//     <el-option
//         v-for="item in lazyShowOptions"  // 这里的循环要使用lazyShowOptions，当前已经加载的数据
//         :key="item.value"
//         :label="item.label"
//         :value="item.value">
//     </el-option>
// </el-select>

export default {
    
    // 指令的绑定函数，只调用一次
    bind: function (el: any, binding: any, vnode: any) {
        let start = -1;  // 表示当前已经加载的数据的位置
        let end = -1; // 表示当前已经加载的数据的位置
        const rowHeight = Number(vnode.data.attrs.rowHeight) || 34;
        const loadNum = Number(vnode.data.attrs.loadNum) || 30; // 加载行数
        const threshold = Number(vnode.data.attrs.threshold) || 5; // 懒加载行数阈值
        const elementTop = document.createElement('div');
        const elementBottom = document.createElement('div');
        const scrollWrap = vnode.context.$refs.select.$refs.scrollbar.$refs.wrap;
        const updateShowOptions = function() {
            const options = binding.value;
            const scrollHeight = scrollWrap.clientHeight;
            const scrollTop = scrollWrap.scrollTop;
            const visibleRows = Math.ceil(scrollHeight / rowHeight);
            let visibleStart = Math.floor(scrollTop / rowHeight);
            if (visibleStart < 0 || visibleStart >= options.length) {
                visibleStart = 0;
            }
            let visibleEnd = visibleRows + visibleStart - 1;
            if (visibleEnd > options.length) {
                visibleEnd = options.length;
            }
            
            // start、 end 表示当前窗口可以看见的数据下标
            if (start >= visibleStart - threshold) {
                let sliceStart: number
                let pushNum: number
                if (Math.floor(start - loadNum) >= 0) {
                    sliceStart = Math.floor(start - loadNum);
                    pushNum = start - sliceStart;
                } else {
                    sliceStart = 0;
                    pushNum = start;
                }
                if (pushNum > 0) {
                    console.log(`push new start options, sliceStart: ${sliceStart}, pushNum: ${pushNum}`);
                    vnode.context.lazyShowOptions.unshift(...options.slice(sliceStart, sliceStart + pushNum))
                    start = sliceStart;
                }
            }
            if (end <= visibleEnd + threshold) {
                let sliceEnd: number
                let pushNum: number
                if (Math.ceil(end + loadNum) < options.length) {
                    sliceEnd = Math.ceil(end + loadNum);
                    pushNum = sliceEnd - end;
                } else {
                    sliceEnd = options.length;
                    pushNum = options.length - end;
                }
                if (pushNum > 0) {
                    console.log(`push new end options, sliceEnd: ${sliceEnd} pushNum: ${pushNum}`);
                    vnode.context.lazyShowOptions.push(...options.slice(sliceEnd - pushNum, sliceEnd))
                    end = sliceEnd;
                }
            }
            elementTop.style.height = `${(start) * rowHeight}px`;
            elementBottom.style.height = `${(options.length - end) * rowHeight}px`;
        }

        const initShowOptions = function(selectedValue: any[] | any) {
            const options = binding.value as any[];
            let sliceStart = 0;
            let firstValue: any = null
            if (Array.isArray(selectedValue)){
                if (selectedValue.length) {
                    firstValue = selectedValue[0];
                }
            } else if(selectedValue !== null && selectedValue !== undefined) {
                firstValue = selectedValue;
            }
            const index = options.findIndex(item => item.value === firstValue)
            if (index > 0) {
                sliceStart = index > Math.ceil(loadNum / 2) ? index - Math.ceil(loadNum / 2) : index;
            } else {
                sliceStart = 0;
            }
            let sliceEnd = sliceStart + loadNum;
            if (sliceEnd >= options.length) {
                sliceEnd = options.length - 1;
            }
            vnode.context.lazyShowOptions = options.slice(sliceStart, sliceEnd);
            start = sliceStart;
            end = sliceEnd;
            elementTop.style.height = `${(start) * rowHeight}px`;
            elementBottom.style.height = `${(options.length - end) * rowHeight}px`;
        }

        const initVirtualElement = function() {
            scrollWrap.insertBefore(elementTop, scrollWrap.firstChild);
            scrollWrap.appendChild(elementBottom);
        }

        initVirtualElement();
        initShowOptions(vnode.context.value || [])
        scrollWrap.addEventListener('scroll', updateShowOptions)
    },
}
