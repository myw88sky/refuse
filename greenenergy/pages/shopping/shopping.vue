<template>
	<view class="content">
		<view class="shopping">
			<swiper class="swiper"
				indicator-dots="true" 
				autoplay="true" 
				interval="5000" 
				duration="1500"	>
				<swiper-item v-for="(item,index) in lunbo" :key="index">
					<image :src="item.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
    <view class="tabs">
      <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.key" class="uni-tab-item" :id="tab.key" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.resourName}}</text>
				 <view :class="tabIndex==index ? 'uni-tab-item-text-active' : ''" ></view>
			</view>
      </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" :style="'height: ' + swiperHeight +'rpx;'" :duration="300" @change="ontabchange">
            <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">

					<view v-for="(item,index2) in tab.data" :key="index2">
						<view class="shop-list">
							<view class="shop-list-img">
								<image :src="BASEURL+item.carouselPic1"></image>
							</view>
							<view class="shop-list-info">
								<view class="shop-list-info-title">{{item.name}}</view>
								<view class="shop-list-info-name">{{item.desc}}</view>
								<view class="shop-list-info-name">库存剩余{{item.total}}件</view>
							    <view class="shop-list-info-name" style="text-decoration:line-through;">市场价格:{{item.price}}(元)</view>
								<!-- <view class="shop-list-info-number">库存剩余{{item.total}}件</view> -->
								<view class="shop-list-info-points">
									<view class="shop-list-info-points-num">{{item.score}}（牛币）</view>
									<view class="shop-list-info-points-btn" @click="goDetail(item)">立即兑换</view>
								</view>
							</view>
						</view>
					</view>
					<no-message :isShowNodata="isShowNodata"  :list="tab.data" />
					<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
            </swiper-item>
        </swiper>
    </view>
	</view>
</template>
<script>
	import noMessage from '@/components/no-message/no-message.vue'
	import {getHsGoodTypeZtree,getGoodsInfoByPage} from"@/api/order.js"
    import { BASEURLImg } from '@/common/utils.js'
    export default {
		components: {
			noMessage
		},
          data() {
            return {
				isShowNodata: false,
				BASEURL: BASEURLImg,
				lunbo: [{
					img:"/static/images/shop-bg1.png"
				},
				{
					img:"/static/images/shop-bg2.png"
				}],
                newsList: [{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}],
                cacheTab: [],
                tabIndex: 0,
               tabBars: [],
                scrollInto: "",
                showTips: false,
                navigateFlag: false,
                pulling: false,
                refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
                swiperHeight:300,
				userInfo:{}
			}
        },
	    onLoad() {
	
       },
	   onShow() {
		   this.userInfo=getApp().globalData.userInfo
		   if(JSON.stringify(this.userInfo)=='{}'){
		      uni.navigateTo({
		      	url:"../me/login"
		      })
		   }else{
			 this.getHsGoodTypeZtree()  
		   }
   	
	   },
        methods: {
			getHsGoodTypeZtree(){
				getHsGoodTypeZtree().then(res=>{
					this.tabBars=res.filter(function(item){
						return item.type===1
					})
					this.getGoodsInfoByPage(0);
				})
			},
			getGoodsInfoByPage(index){
				this.isShowNodata = false;
				const id=this.tabBars[index].id
				let data={
					id:id,
					page:0,
					rows:100
				}
				this.newsList[index].data=[]
				getGoodsInfoByPage(data).then(res=>{
					this.isShowNodata = true;
					let activeTab = this.newsList[index];
					activeTab.data = activeTab.data.concat(res.rows);
					this.swiperHeight=activeTab.data.length>0?350*activeTab.data.length:600
				})
			},
            goDetail(item) {
               let id=item.id
			   uni.navigateTo({
				   url: './shopping-info?id='+id
			   });
            },
            loadMore(e) {
                /* setTimeout(() => {
                    this.getList(this.tabIndex);
                }, 500) */
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
               // this.switchTab(index);
            },
            switchTab(index) {
               this.getGoodsInfoByPage(index);
                if (this.tabIndex === index) {
                    return;
                }

                // 缓存 tabId
                // if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                //     let isExist = this.cacheTab.indexOf(this.tabIndex);
                //     if (isExist < 0) {
                //         this.cacheTab.push(this.tabIndex);
                       
                //     }
                // }

                this.tabIndex = index;
                //this.scrollInto = this.tabBars[index].id;

                // 释放 tabId
                // if (this.cacheTab.length > MAX_CACHE_PAGE) {
                //     let cacheIndex = this.cacheTab[0];
                //     this.clearTabData(cacheIndex);
                //     this.cacheTab.splice(0, 1);
                   
                // }
            },
            clearTabData(e) {
                this.newsList[e].data.length = 0;
                this.newsList[e].loadingText = "加载更多...";
            },
            refreshData() {},
            onrefresh(e) {
                var tab = this.newsList[this.tabIndex];
                if (!tab.refreshFlag) {
                    return;
                }
                tab.refreshing = true;
                tab.refreshText = "正在刷新...";

                setTimeout(() => {
                    this.refreshData();
                    this.pulling = true;
                    tab.refreshing = false;
					tab.refreshFlag = false;
                    tab.refreshText = "已刷新";
                    setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
                        this.pulling = false;
                    }, 500);
                }, 2000);
            },
            onpullingdown(e) {
                var tab = this.newsList[this.tabIndex];
                if (tab.refreshing || this.pulling) {
                    return;
                }
                if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                    tab.refreshFlag = true;
                    tab.refreshText = "释放立即刷新";
                } else {
                    tab.refreshFlag = false;
                    tab.refreshText = "下拉可以刷新";
                }
            }
        }
    }
</script>

<style>
 page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }
	.content{
		 background-color: #f5f5f5;
		 height: auto;
	}
   .shopping{
	   width: calc(100% - 60upx);
	   margin: 30upx 30upx 0;
   }
 
	 .swiper{
		height: 300upx;
		width: 100%;
	 }
	 swiper-item image{
		width: 100%;
		height: 300upx;
		border-radius: 20upx;
	 }
    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
		/* height: 100vh; */
    }

    .scroll-h {
        width: 750rpx;
      /*  height: 80rpx; */
        flex-direction: row;
        white-space: nowrap;
		background: #FAFAFA;
        /* flex-wrap: nowrap; */
     /*   border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1rpx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        display: inline-block;
        flex-wrap: nowrap;
        padding-left: 28rpx;
        padding-right: 28rpx;
    }

    .uni-tab-item-title {
        color: #000;
        font-size: 28rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
    }

    .uni-tab-item-title-active {
        color: #4667F0;
    }
	.uni-tab-item-text-active{
		height: 6rpx;
		width: 100%;
		background: #4667F0;
	}

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
     flex: 1;
     flex-direction: column;
     width: 750rpx;
    }

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750rpx;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28rpx;
        color: #999;
    }
	.shop-list{
		display: flex;
		
		padding: 30upx;
		height: auto;
	}
	.shop-list-img{
		width: 230upx;
	}
	.shop-list-img image{
		width: 230upx;
		height: 230upx;
	}
	.shop-list-info{
		width: calc(100% - 260upx);
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
		margin-top: 8upx;
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
