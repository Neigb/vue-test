<template>
    <el-table ref="table" v-bind="$attrs" :data="loadedData">
        <slot></slot>
    </el-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        loadNum: {
            type: [Number, String],
            default: 30,
        },
    },

    computed: {
        // 最大加载数量
        maxLoadNum() {
            return this.data.length;
        },
        
    },

    data() {
        return {
            virtualElm: null,
            observer: null,
            loadedNum: 0,
            loadedData: [],
            loadAllFlag: false,
            lastLoadAllHeight: 0,
        }
    },

    methods: {
        // 监听是否需要加载数据
        addObserver() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            const rows = this.$el.querySelector('.el-table__body').__vue__.$children;
            let lastRow = null;
            if (rows.length > 1) {
                lastRow = rows[rows.length - 2].$el;
            }
            if (lastRow) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (this.loadedNum >= this.maxLoadNum) {
                            console.log('加载到底了！！');
                            this.loadAllFlag = true;
                            this.lastLoadAllHeight = document.scrollingElement.scrollHeight;
                            this.observer.disconnect();
                            return;
                        }
                        if (entry.isIntersecting) {
                            this.loadMore();
                            this.observer.disconnect();
                            this.$nextTick(() => {
                                this.addObserver();
                            });
                        }
                    });
                });
                this.observer.observe(lastRow);
            }
        },

        loadMore() {
            if (this.loadedNum < this.maxLoadNum) {
                const loadNum = Number(this.loadNum);
                this.loadedData.push(...this.data.slice(this.loadedNum, this.loadedNum + loadNum));
                this.loadedNum += loadNum;
                console.log('加载了' + loadNum + '条数据');
                // 更新虚拟元素的高度
                this.updateVirtualElmHeight();
            }
        },

        addVirtualElm() {
            if (this.virtualElm) {
                return;
            }
            this.virtualElm = document.createElement('div');
            this.virtualElm.style.backgroundColor = 'red';
            this.virtualElm.style.visibility = 'hidden';
            this.virtualElm.style.height = '0px';
            this.$el.querySelector('.el-table__body-wrapper').appendChild(this.virtualElm);
        },

        updateVirtualElmHeight() {
            this.$nextTick(() => {
                const avgRowHeight = this.$el.querySelector('.el-table__body').offsetHeight / this.loadedData.length;
                let restRow = this.maxLoadNum - this.loadedNum;
                restRow = restRow > 0 ? restRow : 0;
                const virtualElmHeight = avgRowHeight * restRow;
                this.virtualElm.style.height = virtualElmHeight + 'px';
            })
        }
    },

    watch: {
        data(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.loadedNum = 0;
                this.loadedData = [];
                this.loadMore();
                // const target = this.$el.querySelector('el-table__header-wrapper');
                document.scrollingElement?.scrollIntoView(true);
                this.$nextTick(() => {
                    this.addObserver();
                });
            } else if(this.loadAllFlag) {
                this.loadAllFlag = false;
                this.loadMore();
                this.updateVirtualElmHeight();
                this.$nextTick(() => {
                    document.scrollingElement.scrollTo({ top: this.lastLoadAllHeight });
                    this.addObserver();
                });
            }
        },
    },

    mounted() {
        this.addVirtualElm();
        this.loadMore();
        this.updateVirtualElmHeight();
        // 页面更新完再监听，不然取到的元素是更新前的
        this.$nextTick(() => {
            this.addObserver();
        });
    }

}
</script>

<style>

</style>