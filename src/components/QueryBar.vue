<template>
    <div>
        <!-- 字段 -->
        <div class="tal" v-for="(queryRowInfo, index) in innerData" :key="index">
            <div 
                v-for="queryColInfo in queryRowInfo" :key="queryColInfo.key"
                class="inline-block tal mb5 ml5"
                :style="`width: ${Number(queryColInfo.labelWidth) + 20 + Number(queryColInfo.width)}px;`">
                <span class="inline-block" :style="`width: ${queryColInfo.labelWidth}px;`">{{ queryColInfo.label }}</span>
                <div class="inline-block" :style="`width: ${queryColInfo.width}px;`">
                    <component
                        :is="queryColInfo.is"
                        v-model="queryColInfo.value"
                        v-bind="queryColInfo.bind"
                        v-on="queryColInfo.on" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="query-btn pl5">
          <el-button @click="searchBtnHandleClick" size="mini" type="primary"><i class="el-icon-search"></i>查询</el-button>
          <el-button @click="resetBtnHandleClick" icon="el-icon-refresh-right" size="mini">重置 </el-button>
          <base-date-btn-single v-if="dateQuickSelect" v-model="date" @change="onDateChange" />
          <!-- <template v-if="DC && !isMobile">
            <m-date-btns v-model="searchField[DC]" @change="changeParams" v-if="!is_single" />
            <s-date-btns v-model="searchField[DC]" @change="changeParams" v-if="is_single" />
          </template> -->
          <slot name="more-button" />
      </div>
    </div>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop, Watch } from 'vue-property-decorator';
import BaseDateBtnSingle from './BaseDateBtnSingle';
import dayjs from 'dayjs';

export interface QueryConfigItem {
    key: string
    label: string
    labelWidth: string | number
    width: string | number
    is: string
    bind?: any
    on?: any
    value?: any
    // change?: (value: any) => void
}

export type QueryInfo = QueryConfigItem[][] | QueryConfigItem[]

@Component({
    model: {
        prop: 'queryInfo',
        event: 'change',
    },
    components: { BaseDateBtnSingle },
})
export default class QueryBar extends Vue {
    // 配置信息
    @Prop({ default: []}) queryInfo!: QueryInfo;

    @Prop({ default: true }) dateQuickSelect!: boolean;

    public date = new Date().getTime();

    // 辅助数据
    public innerData: QueryInfo = [];

    // 配置信息改变时内部data也改变
    @Watch('queryInfo', { deep: true, immediate: true })
    onQueryInfoChange(value: QueryInfo) {
        if (this.isDoubleArray) {
            this.innerData = value
        } else {
            this.innerData = [value] as QueryInfo;
        }
    }

    private get isDoubleArray() {
        if (this.queryInfo.length > 0 && Array.isArray(this.queryInfo[0])) return true;
        return false;
    }

    @Watch('innerData', { deep: true, immediate: false })
    onInnerDataChanged(value: QueryInfo) {
        if (this.isDoubleArray) {
            this.$emit('change', value);
        } else {
            this.$emit('change', value[0]);
        }
    }

    searchBtnHandleClick() {
        const query: { [key: string]: any } = { ...this.formatParams() };
        if (this.dateQuickSelect) {
            query.date = dayjs(this.date).format('YYYY-MM-DD');
        }
        
        query.rk = Math.floor(Math.random() * 10000);
        this.$router.replace({ path: this.$route.path, query })
    }

    resetBtnHandleClick() {
        const query = this.$route.query;
        if (Object.keys(query).length === 0) return;
        this.$router.replace({ path: this.$route.path })
    }

    onDateChange(date: number) {
        this.searchBtnHandleClick();
    }

    /**
     * 获取参数
     */
    formatParams() {
        const params: { [key: string]: any } = {};
        this.innerData.flat(2).forEach((item: QueryConfigItem) => {
            const value = item.value;
            if (value && value !== '') {
                params[item.key] = value;
            }
        })
        return params;
    }
}
</script>

<style lang="scss" scoped>
.tal {
    text-align: left;
}

.ml5 {
    margin-left: 5px;
}

.mb5 {
    margin-bottom: 5px;
}

.pl5 {
    padding-left: 5px;
}

.inline-block {
    display: inline-block;
}

.query-btn {
    text-align: left;
    padding-bottom: 10px;
    margin-top: 3px;
}
</style>
