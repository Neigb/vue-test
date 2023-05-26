<template>
    <div>
        <el-select
            v-lazy-select="options"
            ref="select"
            v-model="value"
            :lazyShowOptions.sync="lazyShowOptions"
            placeholder="请选择"
            collapse-tags
            multiple
            clearable
            autoComplate
            filterable>
            <el-option
                v-for="item in lazyShowOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-button @click="$router.push({ name: 'virtual-list'})">前往QueryBar</el-button>
    </div>
</template>

<script lang="ts">
import { ElSelect } from 'element-ui/types/select';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class TestVirtualSelect extends Vue {
    value = ['取值30']

    lazyShowOptions: any[] = []

    get options() {
        const num = 10000;
        const options = [];
        for (let index = 0; index < num; index++) {
            const label = `选项${index}`;
            const value = `取值${index}`;
            options.push({ label, value });
        }
        return options;
    }
}
</script>

<style lang="scss" scoped>

</style>