<template>
  <div>
    <el-container>
      <el-header>
        <img class="mlogo" src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png">
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '111111',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          //实现RSA
          let encryptor = new JSEncrypt() // 新建JSEncrypt对象

          //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
          let publicKey = _this.$store.getters.getPublicKey

          encryptor.setPublicKey(publicKey) // 设置公钥

          let rsaUsername = encryptor.encrypt(_this.ruleForm.username) // 对需要加密的数据进行加密
          let rsaPassWord = encryptor.encrypt(_this.ruleForm.password) // 对需要加密的数据进行加密


          //预存不能就会调用axios里面的信息
          axios.post("/login", {
            username: rsaUsername,
            password: rsaPassWord
          }).then(res => {

            console.log(res.data.data)

            // //获取token
            // const jwt = res.headers['authorization']
            // //获取data数据
            // const userInfo = res.data.data
            //
            // //把值存入store共享信息
            // _this.$store.commit("SET_TOKEN", jwt)
            // _this.$store.commit("SET_USERINFO", userInfo)
            //
            // // 获取
            // console.log(_this.$store.getters.getUser)
            //
            // //登录成功就跳转
            // _this.$router.push("/blogs")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.mlogo {
  height: 60%;
  margin-top: 10px;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}

</style>
