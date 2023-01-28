<template>
  <div class="wrap flex" >
    <div style="height: 100%; margin: 0 auto; position: relative;" >
      <img
        src="~@/assets/videoimg.jpg"
        alt=""
        srcset=""
        height="100%"
        width="auto"
        style="height: 100%; margin: 0 auto;"
        ref="kjt"
      />
      <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0" >
        <div class="no-video" v-if="!url">暂无视频</div>
      </div>
    </div>
      <LivePlayer
        ref="myvideo"
        :controls="false"
        @snapOutside="snapOutside"
        hide-snapshot-button
        :videoUrl="url"
        aspect='fullscreen'
        live
        muted
        v-if="url"
      ></LivePlayer>
      <div class="bottom-tool">
        <span class="btn" @click="toggleFullscreenv"><a-icon type="fullscreen"></a-icon>全屏</span>
        <span class="btn" @click="snap"><a-icon type="chrome" />截屏</span>
    </div>
    


  </div>
</template>
<script>

import moment from "moment";
import { Empty, message } from "ant-design-vue";
import LivePlayer from "@liveqing/liveplayer";
export default {
  props: {
 
    index: {
      type: Number,
      default: -1,
    },
    url: {
      type: String,
      default: "http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8",
    }
  },
  components: {
    LivePlayer,
  },

  data () {
    return {

    };
  },
  mounted () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  methods: {
    moment,
    snap () {
      if (!this.url) {
        return this.$message.error("未选择视频源");
      }
      this.$refs.myvideo.snap()
    },
    snapOutside (e) {
      this.download(e)
    },
    download (imgData) {
      this.downloadFile(`${this.name}-截屏.png`, imgData);
    },
    //下载
    downloadFile (fileName, content) {
      let aLink = document.createElement('a');
      let blob = this.base64ToBlob(content); //new Blob([content]);

      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);

      // aLink.dispatchEvent(evt);
      aLink.click()
    },
    //base64转blob
    base64ToBlob (code) {
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    toggleFullscreenv () { //切换全屏
      if (!this.url) {
        return this.$message.error("未选择视频源");
      }
      this.$refs.myvideo.toggleFullscreen()
    },
    handleData (time) {
      if (!time) {
        return false;
      } else {
        return time > moment();
      }
    },
    showModal () { },

    closeCotr () {
      this.showCotr = false;
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  background: #000;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  &:hover {
    .bottom-tool {
      display: flex;
    }
  }
}
.no-video {
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  padding: 10px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fafafa;

  &:hover {
    background: #f2f3f8;
  }

  &.active {
    background: #f2f3f8;
  }

  .name {
    margin-left: 10px;
  }

  p {
    line-height: 1em;
    font-size: 12px;
    margin-bottom: 4px;
  }
}
.bottom-tool {
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  align-items: center;
}
.control {
  margin: 0 auto;
  width: 150px;
}
.setting-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .setting-item {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #f4f4f4;
    border-radius: 4px;
    width: 100%;
  }
}
.btn {
  padding: 14px 10px;
  color: #fff;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #3e466d;
  }
}
</style>