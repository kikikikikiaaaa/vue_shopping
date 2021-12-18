<!--  -->
<template>
  <div>
    <section class="shortcut">
      <div class="w">
        <ul class="fl">
          <li>品优购欢迎您！&nbsp;</li>
          <li>
            <router-link to="/login">请登录&nbsp;</router-link>
            <router-link to="/register" class="color_red">免费注册</router-link>
          </li>
        </ul>
        <ul class="fr headfr">
          <li>我的订单</li>
          <li></li>
          <li class="arrow_icon iconfont">我的品优购</li>
          <li></li>
          <li>品优购会员</li>
          <li></li>
          <li>企业采购</li>
          <li></li>
          <li class="arrow_icon">关注品优购</li>
          <li></li>
          <li class="arrow_icon">客户服务</li>
          <li></li>
          <li class="arrow_icon">网站导航</li>
        </ul>
      </div>
    </section>

    <header class="header w" style="border-bottom: 0">
      <div class="logo">
        <h1>
          <router-link to="/home">
            <a href="index.html" title="品优购商城">品优购商城</a></router-link
          >
        </h1>
      </div>
      <div>
        <div class="search">
          <input
            type="text"
            name=""
            id=""
            placeholder="搜索内容"
            @keyup.enter="goSearch"
            v-model="keyword"
          />
          <button @click="goSearch">搜索</button>
        </div>
        <div class="hotwords">
          <a href="">优惠购首发</a>
          <a href="">亿元优惠</a>
          <a href="">亿元优惠</a>
          <a href="">亿元优惠</a>
          <a href="">亿元优惠</a>
          <a href="">亿元优惠</a>
          <a href="">亿元优惠</a>
        </div>
      </div>
      <div class="shopcar">我的购物车<i>8</i></div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    goSearch() {
      // 第一种方法：字符串
      // this.$router.push('/search/'+this.keyword+'?k='+this.keyword)

      // 第二种方法：模板字符串
      // 有点问题，原因不明
      // this.$router.push('/search/${this.keyword}?k=${this.keyword}')

      // 第三种方法：对象
      let query={}
      if (this.$route.query) {
        query = this.$route.query;
      }
      this.$router.push({
        name: "search",
        params: { keyword: this.keyword || undefined },
        query,
      });
    },
  },
  mounted(){
    this.$bus.$on('clear',()=>{
      this.keyword=''
    })
  }
};
</script>
<style  scoped>
@import "~@/css/common.css";
@import "~@/css/main.css";
</style>