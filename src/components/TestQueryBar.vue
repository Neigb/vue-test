<template>
    <div>
        <query-bar  v-model="queryBarConfig" />
        <base-pagination :total="1000" />
        <el-popover
            placement="top"
            trigger="hover"
            :content="getConent">
            <span slot="reference">test123</span>
            <div slot="default" class="flex mb10 fz14">
                <p class="mr20">ROI = 收入 / 总成本</p>
                <p class="flex"><span class="dib w30 h20 mr5" style="background: red"></span><span>&lt; 90%</span></p>
                <p class="flex"><span class="dib w30 h20 ml20 mr5" style="background: #e48900"></span><span>90% ~ 100%</span></p>
                <p class="flex"><span class="dib w30 h20 ml20 mr5" style="background: green"></span><span>&gt; 100%</span></p>
            </div>
        </el-popover>
    </div>
</template>

<script lang='ts'>

import Component from 'vue-class-component';
import Vue from 'vue';
import QueryBar, { QueryInfo } from './QueryBar.vue';
import BasePagination from './BasePagination.vue';
import RadioSelect from './RadioSelect.vue';

@Component({
    components: { QueryBar, BasePagination, RadioSelect, }
})
export default class TestQueryBar extends Vue {

    public queryBarConfig: QueryInfo = [
        [
            { is: 'el-input', key: 'name', label: '名称', labelWidth: 40, width: '120', bind: { placeholder: '123' }, on: { change: console.log } },
            { is: 'el-input', key: 'age', label: '年龄', labelWidth: 50, width: '200', bind: { placeholder: '456' }, on: { change: console.log } },
            { is: 'el-input', key: 'age2', label: '年龄', labelWidth: 50, width: '200', bind: { placeholder: '456' }, on: { change: console.log } },
        ],
        [
            { is: 'el-input', key: 'age3', label: '年龄', labelWidth: 50, width: '200', bind: { placeholder: '456' }, on: { change: console.log } },
            { is: 'el-input', key: 'age4', label: '年龄', labelWidth: 50, width: '200', bind: { placeholder: '456' }, on: { change: console.log } },
            { is: 'radio-select', key: 'select', label: '这是选项', labelWidth: 70, width: '240', bind: { option: ['选项1', '选项2', '选项3'] }, on: { change: console.log } }
        ]
    ]

    htmlStr = `<div class="flex mb10 fz14">
              <p class="mr20">ROI = 收入 / 总成本</p>
              <p class="flex"><span class="dib w30 h20 mr5" style="background: red"></span><span>&lt; 90%</span></p>
              <p class="flex"><span class="dib w30 h20 ml20 mr5" style="background: #e48900"></span><span>90% ~ 100%</span></p>
              <p class="flex"><span class="dib w30 h20 ml20 mr5" style="background: green"></span><span>&gt; 100%</span></p>
          </div>`;

    getHTML(line: string) {
      return line.replaceAll(/style_[\w\d-:;]*_/g, '');
    }

    getLineStyle(line: string) {
      let style_str = 'height: 1em;';
      if (line.startsWith('style_')) {
        style_str += line.slice(line.indexOf('_') + 1, line.lastIndexOf('_'));
      }
      return style_str;
    }

    get getConent() {
        const tooltip_content = (this.htmlStr || '').split('br').map((line, index) => {
            return `<p>${this.getHTML(line)}</p>`;
          });
        return tooltip_content;
    }
}
</script>

<style>

</style>