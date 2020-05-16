<template>
    <div>
      <order-header></order-header>
      aliPay
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
export default {
  name: 'aliPay',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>
<style >

</style>
