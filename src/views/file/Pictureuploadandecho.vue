<template>
  <div>
    <!-- 选择图片后展示 -->
    <img :src="f.src" width="100px" height="100px" v-if="f"/>
    <!-- 选择图片之前展示 -->
    <img src="https://p.qqan.com/up/2021-6/16243262759185881.jpg" @click="add()" width="100px" height="100px" v-else/>
    <input
        class="value"
        style="display:none"
        type="file"
        ref="file"
        accept="image/*"
        multiple="multiple"
        @change="getFile($event)"
    />
    <el-button size="small" type="primary" @click="submitForm($event)">点击上传</el-button>

    <img :src="loadImage" width="100px" height="100px"/>
  </div>
</template>


<script>
//
export default {
  name: "Pictureuploadandecho",
  props: {},
  data() {
    return {
      file: null,
      f: null,
      loadImage: ""
    };
  },
  methods: {
    add() {
      this.$refs.file.click();
    },
    getFile(event) {
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },

    submitForm(event) {
      const _this = this
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      _this.$axios.post("/pictureUpload", formData,config).then(res => {
        console.log(res);
        // if (res.status === 200) {
        //   try {
        //     console.log(".../getImage/" + res.data);
        //     if (typeof this.loadImage !== "undefined") {
        //       this.loadImage = res.data;
        //     }
        //   } catch (e) {
        //     console.log("捕获到异常：", e);
        //   }
        // } else {
        //   console.log("失败" + 400);
        // }
      });
    }
  }
}
</script>

<style scoped>

</style>
