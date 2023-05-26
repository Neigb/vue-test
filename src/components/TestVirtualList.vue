<template>
  <el-select v-virtual-list="options" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script lang='ts'>
export default {
    data() {
      return {
        value: ''
      }
    },

    computed: {
      options() {
          const num = 1000;
          const options = [];
          for (let index = 0; index < num; index++) {
              const value = `选项${index}`;
              const label = `取值${index}`;
              options.push({ value, label});
          }
          return options;
      }
    },

    mounted() {
      console.log((this as any).options);
    }
  }
</script>

<style>

</style>