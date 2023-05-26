import TestQueryBar from '@/components/TestQueryBar.vue'
import VueRouter from 'vue-router'

export default new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: '',
            redirect: '/test-lazy-table',
        },
        {
            path: '/test-query-bar',
            name: 'query-bar',
            component: TestQueryBar,
        },
        {
            path: '/test-virtual-list',
            name: 'virtual-list',
            component: () => import('@/components/TestVirtualList.vue'),
        },
        {
            path: '/test-lazy-select',
            name: 'virtual-select',
            component: () => import('@/components/TestVirtualSelect.vue'),
        },
        {
            path: '/test-hide-long-text',
            name: 'hide-long-text',
            component: () => import('@/components/TestHideLongText.vue'),
        },
        {
            path: '/test-lazy-table',
            name: 'lazy-table',
            component: () => import('@/components/TestLazyTable.vue'),
        },
    ]
})


