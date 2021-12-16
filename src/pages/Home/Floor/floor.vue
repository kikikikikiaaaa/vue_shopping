<!--  -->
<template>
  <div>
    <div class="w">
      <div class="floor">
        <div class="art">
          <div class="shortcut">
            <div class="fl">{{ list.name }}</div>
            <div class="fr">
              <ul>
                <li v-for="(navlist, index) in list.navList" :key="navlist.id">
                  {{ navlist.text }}<em></em>
                </li>
              </ul>
            </div>
          </div>
          <div class="content">
            <ul>
              <li class="fir">
                <a href="" v-for="keyword in list.keywords">{{ keyword }}</a>
                <a href=""><img :src="list.imgUrl" alt="" /></a>
              </li>
              <!-- 轮播图开始 -->
              <li class="sec">
                <Carousel :list="list.carouselList" />
              </li>
              <!-- 轮播图结束 -->
              <li class="thr">
                <a href=""><img :src="list.recommendList[0]" alt="" /></a>
                <a href=""><img :src="list.recommendList[1]" alt="" /></a>
              </li>
              <li>
                <a href=""><img :src="list.bigImg" alt="" /></a>
              </li>
              <li>
                <a href=""><img :src="list.recommendList[2]" alt="" /></a>
                <a href=""><img :src="list.recommendList[3]" alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: ["list"]
};
</script>
<style  scoped>
@import "~@/css/main.css";
</style>