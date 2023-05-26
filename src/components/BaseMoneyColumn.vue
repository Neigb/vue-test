<template>
    <!-- <div class="money-cell"> -->
      <!-- <p v-if="['', null].includes(row[prop])" class="w100p tar">--</p> -->
      <!-- <template v-else>
        <slot v-if="$scopedSlots.default" :row="row" />
        <div v-else class="w100p">
          <p class="money-cell">
            <component :is="tag" :style="{'font-weight': font_weight}">{{money_type}}</component> &nbsp;
            <component :is="tag" :style="{'font-weight': font_weight}">
              {{ $v(row, $attrs.d) === 0 ? '--' : (row[prop] / ($attrs.fen || 100) / ($v(row, $attrs.d) || 1)) | numberFormatter($attrs.dec || 2) }}
            </component>
          </p>
        </div>
      </template> -->
      <div class="flex-d-column w100p">
        <template v-for="(config, index) in Array.isArray(custom) ? custom : [custom]">
            <p :key="index">
                <span v-if="config.currency" :style="{ 'font-weight': $_getFontWeight(config.bold) }" class="fl">{{ $_getCurrency(index, config.currency) }}</span> &nbsp;
                <span :style="{ 'font-weight': $_getFontWeight(config.bold) }" class="fr">
                    {{ config.value(row, column, prop) }}
                </span>
            </p>
        </template>
      </div>
  </template>

<script lang='ts'>
import { Component, Prop } from 'vue-property-decorator';
import TooltipColumn from './TooltipColumn';


export interface MoneyColumnConfig {
    value: (row: any, column: any, prop: string) => number | string
    bold?: boolean | number | string
    currency?: 'cny' | 'usd'
    fontColor?: string
}

@Component
export default class BaseMoneyColumn extends TooltipColumn {
    // 自定义多行时使用, 自动配置单行的配置
    @Prop({
      default: () => {
        return {
          value: (row: any, column: any, prop: string) => row[prop],
          bold: true,
          currency: 'cny',
        };
      },
    }) custom!: MoneyColumnConfig | MoneyColumnConfig[]

    @Prop({ default: '120' }) width!: string;

    $_getFontWeight(bold?: number | string | boolean): number {
      if (bold === 'false') return 400;
      if (!isNaN(Number(String(bold)))) return Number(bold);
      return bold ? 700 : 400;
    }

    $_getCurrency(index: number, currency?: 'cny' | 'usd') {
      let money_type = index === 0 ? 'cny' : 'usd';
      if (currency) money_type = currency;
      if (money_type === 'cny') return '¥';
      if (money_type === 'usd') return '$';
      return undefined;
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-popover__reference {
    cursor: pointer;
}
</style>
