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
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
import {Decrypt, Encrypt} from "@/common/AES.js";
import AESECB from "@/common/AESECB";

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

          //流程RSA随机生成公钥和私钥 前端公钥，后端拿着私钥 ，然后前端生产的AES的秘钥
          // 在RSA加密传给后端 后端获取RSA加密后AES 解密 进行解析
          // //实现RSA
          // let encryptor = new JSEncrypt() // 新建JSEncrypt对象
          //
          // //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
          // let publicKey = _this.$store.getters.getPublicKey
          //
          // //RSA设置加密的方式
          // encryptor.setPublicKey(publicKey) // 设置公钥
          //通过RSA加密AES
          // let encrypt = encryptor.encrypt(_this.$store.getters.getAESKey);
          //使用AES加密后的
          // let rsaUsername = AESECB.Encrypt(_this.ruleForm.username)
          // let rsaPassWord = AESECB.Encrypt(_this.ruleForm.password)
          // let rsaUsername = encryptor.encrypt(_this.ruleForm.username) // 对需要加密的数据进行加密
          // let rsaPassWord = encryptor.encrypt(_this.ruleForm.password) // 对需要加密的数据进行加密


          //随机给AES设置值
          _this.$store.commit("SET_AESKey", _this.randomPassword(16))

          // alert(_this.$store.getters.getAESKey)

          //使用ASE加密固定密匙加密 后端解密模式
          _this.$axios.post("/login2", {
            username: _this.ruleForm.username,
            password: _this.ruleForm.password,
          }).then(res => {

            // console.log(res.data.data)
            // console.log(res)
            //获取token
            const token = res.headers.authorization

            // console.log("我是获取头部中的token--", token)

            //获取data数据
            const userInfo = res.data.data.user

            //把值存入store共享信息
            _this.$store.commit("SET_TOKEN", token)
            _this.$store.commit("SET_USERINFO", userInfo)

            // // 获取
            // console.log("获取存入的用户信息", _this.$store.getters.getUser.user.username)
            // console.log('获取本地的存入的token', localStorage.getItem('token'));

            //登录成功就跳转
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

    //根据长度随机生成key
    randomPassword(length) {
      length = Number(length)
      // Limit length
      if (length < 6) {
        length = 6
      } else if (length > 16) {
        length = 16
      }
      // let passwordArray = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '1234567890', '!@#$%&*.'];
      let passwordArray = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '1234567890', 'tangjinw'];
      const password = [];
      let n = 0;
      for (let i = 0; i < length; i++) {
        // 如果密码长度小于 9，则所有值随机
        if (password.length < (length - 4)) {
          // 获取随机密码数组索引
          let arrayRandom = Math.floor(Math.random() * 4);
          // 获取密码数组值
          let passwordItem = passwordArray[arrayRandom];
          //获取密码数组值随机索引
          // 获取随机真实值
          let item = passwordItem[Math.floor(Math.random() * passwordItem.length)];
          password.push(item);
        } else {
          // 如果密码大于9，则根据随机密码索引推入最后4个密码
          // 按顺序获取数组值
          let newItem = passwordArray[n];
          let lastItem = newItem[Math.floor(Math.random() * newItem.length)];
          // 获取数组拼接索引
          let spliceIndex = Math.floor(Math.random() * password.length);
          password.splice(spliceIndex, 0, lastItem);
          n++
        }
      }
      return password.join("");
    }

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
