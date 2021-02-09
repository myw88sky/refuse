<template>
	<view class="content">
		<view class="content-lunbo">
			<swiper class="swiper"
				indicator-dots="true" 
				autoplay="true" 
				interval="5000" 
				duration="1500"	>
				<swiper-item v-for="(item,index) in lunbo" :key="index">
					<image :src="BASEURL+item"  mode="aspectFit"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content-info">
			<view class="content-info-title">{{model.name}}</view>
			<view class="content-info-main">
				<view class="content-info-main-name">{{model.desc}}</view>
				<view class="content-info-main-number">库存剩余：{{model.total}}件</view>
			</view>
			<view class="content-info-main">
				<view class="content-info-main-points">{{model.score}}（牛币）</view>
				<view class="content-info-main-num">
					<uniNumberBox :value="numVal" :min="1" v-on:change="onNumberChange($event)"></uniNumberBox>
				</view>
			</view>
		</view>
		<view class="shopping-info">
			<view class="shopping-info-name">商品详情</view>
			<view style="margin-top: 30upx;">
				<view class="shopping-info-img" v-for="(item,index) in infoImg" :key="index">
					<image :src="BASEURL+item"></image>
				</view>
			</view>
		</view>
		<view style="height: 10upx;width: 100%;"></view>
		<view class="shopping-order">
			<view class="shopping-order-content" >
				<view class="shopping-order-total">合计：
				<span style="color: #007AFF;">{{totalScore}}（牛币）</span>
				</view>
				<view class="shopping-order-btn" @click="goOrder()">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getGoodInfoById} from"@/api/order.js"
	import { BASEURLImg } from '@/common/utils.js'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{
		  uniNumberBox
		},
		data() {
			return {
				BASEURL: BASEURLImg,
				lunbo: [],
				numVal:1,
				infoImg:[],
				totalScore:"",
				model:{}
			}
		},
		onLoad(e) {
			let id=e.id
			this.getGoodInfoById(id)
		},
		methods: {
			 onNumberChange(value) {   
				this.totalScore=parseInt(value)*this.model.score
			},
			goOrder(){
				uni.navigateTo({
					url:'./shopping-order?id='+this.model.id
				})
			},
			getGoodInfoById(id){
				getGoodInfoById(id).then(res=>{
					if(res.returnCode===0){
						this.infoImg=res.result.detailPicPathList
						if(res.result.carouselPic1!=''){
							this.lunbo.push(res.result.carouselPic1)
						}
						if(res.result.carouselPic2!=''){
							this.lunbo.push(res.result.carouselPic2)
						}
						if(res.result.carouselPic3!=''){
							this.lunbo.push(res.result.carouselPic3)
						}
						this.model=res.result
						this.totalScore=res.result.score
					}
				})
			}
		}
	}
</script>

<style>
.content-lunbo{
	width: 100%;
	height: 720rpx;
}
.swiper{
	height: 100%;
	width: 100%;
 }
 swiper-item image{
	width: 100%;
	height: 720rpx;
 }
 .content-info{
	 margin: 30upx;
 }
.content-info-title{
	font-weight: 550;
	font-size: 28upx;
	color: #000000;
	width: 100%;
}
.content-info-main{
	margin-top: 10upx;
	display: flex;
	justify-content:space-between;
}
.content-info-main-name{
	color: #8C8C8C;
}
.content-info-main-number{
	color: #8C8C8C;
}
.content-info-main-points{
	font-size: 28upx;
	font-weight: 550;
	color: #4667F0;
	height: 50upx;
	line-height: 80upx;
}
.content-info-main-num{
	
}
.shopping-info{
	margin-top: 20upx;
	margin-bottom: 80upx;
	height: auto;
}
.shopping-info-name{
	color: #000000;
	font-size: 28upx;
	font-weight: 550;
	text-align: center;
}
.shopping-info-img{
	width: 100%;
	height: 500upx;
	margin-top: 6upx;
}
.shopping-info-img image{
	width: 100%;
	height: 100%;
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
</style>
