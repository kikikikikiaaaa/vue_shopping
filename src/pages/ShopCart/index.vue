<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">属性</div>
        <div class="cart-th4">单价（元）</div>
        <div class="cart-th5">数量</div>
        <div class="cart-th6">小计（元）</div>
        <div class="cart-th7">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="updateChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler(cartInfo, -1, cartInfo.skuNum)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler(cartInfo, 0, $event.target.value)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler(cartInfo, 1, cartInfo.skuNum)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.cartPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="removeCart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length>0"
          @click="allChecked"
        />
        <span> 全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedById">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }} </span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let total = 0;
      this.cartInfoList.forEach((e) => {
        if (e.isChecked == 1) total += e.skuPrice * e.skuNum;
      });
      return total;
    },
    totalNum() {
      let total = 0;
      this.cartInfoList.forEach((e) => {
        if (e.isChecked == 1) total++;
      });
      return total;
    },
    isAllChecked() {
      return this.cartInfoList.every((e) => e.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    //修改全部商品的状态
    async allChecked(event) {
      let flag = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("updateAllChecked", flag);
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error);
      }
    },
    removeCart: throttle(async function (id) {
      try {
        await this.$store.dispatch("deleteCartById", id);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }, 10),
    async deleteAllCheckedById() {
      try {
        await this.$store.dispatch("deleteAllCheckedById");
        //删除成功，刷新数据
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error);
      }
    },
    async updateChecked(cartInfo, event) {
      try {
        let checked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cartInfo.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    // 防抖函数
    debounce: function (func, wait = 0) {
      if (typeof func !== "function") {
        throw new TypeError("need a function arguments");
      }
      let timeid = null;
      let result;
      return function () {
        let context = this;
        let args = arguments;
        if (timeid) {
          clearTimeout(timeid);
        }
        timeid = setTimeout(function () {
          result = func.apply(context, args);
        }, wait);
        return result;
      };
    },
    async handler(cart, type, currentNum) {
      let changeNum = 0;
      switch (type) {
        case 1:
          changeNum = 1;
          cart.skuNum++;
          break;
        case -1:
          currentNum > 1 ? (changeNum = -1) : (changeNum = 0);
          currentNum > 1 ? cart.skuNum-- : (cart.skuNum = 1);
          break;
        case 0:
          console.log(currentNum);
          if (isNaN(currentNum * 1) || currentNum <= 0) {
            changeNum = 0;
          } else {
            changeNum = parseInt(currentNum) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: changeNum,
        });
        // 如果+/-，防抖
        if (type == 1 || type == -1) {
          this.debounce(this.getData, 2000);
        } else {
          this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 12.5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6,
      .cart-th7 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 36px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>