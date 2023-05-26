<template>
  <div class="money-cell">
    <p v-if="['', null].includes(row[prop])" class="w100p tar">--</p>
    <template v-else>
      <div class="w100p">
        <p class="money-cell">
          <component :is="tag" :style="{'font-weight': font_weight}">{{money_type}}</component> &nbsp;
          <component :is="tag" :style="{'font-weight': font_weight}">
          </component>
        </p>
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from 'vue-property-decorator';
import TooltipColumn from './TooltipColumn';

@Component
export default class MoneyColumn extends TooltipColumn {
  // 货币类型
  @Prop({ default: 'cny' }) currency!: string;

  @Prop({ default: true }) bold!: boolean | number | string;

  @Prop({ default: '120' }) width!: string;

  get font_weight(): number {
    if (this.bold === 'false') return 400;
    if (!isNaN(Number(String(this.bold)))) return Number(this.bold);
    return this.bold ? 700 : 400;
  }

  get tag () {
    return this.$attrs.tag || 'span';
  }

  get money_type () {
    const type = this.currency;
    if (type === 'cny') return '¥';
    if (type === 'usd') return '$';
    return '¥';
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-popover__reference {
    cursor: pointer;
}
</style>
