<template>
	<view class="content">
		<view class="address-view"  style="height: 180upx;background:#F6F6F6;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;">  
				  <view >
					  <uni-icons type="location-filled" color="#4667F0" size="24"></uni-icons>
				  </view> 
			  </view>
			  <view class="address-view-right isselect"  style="height: 180upx;flex:4; display: flex;align-items: center;vertical-align: center; "  @click="selectAddress()">
				  <view style="line-height: normal;font-size: 28upx;font-weight: 500;color: #000000;" v-if="locationAddress!=''" >{{locationAddress}}</view>
				  <view style="line-height: normal;font-size: 28upx;font-weight: 500;color: #000000;" v-else>{{addressMark}}</view>
			  </view>
		</view>
		<view class="shop-list">
			<view class="shop-list-img">
				<image :src="BASEURL+model.carouselPic1"></image>
			</view>
			<view class="shop-list-info">
				<view class="shop-list-info-title">{{model.name}}</view>
				<view class="shop-list-info-name">数量X{{model.total}}</view>
				<view class="shop-list-info-name">价格{{model.score}}</view>
				<view class="shop-list-info-points">
					<view></view>
					<uniNumberBox :value="numVal" :min="1" v-on:change="onNumberChange($event)"></uniNumberBox>
				</view>
			</view>
		</view>
		<view class="address-view"  style="height: 180upx;background: #FFFFFF;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;">  
				 商品总价格：
			  </view>
			  <view class="address-view-right"  style="height: 180upx;display: flex;align-items: center;vertical-align: center; "  >
				 <view style="flex: 3;"></view>
				  <view style="font-size: 28upx;font-weight: 500;color: #007AFF;">≈{{totalScore}}</view>
			  </view>
		</view>
		<view class="address-view"  style="height: 180upx;background: #FFFFFF;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;">  
				 留言备注：
			  </view>
			  <view class="address-view-right"  style="height: 180upx;display: flex;align-items: center;vertical-align: center; " >
				  <textarea style="width: 100%;" v-model="textVal" auto-height />
			  </view>
		</view>
		<view style="padding: 30upx;font-size: 28upx;font-weight: 500;color: #7E7E7E;background:#F6F6F6 ;
">支付方式</view>
		<view class="address-view"  style="height: 180upx;background: #FFFFFF;" >
			  <view class="address-view-left"  style="height: 180upx;line-height: 180upx;flex: 2;">  
				 可用牛币：{{userInfo.remainScore?userInfo.remainScore:0}}
			  </view>
			  <view class="address-view-right"  style="height: 180upx;display: flex;align-items: center;vertical-align: center; "  >
				 <view style="flex: 2;"></view>
				 <radio value="radioVal" color="#007AFF" checked="true" />
			  </view>
		</view>
		<view class="shopping-order">
			<view class="shopping-order-content" >
				<view class="shopping-order-total">合计：
				<span style="color: #007AFF;">{{totalScore}}（牛币）</span>
				</view>
				<view class="shopping-order-btn" @click="addGoodExchange()">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASEURLImg } from '@/common/utils.js'
	import {addGoodExchange,getGoodInfoById} from"@/api/order.js"
	import {myUserAddress} from"@/api/index.js"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{
		  uniNumberBox
		},
		data() {
			return {
				BASEURL:BASEURLImg,
				model:{},
				addressMark:"添加收货地址",
				radioVal:"1",
				totalScore:"",
				textVal:'',
				numVal:1,
				locationAddress:"",
				addressId:"",
				userInfo:{}
				
			}
		},
		onLoad(e) {
			let id=e.id
			this.getGoodInfoById(id)
			this.myUserAddress()
			this.userInfo=getApp().globalData.userInfo
		},
		methods: {
			getGoodInfoById(id){
				getGoodInfoById(id).then(res=>{
					if(res.returnCode===0){
						this.model=res.result
						this.totalScore=res.result.score
					}
				})
			},
			myUserAddress(){
				myUserAddress().then(res=>{
					if(res.returnCode=="0"){
						this.listAddress=res.result
						if(this.listAddress&&this.listAddress.length>0){
							if(this.listAddress[0].defaultFlag=="1"){
								this.locationAddress=this.listAddress[0].locationAddress+"("+this.listAddress[0].addressDetail+")";//预约地址
								 this.addressId=this.listAddress[0].id;
								// this.model.districtCode=this.listAddress[0].districtCode
							}
							
						}
					}
				})
			},
			selectAddress(){
				uni.navigateTo({
					url:"/pages/order/address"
				})
			},
			getSelectAddress(item){
				
				this.locationAddress=item.locationAddress+"("+item.addressDetail+")"
			    this.addressId=item.id;
				//this.model.districtCode=item.districtCode;
			},
			onNumberChange(value) {
				this.radioVal=parseInt(value)
				this.totalScore=parseInt(value)*this.model.score
			},
			addGoodExchange(){
				let data={
					goodsNum:this.radioVal,
					goodsId:this.model.id,
					addressId:this.addressId
				}
				addGoodExchange(data).then(res=>{
					if(res.returnCode==0){
						this.$api.msg("兑换成功成功")
						setTimeout(function(){
							uni.switchTab({
								url:"/pages/shopping/shopping"
							})	
						},1500)
					}else{
						this.$api.msg(res.description)
					}
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
@import "@/components/iview/mixin.scss";
page{
	height: auto;
	background:#F6F6F6 ;
}
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
	    font-weight: 500;
	    
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
	        border-color: #4667F0;
	        border-style: solid;
	        transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	      }
	    }
	  }
	}
	
}
.shopping-order{
	position:fixed;
	bottom:10upx;
	left:0upx;
	width:100%;
	height:100upx;
	z-index: 99;
	background: #FFFFFF;
}
.shopping-order-content{
    display: flex;
	justify-content:space-between;
	padding:10upx 30upx;	
}
	
.shopping-order-total{
	font-size: 28upx;
	font-weight: 550;
	color: #222222;
	height: 50upx;
	line-height: 80upx;

}
.shopping-order-btn{
	background: #4667F0;
	color: #FFFFFF;
	padding:16upx 20upx;
	width: 136upx;
	text-align: center;
	border-radius:20upx ;
}
.shop-list{
		display: flex;
		padding: 30upx;
		background: #FFFFFF;
		border-bottom: 1px solid #d8d8d8;
	}
	.shop-list-img{
		width: 230upx;
		height: 230upx;
	}
	.shop-list-img image{
		width: 100%;
		height: 100%;
	}
	.shop-list-info{
		padding-left: 30upx;
	}
	.shop-list-info-title{
		font-weight: 500;
		font-size: 28upx;
		color: #000000;
		width: 434upx;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
	.shop-list-info-name{
		margin-top: 20upx;
		font-weight: 400;
		font-size: 28upx;
		color: #868686;
	}
	.shop-list-info-number{
		margin-top: 10upx;
		background: #4667F0;
		color: #FFFFFF;
		padding:5upx 20upx;
		width: 300upx;
		text-align: center;
		border-radius:20upx ;
	}
	.shop-list-info-points{
		margin-top: 10upx;
		display: flex;
		justify-content:space-between;
	}
	.shop-list-info-points-num{
		font-size: 28upx;
		font-weight: 550;
		color: #4667F0;
		height: 50upx;
		line-height: 80upx;
	}
	.shop-list-info-points-btn{
		background: #4667F0;
		color: #FFFFFF;
		padding:10upx 20upx;
		width: 136upx;
		text-align: center;
		border-radius:20upx ;
	}
</style>
