<template>
    <el-table-column v-bind="$attrs" :align="align">
      <template #header="scope">
        <el-popover
          placement="top"
          trigger="hover"
          :content="tooltip"
          :open-delay="openDelay"
          :transition="transition">
          <p
            v-for="(line, index ) in  (tooltip || '').split('br')"
            v-html="getHTML(line)"
            :style="getLineStyle(line)"
            :key="index"
          />
          <p slot="reference" :style="`text-align: ${align}`">
            <span style="padding: 0 !important;">
                <slot name="header" :column="scope.column" :index="scope.$index" v-bind="{'$index': scope.$index}">
                    <span>{{$attrs.label}}</span>
                </slot>
            </span>
          </p>
        </el-popover>
      </template>
      <template #default="scope">
        <slot name="default" :row="scope.row" :column="scope.column" :index="scope.$index" v-bind="{'$index': scope.$index}"></slot>
      </template>
    </el-table-column>
</template>
  
<script lang="ts">

export default {
    name: 'tooltip-column',
    props: {
        tooltip: {
            type: String,
            default: '',
        },
        transition: {
            type: String,
            default: 'el-fade-in-linear',
        },
        openDelay: {
            type: Number,
            default: 0,
        },
        align: {
            type: String,
            default: 'left',
        },
    },
    methods: {
        getHTML(line: string) {
            return line.replaceAll(/style_[\w\d-:;]*_/g, '');
        },
        getLineStyle(line: string) {
            let style_str = 'height: 1em;';
            if (line.startsWith('style_')) {
                style_str += line.slice(line.indexOf('_') + 1, line.lastIndexOf('_'));
            }
            return style_str;
        },
    },
};
</script>
