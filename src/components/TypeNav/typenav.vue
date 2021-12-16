<!--  -->
<template>
  <div>
    <nav>
      <div class="w">
        <div
          class="dropdown"
          @click="goSearch"
          @mouseenter="enterShow"
          @mouseleave="leaveShow"
        >
          <div class="dt">全部商品分类</div>
          <transition name="enter">
            <div class="dd" v-show="show">
              <div
                class="dropdownlist"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseover="changeIndex(index)"
                @mouseleave="currentIndex = -1"
              >
                <a
                  :data-CategoryName="c1.categoryName"
                  :data-classA="c1.categoryId"
                  href="#"
                  class="list"
                  >{{ c1.categoryName }}</a
                >
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-CategoryName="c2.categoryName"
                          :data-classB="c2.categoryId"
                          href="#"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId"
                          ><a
                            :data-CategoryName="c3.categoryName"
                            :data-classC="c3.categoryId"
                            href="#"
                            >{{ c3.categoryName }}</a
                          ></em
                        >
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="navitems">
          <ul>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
            <li>
              <a href="">服装城</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流函数插件
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
      routeName: "",
    };
  },
  mounted() {
    this.routeName = this.$route.name;
    if (this.routeName == "search") {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  components: {},

  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  methods: {
    // 使用了节流函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 10),
    // 带参数跳转搜索页
    goSearch(e) {
      let element = e.target;
      let { categoryname, classa, classb, classc } = element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (classa) {
          query.id = classa;
        } else if (classb) {
          query.id = classb;
        } else {
          query.id = classc;
        }
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      if (this.routeName == "search") {
        this.show = false;
      }
    },
  },
};
</script>
<style  scoped>
@import "~@/css/main.css";
</style>