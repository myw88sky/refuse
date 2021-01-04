<template>
	<view>
		<view style="width: 100%;height: 40upx;"></view>
		<view class="address">
			<view class="address-view" >
			  <view class="address-view-left"> 联系人 </view>
			  <view class="address-view-right" >
				  <input v-model="model.fullName" style="line-height: 100upx;height: 100upx;" />	
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 性别 </view>
			  <view class="address-view-right">
			    <radio-group @change="radioChange" style="display: flex;">
						<label  style="display: flex;padding-right: 30upx;" v-for="(item, index) in items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="item.value == model.sex" />
							</view>
							<view>{{item.name}}</view>
						</label>
			     </radio-group>
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 电话 </view>
			  <view class="address-view-right">
			    <input v-model="model.telphone" style="line-height: 100upx;height: 100upx;" />	
			  </view>
			</view>
			<view class="address-view"  style="height: 180upx;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;"> 定位地址 </view>
			  <view class="address-view-right"  style="height: 180upx; display: flex;
    align-items: center;
    vertical-align: center; "  @click="onChangeAddress()">
				  <view style="line-height: normal;">{{model.locationAddress}}</view>
			    <!-- <input v-model="model.address" style="line-height: 180upx;height: 180upx;" />	 -->
			  </view>
			</view>
			<view class="address-view" >
			  <view class="address-view-left"> 备注地址 </view>
			  <view class="address-view-right">
			    <input v-model="model.addressDetail" style="line-height: 100upx;height: 100upx;" />	
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
	import {
		reverseGeocoder,
		getLocation
	} from '@/common/qqmap-util.js'
	import {addUserAddress,updateUserAddress} from"@/api/index.js"
	export default {
		data() {
			return {
				model:{
					fullName:"",
					telphone:"",
					sex:1,
					longitude:"",
					latitude:"",
					locationAddress:"",//地图定位获得的地址
					addressDetail:""//手动填写的地址
				},
				items:[{value:1,name:"男士"},{value:2,name:"女士"}]
			}
		},
		onLoad(e){
			if(e.item!=""){
				this.model=JSON.parse(e.item) 
			}
		},
		methods: {
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
			radioChange(evt) {
				this.model.sex = evt.detail.value;
			},
			addUserAddress(){
			    let data=this.model
				if(data.id&&data.id!=""){
					this.updateUserAddress();
				}else{
					addUserAddress(data).then(res=>{
						if(res.returnCode=="2"){
							this.$api.msg("保存成功");
							uni.navigateBack({
								delta:1
							})
						}
					})
				}
				
			},
			updateUserAddress(){
			    let data=this.model
				updateUserAddress(data).then(res=>{
					if(res.returnCode=="2"){
						this.$api.msg("保存成功");
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			getLocationInfo(location) {
				let self=this;
				reverseGeocoder(location).then(res => {
						console.log('当前位置信息：', res)
						
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
	    font-size: 32upx;
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
	    font-size: 32upx;
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
</style>
