<template>
  <div>
    <el-dialog :visible.sync="flag" :close-on-click-modal="false" width="340px">
      <div style="position: relative;" :style="{width: `${o.background.x}px`, height: `${o.background.y}px`}">
        <div style="position: absolute;background-size: 100% 100%;"
             :style="{width: `${o.background.x}px`, height: `${o.background.y}px`, background: `url(${o.background.url})`}"></div>
        <div style="z-index: 2;position: absolute;background-size: 100% 100%;"
             :style="{left: `${x}px`, width: `${o.slide.x}px`, height: `${o.slide.y}px`, background: `url(${o.slide.url})`}"
             @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" @mouseout="mouseup"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import event from "../utils/event"
import axios from "axios";

export default {
  name: "Verify",
  data() {
    return {
      flag: false,
      o: {background: {}, slide: {}},
      x: 0,
      offset: 0,
      down: false
    }
  },
  mounted() {
    event.$on("VERIFY", () => {
      this.flag = true
      axios({
        url: "/get",
        data: {}
      }).then((response) => {
        console.log(response.data)
        this.o = response.data.data

        console.log("???", this.o)
      })
      this.x = 0
      this.offset = 0
      this.down = false
    })
  },
  methods: {
    mousedown(e) {
      this.down = true
      this.offset = e.x - this.x
    },
    mousemove(e) {
      if (this.down) {
        this.x = Math.min(Math.max(0, e.x - this.offset), this.o.background.x - this.o.slide.x)
      }
    },
    mouseup(e) {
      if (this.down) {
        this.down = false
        axios.post("/verify", {
          id: this.o.id,
          x: this.x
        }).then(res => {
          if (res.data.data) {
            this.flag = false
            this.$message({
              message: '验证成功',
              type: 'success'
            });
            event.$emit("VERIFY_SUCCESS", this.o.id, this.x)
          } else {
            this.$message.error('验证失败');
            this.x = 0
          }
        })
      }
    }
  }
}
</script>
