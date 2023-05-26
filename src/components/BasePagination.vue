<template>
    <el-pagination
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total" 
        :page-size="currentPageSize"
        :current-page="currentPage"
        @size-change="sizeChangeHandle"
        @current-change="pageChangeHandle" />
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

@Component
export default class BasePagination extends Vue {
    @Prop({ default: () => [10, 20, 50, 100, 1000] }) pageSizes!: number[]
    @Prop({ default: 'total, sizes, prev, pager, next, jumper'}) layout!: string
    @Prop({ default: 1 }) page!: number
    @Prop({ default: 0 }) total!: number
    @Prop({ default: 20 }) pageSize!: number


    public currentPage = 1;
    public currentPageSize = 20;

    mounted() {
        const { page, pageSize } = this.$route.query;
        // console.log(page, pageSize);
        this.currentPage = Number(page);
        this.currentPageSize = Number(pageSize);
        this.$emit('update:pageSize', pageSize);
        this.$emit('update:page', page);
    }

    sizeChangeHandle(pageSize: number) {
        this.currentPageSize = pageSize;
        this.$emit('update:pageSize', pageSize);
        this.changeUrl()
    }

    pageChangeHandle(page: number) {
        this.currentPage = page;
        this.$emit('update:page', page);
        this.changeUrl();
    }

    private changeUrl() {
        console.log(this.currentPage, this.currentPage);
        this.$router.replace({ path: this.$route.path, query: {
            page: String(this.currentPage),
            pageSize: String(this.currentPageSize)}
        });
        
    }

}
</script>

<style>

</style>