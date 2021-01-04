<template>
  <view>
    <view class="upload-image-view">
      <!-- 标题已经省略 -->
      <!-- <view class='title'>上传xxxx图片</view> -->
      <template v-if="attIdList.length">
        <block v-for="attid in attIdList" :key="attid">
          <view class="image-view">
            <image
              :src="BASEURL + '/att/view/' + attid + '?sign=2'"
              :data-src="BASEURL + '/att/view/' + attid + '?sign=2'"
              @tap="previewImage"
            ></image>
          </view>
        </block>
      </template>
      <block v-for="(image, index) in imageList" :key="index">
        <view class="image-view">
          <image :src="image" :data-src="image" @tap="previewImage"></image>
          <view
            v-if="!viewModel"
            class="del-btn"
            :data-index="index"
            @tap="deleteImage"
          >
            <view class="baicha"></view>
          </view>
        </view>
      </block>
      <view
        class="add-view"
        v-if="imageList.length < imageLength && !viewModel"
        @tap="chooseImage"
      >
        <!-- 十字架 -->
        <view class="cross">
          <view class="transverse-line"></view>
          <view class="vertical-line"></view>
        </view>
      </view>
      <!-- <view class='info'>不超过{{imageLength}}个。</view> -->
    </view>
  </view>
</template>
<script>
import { BASEURL } from "@/common/utils.js";
export default {
  name: "file-upload",
  props: {
    imageLength: Number,
    type: String,
    viewModel: {
      type: Boolean,
      default: false,
    },
    attId: {
      type: String,
      default: "",
    },
	uploadFileUrl:{
		type:String,
		default: "",
	}
  },

  data() {
    return {
      BASEURL: BASEURL,
      imageList: [],
      atts: [],
    };
  },
  computed: {
    attIdList() {
      if (this.attId) {
        return this.attId.split(",");
      } else {
        return [];
      }
    },
  },
  methods: {
    chooseImage: async function () {
      var _this = this;
      uni.chooseImage({
        sourceType: ["camera", "album"],
        // #ifdef MP-WEIXIN
        sizeType: ["compressed", "original"],
        // #endif
        count: this.imageLength - this.imageList.length,
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
          let tempFilePaths = res.tempFilePaths;
          console.log("uni.chooseImage", res);
          for (var i = 0; i < tempFilePaths.length; i++) {
            uni.showLoading({
              title: "图片上传中…",
              mask: true,
            });
            uni.uploadFile({
              url: _this.uploadFileUrl,
              filePath: tempFilePaths[i],
              name: "file",
			   header:{
				 "Content-Type": "multipart/form-data",
				 "Cookie":uni.getStorageSync('cookie')
			   },
              formData: {
                type: _this.type,
                // fileName:
				
              },
              method: "POST",
              success: function (uploadFileRes) {
                console.log(uploadFileRes);
                var data = JSON.parse(uploadFileRes.data);
                _this.atts.push(data.result);

                //if (_this.atts.length == tempFilePaths.length) {

                _this.$emit("sendAtts", _this.atts);
                uni.hideLoading();
                //}
              },
            });
          }
        },
      });
    },

    //预览图片
    previewImage: function (e) {
      var current = e.target.dataset.src;
      uni.previewImage({
        current: current,
        urls: this.imageList,
      });
    },
    //删除图片
    deleteImage: function (e) {
      var index = e.target.dataset.index;
      var that = this;
      var images = that.imageList;
      images.splice(index, 1);
      that.imageList = images;
      //附件材料Id
      var arrImg = that.atts;
      arrImg.splice(index, 1);
      that.atts = arrImg;
      that.$emit("sendAtts", that.atts);
    },
  },
};
</script>

<style>
@import "/common/css/upload-imgs.css";
</style>
