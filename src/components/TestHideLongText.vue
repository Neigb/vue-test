<template>
    <div>
        <div class="test" style="max-width: 200px;">
            <hide-long-text :line="line">{{ text }}</hide-long-text>
        </div>
        <el-button @click="text = text + 'abcde'">加五字符</el-button>
        <el-button @click="text = text.slice(0, -5)">减五字符</el-button>
    </div>
</template>
  
<script lang='ts'>
import HideLongText from './HideLongText.vue';

export default {
    components: {
        HideLongText,
    },
    data() {
        return {
            line: 1,
            text: '99q999999q99999q99999qw199qw19q99999qw199qw1',
        }
    },

    computed: {

    },
}
</script>
  
<style>
.test {
    display: flex;
}
</style>
