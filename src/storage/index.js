
// Storage封装
// eslint-disable-next-line camelcase
const StORAGE_KEY = 'mall'
export default {
  // 存储值
  // eslint-disable-next-line camelcase
  setItem (key, value, module_name) {
    // eslint-disable-next-line camelcase
    if (module_name) {
      let val = this.getItem(module_name)
      val[key] = value
      this.setItem(module_name, val)
    } else {
      let val = this.getStorage()
      val[key] = value
      window.sessionStorage.getItem(StORAGE_KEY)
    }
  },
  // 获取某一个模块下面的属性user下面的userName
  // eslint-disable-next-line camelcase
  getItem (key, module_name) {
    // eslint-disable-next-line camelcase
    if (module_name) {
      let val = this.getItem()
      if (val) return val[key]
    }
    return this.getStorage()[key]
  },
  getStorage () {
    JSON.parse(window.sessionStorage.getItem(StORAGE_KEY))
  },
  // eslint-disable-next-line camelcase
  clear (key, module_name) {
    let val = this.getStorage()
    // eslint-disable-next-line camelcase
    if (module_name) {
      delete val[module_name][key]
    } else {
      delete val[key]
    }
    this.setItem(val)
  }
}
