<template>
    <div>{{ row[prop] }}</div>
</template>
  
<script lang='ts'>

import { Component, Prop } from 'vue-property-decorator';
import TooltipColumn from './TooltipColumn';


@Component
export default class NumCol extends TooltipColumn {
  @Prop({ default: false }) isStrong!: boolean;

  @Prop() textAlign?: string;

  @Prop({ default: 'number' }) numberStyle!: string; // number, counter

  @Prop({ default: '0' }) dec!: number;

  @Prop({ default: false }) icon!: boolean; // 文字前面带的图标

  get ext() {
    return this.$attrs.ext;
  }

  get textAlignClass() {
    const align = this.textAlign || this.align;
    switch (align) {
      case 'left':
        return 'tal';
      case 'right':
        return 'tar';
      default:
        return 'tar';
    }
  }

  getStyleNumber(num: number) {
    const filters = (this as any).$options.filters;
    if (this.numberStyle === 'counter') {
      const countFormatter = (val: number) => filters.countFormatter(val, 'zh', true);
      return countFormatter(num);
    }
    return filters.numberFormatter(num, this.dec || 0);
  }

  getDataChangeIconClass(data: number | string) {
    if (data > 0) { return 'el-icon-tubiao03 color-success'; }
    if (data === 0) { return ''; }
    if (data < 0) { return 'el-icon-tubiao04 color-danger'; }
  }
}
</script>

<style lang="scss" scoped>
.strong {
    font-weight: bold;
}

.tips-style {
    top: -7px;
    right: -7px;
    transform: rotate(45deg);
    font-size: 18px;
    color: #0188fb;
}
</style>
