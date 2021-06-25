<template>
  <div>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-row :span="24">
            <el-col :span="12">
              <el-input v-model="ruleForm.code" auto-complete="off" placeholder="请输入验证码" size=""
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="login-code">
                <!--验证码组件-->
                <el-button @click="getCode()" :class="{'disabled-style':getCodeBtnDisable}"
                           :disabled="getCodeBtnDisable">{{ codeBtnWord }}
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <!--滑动验证组件-->
        <Verify></Verify>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>

    </el-main>

  </div>
</template>

<script>

import Verify from "@/components/Verify";
import event from "../utils/event"

let params;
let par;
export default {
  name: "LoginIphone",
  components: {Verify},
  data() {
    return {
      stepMap: 0,
      ruleForm: {
        phone: '18723477218',
        code: '',
        yz: '',
        // params: {}

      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      // 校验
      rules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证密码', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get() {
        if (this.waitTime === 61) {
          if (this.ruleForm.phone) {
            return false
          }
          return true
        }
        return true
      }
    }, set() {
    }
  }, methods: {

    getCode() {
      const _this = this
      params = {}
      params.phone = this.ruleForm.phone
      // 调用获取短信验证码接口
      _this.$axios.post('/sendMessage', params).then(res => {
        console.log("--------查看后台响应的值-----", res)
        //把所有的数据存在
        par = res
        console.log("--=--", par)

        const mydata = res.data.data
        console.log("我在短信接口这利-->", mydata)

        //保存验证码
        params.yz = mydata.vCode

        console.log("我是查看验证码-------" + mydata.vCode)

        if (res.data.code === 200) {
          this.$message({
            message: '验证码已发送，请稍候...',
            type: 'success',
            center: true
          })
        }
        //调用滑块验证的组件
        event.$emit("VERIFY")
      }).catch(e => {//错误信息
        // //调用滑块验证的组件
        // event.$emit("VERIFY")

      })

      // 因为下面用到了定时器，需要保存this指向
      let that = this
      that.waitTime--
      that.getCodeBtnDisable = true
      this.codeBtnWord = `${this.waitTime}s 后重新获取`
      let timer = setInterval(function () {
        if (that.waitTime > 1) {
          that.waitTime--
          that.codeBtnWord = `${that.waitTime}s 后重新获取`
        } else {
          clearInterval(timer)
          that.codeBtnWord = '获取验证码'
          that.getCodeBtnDisable = false
          that.waitTime = 61
        }
      }, 1000)
    },
    submitForm(formName) {
      const _this = this
      //判断输入的验证码是否相等
      if (params.yz == this.ruleForm.code) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("我是提交里面的：", par)

            const jwt = par.headers['authorization']
            console.log("我是token->", jwt)
            const userInfo = par.data.data
            console.log("查看用户信息=", userInfo)

            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)

            // 获取
            console.log("我是获取的_this.$store.getters.getUser")
            console.log(_this.$store.getters.getUser)

            _this.$router.push("/blogs")

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: '验证输入错误',
          type: 'error'
        });
      }
    }

  }

}
</script>

<style scoped>
.el-button.disabled-style {
  background-color: #EEEEEE;
  color: #CCCCCC;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>
