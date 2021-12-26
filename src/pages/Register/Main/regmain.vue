<!--  -->
<template>
  <div>
    <div class="reg w">
      <div class="reg_top">
        <div class="fl">注册新用户</div>
        <div class="fr">
          我有账号,去<router-link to="/login">登录</router-link>
        </div>
      </div>
      <div class="reg_cont">
        <ul>
          <li>
            <div>
              <label for="">手机号: &nbsp;</label
              ><input type="text" name="phone"  v-model="phone" @change="phoneShow=true"/>
              <span v-if="phoneShow">
              <span v-if="!phoneSucc"
                class="error"
                ><i class="error_icon icon"></i
                >手机号码格式不正确，请重新输入</span
              >
              <span v-if="phoneSucc"
                class="succ"
                ><i class="succ_icon icon"></i
                ></span
              ></span>
            </div>
          </li>
          <li>
            <div>
              <label for="">短信验证码：</label
              ><input
                type="text"
                name="code"
                v-model="code"
                @blur="isMatch"
                @change="codeShow=true"
              />
              <span v-if="codeShow" class="codetips">
              <span class="succ" v-if="codeSucc"></i>验证码正确</span>
              <span class="error" v-if="!codeSucc"></i>验证码错误</span>
              </span>
              <button class="getcode" @click="getCode">获取验证码</button>
            </div>
          </li>
          <li>
            <div>
              <label for="">登录密码：</label
              ><input type="password" name="password"  v-model="password"/><span
                class="error"
                ><i class="error_icon icon"></i>密码格式不正确，请重新输入</span
              >
            </div>
          </li>
          <li class="safe">
            <span>安全程度</span>
            <div class="qiangdu">
              <span class="weak">弱</span><span class="mid">中</span
              ><span class="stro">强</span>
            </div>
          </li>
          <li>
            <div>
              <label for="">确认密码：</label
              ><input type="password" name="password1"  v-model="password1"/><span class="error"
                ><i class="error_icon icon"></i>密码不一致，请重新输入</span
              >
            </div>
          </li>
          <li class="shengming">
            <input type="checkbox" :checked="isagree"/>同意协议并注册<a href=""
              >《知晓用户协议》</a
            >
          </li>
          <li>
           <input type="submit" value="完成注册" class="btn" @click="userRegister"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "regMain",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password1: "",
      isagree: true,
      phoneSucc: false,
      phoneShow: false,
      codeShow: false,
      codeSucc: false,
    };
  },

  components: {},

  computed: {},

  methods: {
    async getCode() {
      try {
        const { phone } = this;
        phone && (await this.$store.dispatch("getCode", phone));
        console.log(this.$store.state.user.code);
      } catch (error) {
        console.log(error);
      }
    },
    isMatch() {
      let sucode = this.$store.state.user.code;
      if (sucode != "") {
        if (this.code == sucode) {
          this.codeSucc = true;
        } else {
          this.codeSucc = false;
        }
      }
    },
    async userRegister() {
      try {
        const { phone, code, password, password1 } = this;
        if (phone && code && password == password1) {
          await this.$store.dispatch("userRegister", { phone, code, password });
          this.$router.push({ path: "/login", query: { phone: phone } });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style  scoped>
@import "~@/css/register.css";
</style>