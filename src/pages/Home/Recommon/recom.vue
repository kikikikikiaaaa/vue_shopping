<!--  -->
<template>
  <div>
    <div class="w">
      <div class="recom">
        <i
          ><img
            src="~@/assets/images/team_cherry_logo_main_menu-resources.assets-240.png"
            alt=""
          />
        </i>
        <ul>
          <li v-for="(imglist, index) in recomList" :key="imglist.id">
            <img :src="imglist.imgUrl" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "recom",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBannerList");
  },
  components: {},

  computed: {
    ...mapState({
      recomList: (state) => {
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