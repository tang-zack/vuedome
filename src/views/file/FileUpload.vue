<template>
  <div>
    <el-upload
        action="http://localhost:8081/upload"
        :on-preview="handlePreview"
        :limit="10"
        accept=".pdf">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传.pdf，且不超过200MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  methods: {
    //回显
    handlePreview(file) {
      //服务端返回的JSON
      window.open(file.response.data.url)
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
