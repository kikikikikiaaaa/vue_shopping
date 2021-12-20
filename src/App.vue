<!--  -->
<template>
  <div>
    <Header />
    <router-view />
    <!-- 只在首页和搜索页显示Footer
      <Footer v-show="$route.path=='/home'||$route.path=='/search'"/> 
    -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "@/components/Header/header.vue";
import Footer from "@/components/Footer/footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action，获取商品分类三级列表数据
    this.$store.dispatch("getCategoryList");
  },
};
</script>
<style  scoped>
@import '~@/css/base.css'
</style>