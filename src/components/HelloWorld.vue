<!--
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2023-05-18 18:03:07
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-05-22 17:30:36
 * @FilePath: \directives-vue2.0\src\components\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="hello">
    <h1>常用指令</h1>
    <input type="text" v-number="{ negative: true, max: 100, min: -1 , digit:2}" @input="input" v-model="val">

    <textarea v-filter-emoji></textarea>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      val: ''
    }
  },
  mounted(){
    const val = '000000'.replace(/^0+(\d)/,(a,b)=>{
      console.log('%c [ a,b ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', a,b)
      return b
    })
    console.log('%c [ val ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', val)
    '000000'.replace(/^0+(\d)/,'$1')
  },
  methods:{
    input(e){
      this.val = e.target.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
