<template>
  <div>
    <img :src="src1" style="width: 300px;height: 150px" alt="抠图">
    <img :src="src2" alt="带抠图阴影的原图">
    <!--    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">-->
    <!--      <el-form-item label="验证码" prop="code" style="width: 380px;">-->
    <!--        <el-input v-model="loginForm.code" style="width: 172px; float: left" maxlength="5"></el-input>-->
    <!--        <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <el-row>
      <el-button @click="verification()">验证</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Verify1",
  data() {
    return {
      loginForm: {
        code: '1'
      },
      src1: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      src2: '',
      captchaImg: null,
    }

  }, methods: {
    //获取验证码
    // getCaptcha() {
    //   axios.get("/get").then(res => {
    //
    //     console.log("获取验证码=", res.data)
    //
    //     //接收验证码
    //     this.captchaImg = res.data.data.captchaImg
    //     this.loginForm.code = ''
    //   })
    // },
    verification() {
      axios.get("/get").then(res => {
        console.log("????", res.data)
        this.captchaImg = res.data.data.background.url
        this.src1 = res.data.data.background.url
        this.src2 = res.data.data.slide.url

      })
    },
    // drawBlock(ctx, xy = {x: 254, y: 109, r: 9}, type) {
    //   let x = xy.x,
    //       y = xy.y,
    //       r = xy.r,
    //       w = 40;
    //   let PI = Math.PI;
    //   //绘制
    //   ctx.beginPath();
    //   //left
    //   ctx.moveTo(x, y);
    //   //top
    //   ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
    //   ctx.lineTo(x + w + 5, y);
    //   //right
    //   ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
    //   ctx.lineTo(x + w + 5, y + w);
    //   //bottom
    //   ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
    //   ctx.lineTo(x, y + w);
    //   ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
    //   ctx.lineTo(x, y);
    //   //修饰，没有会看不出效果
    //   ctx.lineWidth = 1;
    //   ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    //   ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    //   ctx.stroke();
    //   ctx[type]();
    //   ctx.globalCompositeOperation = "xor";
    // },
    // //鼠标按下
    // drag(e) {
    //   console.log("鼠标按下", e);
    //   let dom = e.target; //dom元素
    //   let slider = document.querySelector("#sliderBlock"); //滑块dom
    //   const downCoordinate = {x: e.x, y: e.y};
    //
    //   //正确的滑块数据
    //   let checkx = Number(this.slider.mx) - Number(this.slider.bx);
    //   //x轴数据
    //   let x = 0;
    //   const move = moveEV => {
    //     x = moveEV.x - downCoordinate.x;
    //     //y = moveEV.y - downCoordinate.y;
    //     if (x >= 251 || x <= 0) return false;
    //     dom.style.left = x + "px";
    //     //dom.style.top = y + "px";
    //     slider.style.left = x + "px";
    //   };
    //
    //   const up = () => {
    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //     dom.style.left = "";
    //
    //     console.log(x, checkx);
    //     let max = checkx - 5;
    //     let min = checkx - 10;
    //     //允许正负误差1
    //     if ((max >= x && x >= min) || x === checkx) {
    //       console.log("滑动解锁成功");
    //       this.puzzle = true;
    //       this.tips = "验证成功";
    //       setTimeout(() => {
    //         this.visible = false;
    //       }, 500);
    //     } else {
    //       console.log("拼图位置不正确");
    //       this.tips = "验证失败，请重试";
    //       this.puzzle = false;
    //       this.canvasInit();
    //     }
    //   };
    //
    //   document.addEventListener("mousemove", move);
    //   document.addEventListener("mouseup", up);
    // }


  }, created() {

  }
}
</script>

<style scoped>
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}

</style>
