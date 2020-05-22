<template>
    <div class="footer">
      <div class="footer-logo">
        <img src="../../static/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
      </div>
      <div class="footer-link">
        <a href="https://github.com/ace86lcn" target="_blank">ace86lcn主页</a><span>|</span>
        <a href="https://github.com/ace86lcn/travel" target="_blank">travel旅游App</a><span>|</span>
        <a href="https://github.com/ace86lcn/ShanxiEPM" target="_blank">工程项目</a><span>|</span>
        <a href="https://github.com/ace86lcn/botuweb" target="_blank">vue项目</a>
      </div>
      <div class="copyright">Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
    </div>
</template>
<script>
export default {
  name: 'NavFooter'
}
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>
