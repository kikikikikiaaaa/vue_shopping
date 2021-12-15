<!--  -->
<template>
  <div>    
      <div class="reg w">
        <div class="reg_top">
            <div class="fl">注册新用户</div>
            <div class="fr">我有账号,去<a href="">登录</a></div>
        </div>
        <div class="reg_cont">
            <ul>
                <li>
                    <div><label for="">手机号: &nbsp;</label><input type="text" name="" id=""><span class="error"><i class="error_icon icon"></i>手机号码格式不正确，请重新输入</span></div>
                </li>
                <li>
                    <div><label for="">短信验证码：</label><input type="text" name="" id=""><span class="succ"><i class="succ_icon icon"></i>短信验证码输入正确</span></div>
                </li>
                <li>
                    <div><label for="">登录密码：</label><input type="text" name="" id=""><span class="error"><i class="error_icon icon"></i>密码格式不正确，请重新输入</span></div>
                </li>
                <li class="safe"><span>安全程度</span>
                    <div class="qiangdu"><span class="weak">弱</span><span class="mid">中</span><span class="stro">强</span></div>
                </li>
                <li>
                    <div><label for="">确认密码：</label><input type="text" name="" id=""><span class="error"><i class="error_icon icon"></i>密码不一致，请重新输入</span></div>
                </li>
                <li class="shengming"><input type="checkbox">同意协议并注册<a href="">《知晓用户协议》</a>
                </li>
                <li>
                    <input type="submit" value="完成注册" class="btn">
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name:'regMain',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style  scoped>
@import '~@/css/register.css'
</style>