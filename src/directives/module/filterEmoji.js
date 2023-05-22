// 过滤表情
export default {
  bind(el) {
    // 兼容写法
    if (!['TEXTAREA','INPUT'].includes(el.tagName)) el = el.querySelector('textarea') || el.querySelector('input')
    el.reg = /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g
    el.old = ''
    el.pass = ()=>{
      if(el.reg.test(el.value)) {
        el.value = el.value.replace(el.reg,'')
        el.dispatchEvent(new Event('input'))
      } else {
        el.old = el.value
      }
    }
    el.compositionend = el.pass
    el.input = el.pass

    // 绑定事件
    el.addEventListener('compositionend', el.compositionend)
    el.addEventListener('input', el.input)
  },
  unbind (el) {
    el.removeEventListener('compositionend', el.compositionend)
    el.removeEventListener('input', el.input)
    el.pass = el.reg = null
  }
}
