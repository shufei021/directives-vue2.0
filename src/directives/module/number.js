/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2023-05-19 14:38:07
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-05-19 18:01:34
 */
export default {
  bind (el, binding) {
    // input 输入框 元素 兼容
    if (el.tagName !== 'INPUT') el = el.querySelector('input')
    // max 最大值, min 最小值, digit 小数位数, negative 是否支持输入负号, isReplace 超出最值是否进行替换成最值
    const { max, min,digit, negative, isReplace } = binding.value || {}
    // 记录旧值
    el.old = ''
    // 小数位数正则
    const digitReg = new RegExp(`^\\d*(\\.?\\d{0,${digit === undefined ? 2 : digit}})`, 'g')
    // 其它非法值进行处理 函数
    el.formatVal = function(newValue,is) {
      newValue = newValue.replace(/[^\d.]/, '')    // 首位 不是数字 或 小数点 就干掉
      newValue = newValue.replace(/^0+(\d)/, '$1') // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
      newValue = newValue.replace(/^\./, '0.')     // 如果输入的第一位为小数点，则替换成 0. 实现自动补全
      newValue = newValue.match(digitReg)[0] || '' // 最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
      // 如果是失去焦点
      if(is) newValue = newValue.replace(/(\d+)\.$/,'$1').replace(/^\-$/,'')
      return newValue
    }
    // 输入事件
    el.inputHandler = function () {
      // 最新的输入框内的值
      let newValue = el.value
      // 最新值是否是负数
      const isNegative  = newValue.includes('-')
      // 负号非法值匹配 检查 -数字-
      const invalidVal = newValue.match(/-/g)
      // 是否负号非法值
      const isNegativeInvalid = invalidVal && invalidVal.length === 2 && newValue.replace(/-/g, '').length // -数字-
      // 如果是负号非法值 进行处理 -数字- => 数字
      if (isNegativeInvalid) newValue = newValue.replace(/-/g, '')
      // 其它非法值进行处理
      newValue = el.formatVal(newValue)
      // 如果不是负号非法值
      if(!isNegativeInvalid){
        // 如果是负数 并且支持负号，还原值
        if (isNegative && negative) newValue = '-' + newValue
      }
      // 如果是 值 数字. 并且小数位数 是 0（整数）
      if (newValue.slice(-1) === '.' && digit === 0) {
        // 整数功能
        newValue = Number(newValue)
      }
      // 输入值超出最值 ， isReplace 为 true 就 替换，否则就还原上次输入的值
      if (max !== undefined && newValue > max) {
        newValue = isReplace ? max : String(newValue).slice(0, -1)
      } else if (min !== undefined && newValue < min) {
        newValue = isReplace ? min : String(newValue).slice(0, -1)
      } else { // 输入值未超出最值
        el.old = newValue
      }
      // 判断是否需要更新，避免进入死循环
      if (newValue !== el.value) {
        el.value = newValue
        el.dispatchEvent(new Event('input')) // 通知v-model更新
      }
    }
    // 失去焦点事件
    el.blurHander = function () {
      el.value = el.formatVal(el.value,true)
      el.dispatchEvent(new Event('input')) // 通知v-model更新
    }
    el.addEventListener('input', el.inputHandler)
    el.addEventListener('blur', el.blurHander)
  },
  unbind (el) {
    el.removeEventListener('input', el.inputHandler)
    el.removeEventListener('blur', el.blurHander)
    el.formatVal = null
  }
}
