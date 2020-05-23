import Vue from 'vue'
import Vuex from 'Vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)
const state = {
  username: '', // 登录名
  cartCount: '' // 购物车商品数量
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
