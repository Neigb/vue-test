<template>
  <span style="width: 100%;text-align: justify;">
    <el-popover
      :trigger="trigger"
      :openDelay="openDelay"
      :placement="placement"
      :disabled="disabled">
      <div ref="reference" slot="reference" class="hide-long-text" :class="{ 'multiple-lines': line > 1 }" :style="style">
        <slot></slot>
      </div>
      <div slot="default">
        <slot></slot>
      </div>
    </el-popover>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class HideLongText extends Vue {
  @Prop({ default: 1 }) line!: number;

  @Prop({ default: 'hover' }) trigger!: string;

  @Prop({ default: 500 }) openDelay!: number;

  @Prop({ default: 'bottom' }) placement!: string;

  canPopover = false;

  mounted() {
    const resizeObserver = new ResizeObserver(this.check);
    const element = this.$refs.reference as HTMLElement;
    resizeObserver.observe(element);
  }

  updated() {
    this.check();
  }
  

  get style(): any {
    return this.line > 1 ? {
      WebkitLineClamp: this.line,
      whiteSpace: 'pre-wrap',
    } : {
      whiteSpace: 'nowrap',
    }
  }

  get disabled() {
    return this.canPopover;
  }

  check() {
    this.canPopover = !this.isOver(this.$refs.reference as HTMLElement);
  }

  // 判断文本是否超出元素的范围
  isOver(element: HTMLElement) {
    if (!element) { return false; }
    
    const text = element.innerText;

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const tempElement = document.createElement('span');
    tempElement.style.whiteSpace = window.getComputedStyle(element).whiteSpace;
    tempElement.style.fontSize = window.getComputedStyle(element).fontSize;
    tempElement.style.fontFamily = window.getComputedStyle(element).fontFamily;
    tempElement.style.fontWeight = window.getComputedStyle(element).fontWeight;
    const lineClamp = window.getComputedStyle(element).webkitLineClamp;
    if (Number(lineClamp) > 1) {
      tempElement.style.webkitLineClamp = String(Number(lineClamp) + 1);
      tempElement.style.width = window.getComputedStyle(element).width;
      tempElement.style.maxWidth = window.getComputedStyle(element).maxWidth;
      tempElement.style.wordBreak = window.getComputedStyle(element).wordBreak;
      tempElement.style.wordWrap = window.getComputedStyle(element).wordWrap;
      tempElement.style.textOverflow = window.getComputedStyle(element).textOverflow;
      tempElement.style.overflow = window.getComputedStyle(element).overflow;
      tempElement.style.webkitBoxOrient = window.getComputedStyle(element).webkitBoxOrient;
    }
    tempElement.style.display = window.getComputedStyle(element).display;
    
    tempElement.style.visibility = 'hidden';
    tempElement.innerText = text;
    document.body.appendChild(tempElement);

    const textWidth = tempElement.offsetWidth;
    const textHeight = tempElement.offsetHeight;

    document.body.removeChild(tempElement);
    
    if (textWidth > elementWidth || textHeight > elementHeight) {
      return true;
    }
    return false;
  }
}
</script>

<style scoped>
.hide-long-text {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  line-height: 1.5;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
}
.multiple-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
