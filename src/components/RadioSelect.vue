<template>
  <el-radio-group v-bind:value="checked" v-on:input="onCheckChanged">
    <component :is="itemType" :label="getOptKey(opt)" v-for="opt in option" :key="getOptKey(opt)">
    {{ opt.label || opt }}
    </component>
  </el-radio-group>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';

interface Dictionary<T=any> { [key: string]: T }

@Component({
  model: {
    prop: 'checked',
    event: 'change',
  },
})
export default class RadioSelect extends Vue {
    @Prop({ default: [] }) option!: any[];

    @Prop({ default: '' }) checked? :string;

    @Prop({ default: 'el-radio-button' }) itemType!: 'el-radio-button' | 'el-ratio'

    onCheckChanged(value: string) {
      this.$emit('change', value);
    }

    getOptKey(opt: Dictionary | string) {
      try {
        if (typeof opt === 'string') return opt;
        if (![undefined, null].includes(opt.key)) return opt.key;
        throw new Error('getOptKey');
      } catch (err) {
        console.error('getOptKey', err);
      }
    }
}

</script>

<style scoped>
::v-deep .el-radio {
  margin-right: 14px;
  padding-top: 6px;
}
</style>
