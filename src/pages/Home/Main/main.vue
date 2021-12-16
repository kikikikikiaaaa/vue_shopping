<!--  -->
<template>
  <div>
    <div class="w">
      <div class="main">
        <div class="focus">
          <Carousel :list="bannerList" />
        </div>
        <News />
        <LifeService />
        <div class="sale_img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import News from "./news.vue";
import LifeService from "./lifeservice.vue";

export default {
  name: "",
  data() {
    return {};
  },

  components: {  News, LifeService },
  mounted() {
    this.$store.dispatch("getBannerList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => {
        return state.home.bannerList;
      },
    }),
  },

  methods: {},
};
</script>
<style  scoped>
@import "~@/css/main.css";
</style>