<template>
  <div class="m-content">
    <h3>欢迎来到唐总大大的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }} 欢迎您回家~</div>
    </div>


    <div class="maction">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="primary" href="/login3">登录</el-link></span>

      <span v-show="hasLogin"><el-link type="primary" @click="Personal()">个人中心</el-link></span>

      <el-divider direction="vertical"></el-divider>

      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>

    </div>

    <!--新增对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">

        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="editForm.username" autocomplete="off" disabled="disabled"></el-input>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">
          <el-input type="avatar" v-model="editForm.avatar" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input type="phone" v-model="editForm.phone" autocomplete="off" maxlength="11"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false,

      //新增窗口是否显示
      dialogVisible: false,

      //表单数据
      editForm: {},

      //表单校验
      editFormRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    //加载图片
    handleAvatarSuccess(res) {
      this.entity = JSON.parse(JSON.stringify(this.user))
      this.entity.avatar = res.data
      this.save()
    },

    //打开个人中心
    Personal() {
      this.dialogVisible = true
      //从$store中取值
      this.editForm = this.$store.getters.getUser
    },

    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //对话框
      this.dialogVisible = false
      this.editForm = {}
    },
    //关闭的时候
    handleClose() {
      this.resetForm('editForm')
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/update', this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push('/blogs')
                  }
                });

                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //退出
    logout() {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          //获取token
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")

        _this.$router.push("/login3")
      }).catch(function (error) {
        //如果Token过期就就跳回登录页面
        _this.$router.push("/login3")
      })
    }
  },
  created() {

    console.log("--我是header.vue里面的--", this.$store.getters.getUser)
    console.log(this.$store.getters.getUser.username)

    //从储存里面获取之前存入的用户信息
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

      this.hasLogin = true
    }

  }
}
</script>

<style scoped>

/*设置居中*/
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.maction {
  margin: 10px 0;
}

</style>
