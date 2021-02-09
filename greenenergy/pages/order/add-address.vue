<template>
	<view>
		<view style="width: 100%;height: 40upx;"></view>
		<view class="address">
			<view class="address-view" >
			  <view class="address-view-left"> 联系人 </view>
			  <view class="address-view-right" >
				  <input v-model="model.fullName" style="line-height: 100upx;height: 100upx;" placeholder="请输入联系人" />	
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 性别 </view>
			  <view class="address-view-right">
			 <!--   <radio-group @change="radioChange" style="display: flex;">
						<label  style="display: flex;padding-right: 30upx;" v-for="(item, index) in items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="item.value == model.sex" />
							</view>
							<view>{{item.name}}</view>
						</label>
			     </radio-group> -->
				
			   <view class="picker_comment">
				 <view class="attr_value" v-for="(item, index) in items" :key="item.value">
				  <!-- <radio :value="item.value" :checked="item.value == model.sex"/> -->
				   <label class='radio_label' :class="[item.value == model.sex?'current':'']" @click="changeSex(item.value)" >{{item.name}}</label>
				 </view>
			   </view>
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 电话 </view>
			  <view class="address-view-right">
			    <input v-model="model.telphone" style="line-height: 100upx;height: 100upx;" placeholder="请输入电话" />	
			  </view>
			</view>
			<view class="address-view"  style="height: 180upx;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;"> 定位地址 </view>
			  <view class="address-view-right"  style="height: 180upx; display: flex;
    align-items: center;
    vertical-align: center; "  @click="onChangeAddress()">
				  <view style="line-height: normal;" >{{model.locationAddress}}</view>
				  <view style="line-height: normal;position: absolute;right: 60upx;" v-if="model.locationAddress=='请选择地址'">
					  <uni-icons type="location-filled" color="#31b977" size="24"></uni-icons>
				  </view>
			    <!-- <input v-model="model.address" style="line-height: 180upx;height: 180upx;" />	 -->
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 详细地址 </view>
			  <view class="address-view-right">
			    <input v-model="model.addressDetail" style="line-height: 100upx;height: 100upx;" placeholder="例:XX号XX栋/XX门店" />	
			  </view>
			</view>
			<!-- <view class="address-view" >
			  <view class="address-view-left"> 用户类型 </view>
			  <view class="address-view-right">
				  <span>商铺</span> <span>住宅</span> <span>写字楼</span>
			  </view>
			</view> -->
		</view>
		<view class="btn" >
			<button type="primary" style="background-color: #31b977;" @click="addUserAddress()">保存地址</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {
		reverseGeocoder,
		getLocation
	} from '@/common/qqmap-util.js'
	import {addUserAddress,updateUserAddress} from"@/api/index.js"
	export default {
		components:{
			uniIcons
		},
		data() {
			return {
				model:{
					fullName:"",
					telphone:"",
					sex:1,
					longitude:"",
					latitude:"",
					locationAddress:"请选择地址",//地图定位获得的地址
					addressDetail:"",//手动填写的地址
					districtCode:""
				},
				items:[{value:1,name:"先生",checked: 'true'},{value:2,name:"女士"}]
			}
		},
		onLoad(e){
			if(e.item!=""){
				this.model=JSON.parse(e.item) 
			}
		},
		methods: {
			changeSex(val){
				this.model.sex=val
			},
			onChangeAddress(){
				 let self = this;
				  uni.chooseLocation({
				  success: function(res) {
					
					self.model.locationAddress=res.name
					self.model.latitude= res.latitude
					self.model.longitude= res.longitude
					const {
						longitude,
						latitude
					} = res
					self.getLocationInfo({
						longitude,
						latitude
					})
				 },
				 fail: function(err) {
		            console.log(err)
				}
			  });
			},

			addUserAddress(){
			    let data=this.model
				if(data.id&&data.id!=""){
					this.updateUserAddress();
				}else{
					if(this.model.fullName==""){
						this.$api.msg("联系人不能为空");
						return false
					}
					if(this.model.telphone==""){
						this.$api.msg("电话不能为空");
						return false
					}
					if(this.model.locationAddress==""){
						this.$api.msg("定位地址不能为空");
						return false
					}
					
					if(this.model.addressDetail==""){
						this.$api.msg("详细地址不能为空");
						return false
					}
					
					addUserAddress(data).then(res=>{
						if(res.returnCode=="2"){
							this.$api.msg("保存成功");
							uni.navigateBack({
								delta:1
							})
						}else{
							this.$api.msg(res.description)
						}
					})
				}
				
			},
			updateUserAddress(){
			    let data=this.model
				if(this.model.fullName==""){
					this.$api.msg("联系人不能为空");
					return false
				}
				if(this.model.telphone==""){
					this.$api.msg("电话不能为空");
					return false
				}
				if(this.model.locationAddress==""){
					this.$api.msg("定位地址不能为空");
					return false
				}
				
				if(this.model.addressDetail==""){
					this.$api.msg("备注地址不能为空");
					return false
				}
				updateUserAddress(data).then(res=>{
					if(res.returnCode=="2"){
						this.$api.msg("保存成功");
						uni.navigateBack({
							delta:1
						})
					}else{
						this.$api.msg(res.description)
					}
				})
			},
			getLocationInfo(location) {
				let self=this;
				reverseGeocoder(location).then(res => {
						console.log('当前位置信息：', res)
						if(res.result){
							self.model.districtCode=res.result.ad_info.adcode
						}
						
					}).catch(err => {
						
					})
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #FFFFFF;
	}
	
@import "@/components/iview/mixin.scss";
.address{
	
	&-view {
	  height: 100upx;
	  line-height: 100upx;
	  padding-left: 30upx;
	  padding-right: 30upx;
	  display: flex;
	  
	  position: relative;
	  &::after {
	    @include hairline();
	    border-bottom-width: 1px;
	    border-bottom-color: #d8d8d8;
	    top: 0upx;
	    left: 30upx;
	  }
	  &-left {
	    line-height: 100upx;
	    font-size: 28upx;
	    font-weight: 400;
	    
		flex:1;
	
	    &.isrequired {
	      position: relative;
	      padding-right: 16upx;
	
	      &::before {
	        content: "*";
	        display: inline-block;
	        line-height: 100upx;
	        position: absolute;
	        right: 0px;
	        color: #d0021b;
	      }
	    }
	  }
	
	  &-right {
	    line-height: 100upx;
	    position: relative;
	    padding-right: 20upx;
	    font-size: 28upx;
		color: #BABABA;
		flex:2;
	
	    &.nodata {
	      color: rgba(153, 153, 153, 1);
	    }
	
	    &.isselect {
	      position: relative;
	
	      &::before {
	        content: " ";
	        display: inline-block;
	        width: 6px;
	        height: 6px;
	        position: absolute;
	        top: 50%;
	        right: 0upx;
	        border-width: 2px 2px 0 0;
	        border-color: #b0b0b0;
	        border-style: solid;
	        transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	      }
	    }
	  }
	}
	
}
 .btn{
 	position:fixed;
 	bottom: 40upx;
 	left:30upx;
 	width: calc(100% - 60upx) ;
 }
 .fabu_leixing_cont {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
 }
 .attr_value {
   float: left;
   width: 20%;
   height: 50upx;
   margin:20upx 15upx;
   position: relative;
 }
 
 .radio_label {
   display: block;
   text-align: center;
   line-height: 50upx;
   border-radius: 20upx;
   border: 1upx solid #EBEBEB;
   color: #EBEBEB;
 }
 .current{
	 border: 1upx solid #31b977;
	 color: #31b977;
 }
 radio {
	 display: none;
   box-sizing: border-box;
   background: none;
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
 }
</style>
