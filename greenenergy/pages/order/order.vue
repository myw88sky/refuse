<template>
	<view class="page">
		<view class="message" >
			
			<!-- itab -->
			<view class="message-tabs">
				<i-tabs v-model="current"  @change="tabChange">
					<i-tab  item-key="1" title="待办理"></i-tab>
					<i-tab  item-key="2" title="已完成"></i-tab>
					<!-- <i-tab  item-key="3" title="提醒"></i-tab> -->
				</i-tabs>
			</view>
		</view>
		<scroll-view class="message-content" :scroll-y="true" @scrolltolower="onScrolltolower">
			<view v-if="current =='1'">
				<view class="message-card" @click="toView(item)" :key="index" v-for="(item, index) in todoList">
					<!-- <view class="message-card-left">
						{{item.createUserName}}
					</view> -->
					<view class="message-card-right" >
						<view class="message-card-right-arrow"></view>
						
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约日期:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.appointDate}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约时间:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.appointTime}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约重量:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.orderDetails[0].estimateWeight}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约地点:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.locationAddress}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left" style="font-weight: 700;">
								预约物品
							</view>
							<view class="message-card-right-title-right" >
							</view>
						</view>
						<view class="message-card-right-content" v-for="(iem,index1) in item.orderDetails" :key="index1">
							<view class="message-card-right-content-item">
								{{iem.typeName}}
							</view>
							<view class="message-card-right-content-item">
								{{iem.actualWeight?iem.actualWeight+'(公斤)':iem.estimateWeight}}
							</view>
							<view class="message-card-right-content-item"  v-if="item.state=='1'">
								
							</view>
							<view class="message-card-right-content-item" v-if="iem.actualPrice"  >
							   {{iem.actualPrice+'(元)'}}
							</view>
							<view class="message-card-right-content-item" v-if="item.state=='2'&&userType=='3'" @click.stop="openModal(iem)" style="color: #19BE6B;">
								完善订单
							</view>
						</view>
					   <view class="message-card-right-btns" v-if="userType=='4'">
							<view class="message-card-right-btns-reject" v-if="item.state=='2'" @click.stop="reback(item)">撤回</view>
							<view class="message-card-right-btns-reject" v-if="item.state=='1'" @click.stop="del(item)">删除</view>
							<!-- <view class="message-card-right-btns-divider"></view> -->
							<view class="message-card-right-btns-agree" v-if="item.state=='2'" @click.stop="agree(item)">确认回收</view>
							<view class="message-card-right-btns-agree" v-if="item.state=='4'" @click.stop="agree1(item)">确认到账</view>
						</view>
						<view class="message-card-right-btns" v-if="userType=='3'">
							
							<!-- <view class="message-card-right-btns-divider"></view> -->
							<view class="message-card-right-btns-agree" v-if="item.state=='1'" @click.stop="agree2(item)">确认</view>
							<view class="message-card-right-btns-agree" v-if="item.state=='3'" @click.stop="agree3(item)">确认支付</view>
						</view>
					</view>
				</view>
				<uni-load-more v-if="todoList.length" :status="status" />
			</view>
			<view v-if="current == '2'">
				<view class="message-card" @click="toView2(item)" :key="index" v-for="(item, index) in todoList">
					<view class="message-card-right" >
						<view class="message-card-right-arrow"></view>
						
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约日期:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.appointDate}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约时间:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.appointTime}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约重量:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.orderDetails[0].estimateWeight}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left">
								预约地点:
							</view>
							<view class="message-card-right-title-right" style="flex:2">
								{{item.locationAddress}}
							</view>
						</view>
						<view class="message-card-right-title">
							<view class="message-card-right-title-left" style="font-weight: 700;">
								预约物品
							</view>
							<view class="message-card-right-title-right" >
							</view>
						</view>
						<view class="message-card-right-content" v-for="(iem,index1) in item.orderDetails" :key="index1">
							<view class="message-card-right-content-item">
								{{iem.typeName}}
							</view>
							<view class="message-card-right-content-item">
								{{iem.actualWeight?iem.actualWeight+'(公斤)':iem.estimateWeight}}
							</view>
							<view class="message-card-right-content-item"   >
							   {{iem.actualPrice?iem.actualPrice+'(元)':''}}
							</view>
			
						</view>
					</view>
				</view>
				<uni-load-more v-if="todoList.length" :status="status" />
			</view>
			
			<no-message :isShowNodata="isShowNodata"  :list="todoList" />
		     <neil-modal :show="showModal" title="请完善订单" @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')">
				 <view class="input-view">
					 <view class="input-name" style="padding:20upx 30upx;display:flex;font-size: 28upx;"> 
						 <view>实际价格</view>
						 <input type="text" v-model="actualPrice" style="margin-left: 20upx;" placeholder="请输入实际价格" />
					 </view>
					 <view class="input-password"  style="padding:20upx 30upx;display:flex;font-size: 28upx;">
						 <view>实际重量</view>
						 <input type="text" v-model="actualWeight" style="margin-left: 20upx;"  placeholder="请输入实际重量" />
					 </view>
				 </view>
		     </neil-modal>
		</scroll-view>
	</view>
</template>

<script>
	import noMessage from '@/components/no-message/no-message.vue'
	import iTabs from '@/components/iview/tabs/index'
	import iTab from '@/components/iview/tab/index'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {getHsOrderList,deleteOrderById,recoveredOrderById,updateOrderDetail,confiremedPaidOrderById,confirmedOrderById,payOrderById} from"@/api/index.js"
	export default {
	    components: {
			iTabs,
			iTab,
			uniLoadMore,
			noMessage,
			neilModal
		},
		data() {
			return {
				isShowNodata: false,
				current: '1',
				todoList:[],
				userInfo:{},
				showModal:false,
				page:0,
				row:10,
				queryConditions:[{
				  queryConditions:"",//查询字段名,处理人
				  operation:"",//比较符
				  queryValue:"" //比较值
				}],
				userType:4, //userType:1 是超级管理，2是管理员 3:是员工 4：客户
                actualPrice:"",//实际价格
				actualWeight:"", //实际重量
				orderGoodsInfo:{}
			}
		},
		computed: {
			isMore() {
				/* if (this.page.current >= this.page.pages) {
					return false;
				} else {
					return true;
				} */
				return false;
			},
			status() {
				if (this.isLoading) {
					return 'loading'
				} else {
					return this.isMore ? 'more' : 'noMore'
				}
			}
		},
		onShow() {
			this.userInfo=getApp().globalData.userInfo
			if(JSON.stringify(this.userInfo)=='{}'){
			   uni.navigateTo({
			   	url:"../me/login"
			   })
			}else{
				this.userType=this.userInfo.userType;
			}
			this.initPage()
			this.searchInfo()
     	},
		onReachBottom() {
			this.onScrolltolower()
		},
		methods: {
			
			tabChange() {
				this.todoList = []
				if (this.current == '1') {
					// 去请求数据
					this.initPage()
					this.searchInfo()
				}
				else if (this.current == '2') {
					this.initPage()
					this.searchInfo()
				}
			},
			searchInfo() {

				this.isShowNodata = false
				// 根据当前的current 来加载不同的function
				if (this.current == '1') {
					uni.showLoading();
					let data=this.userType=="3"?{
						page:0,
						row:10,
						queryConditions:[{
						  queryConditions:"",//查询字段名,处理人
						  operation:"",//比较符
						  queryValue:"" //比较值
						}],
					}:{
						page:0,
						row:10,
						queryConditions:[{
						  queryConditions:"",//查询字段名,处理人
						  operation:"",//比较符
						  queryValue:"" //比较值
						}],
						createuserid:this.userInfo.id 
					}
					
					getHsOrderList(data).then(res => {
						this.todoList=[];
						this.isShowNodata = true
						if (res) {
							this.todoList = this.todoList.concat(res.rows);
							uni.hideLoading();
						}
					}, () => {
						this.isShowNodata = true
						uni.hideLoading();
					})
				} else if (this.current == '2') {
					uni.showLoading();
					let data=this.userType=="3"?{
						page:0,
						row:10,
						queryConditions:[{
						  queryConditions:"",//查询字段名,处理人
						  operation:"",//比较符
						  queryValue:"" //比较值
						}],
					}:{
						page:0,
						row:10,
						queryConditions:[{
						  queryConditions:"",//查询字段名,处理人
						  operation:"",//比较符
						  queryValue:"" //比较值
						}],
						createuserid:this.userInfo.id 
					}
					getHsOrderList(data).then(res => {
						this.isShowNodata = true
						this.todoList=[];
						if (res) {
							this.todoList = this.todoList.concat(res.rows);
							uni.hideLoading();
						}
					}, () => {
						uni.hideLoading();
						this.isShowNodata = true
					})
				} 
			},
			initPage() {
				this.todoList = [];
				this.page=0;
				this.row=100;
				this.queryConditions=[{
				  queryConditions:"",//查询字段名,处理人
				  operation:"",//比较符
				  queryValue:"" //比较值
				}];
			},
			onScrolltolower() {
				if (!this.isMore) return;
				this.searchInfo()
			},
			toView2(item) {
				const id = item.id;
				return false;
			},
			// 跳转到新页面
			toView(item) {
				return false;
			},
			
			bindBtn(type) {
				/* uni.showToast({
					title: `点击了${type==='cancel'?'取消':'确定'}按钮`,
					icon: 'none'
				}) */
				let self=this;
				self.showModal=false;
				if(type==='confirm'){
					let data={
						id:self.orderGoodsInfo.id,
						actualPrice:self.actualPrice,
						actualWeight:self.actualWeight
					}
					if(!self.actualPrice){
						self.$api.msg("请输入实际价格");
						return false
					}
					if(!self.actualWeight){
						self.$api.msg("请输入实际重量");
						return false
					}
					updateOrderDetail(data).then(res=>{
						if(res.returnCode=="0"){
							
							self.initPage()
							self.searchInfo()
						}
					})
				}
			},
			openModal(item){
				this.showModal=true;
				this.orderGoodsInfo=item;
			},
			//客户撤回
			reback(){
				uni.showModal({
					title: '撤回订单',
					    content: '请联系18255157968后台管理人员帮你撤回',
						showCancel:false,
					    success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				})
			},
			// 客户确认回收
			agree(item) {
				let self=this;
				recoveredOrderById(item.id).then(res=>{
					if(res.returnCode=="0"){
						self.initPage()
						self.searchInfo()
					}
				})
			},
			// 客户确认收款
			agree1(item) {
				let self=this;
				confiremedPaidOrderById(item.id).then(res=>{
					if(res.returnCode=="0"){
						self.initPage()
						self.searchInfo()
					}
				})
			},
			// 员工同意接口
			agree2(item) {
				let self=this;
				confirmedOrderById(item.id).then(res=>{
					if(res.returnCode=="0"){
						self.initPage()
						self.searchInfo()
					}
				})
			},
			//员工确认支付
			agree3(item){
				let self=this;
				let actualPrice=0;
				for(let i=0;i<item.orderDetails.length;i++){
					if(!item.orderDetails[i].actualPrice){
						this.$api.msg("请先完善订单价格");
						
						return false
					}else{
						actualPrice+=parseFloat(item.orderDetails[i].actualPrice)
					}
				}
				let data={
					orderId:item.id,
					actualPrice:actualPrice
				}
				payOrderById(data).then(res=>{
					if(res.returnCode=="0"){
						self.initPage()
						self.searchInfo()
					}else{
						self.$api.msg(res.description);
					}
				})
			},
			//删除接口
			del(item) {
				let self=this;
				uni.showModal({
					title: '删除订单',
					content: '确定删除订单',
					success: function (res) {
						if (res.confirm) {
							deleteOrderById(item.id).then(res=>{
								if(res.returnCode=="0"){
									self.initPage()
									self.searchInfo()
								}
							})
						}else if (res.cancel) {
							console.log('用户点击确定');
						}
					}
				})
				
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/components/iview/mixin.scss';
	.page {
		height: 100%;

		.message {
			width: 100%;
			box-shadow: 0px 2upx 16upx 0px rgba(0, 0, 0, 0.06);

			&-title {

				padding-left: 30upx;
				padding-right: 30upx;

				&-span {
					height: 70upx;
					font-size: 50upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(34, 34, 34, 1);
					line-height: 70upx;
				}
			}
			&-tabs{
				margin-top: 8upx;
			}

			&-tab {
				padding-left: 30upx;
				padding-right: 30upx;
				display: flex;
				&-item {
					&-badge {}
				}
			}
		}
		.message-content {
			height:calc(100% - 280rpx);
			overflow-y: scroll;
			.message-card {
				display: flex;
				margin: 30upx 30upx 0;

				&-left {
					width: 70upx;
					height: 70upx;
					font-size: 32upx;
					display: inline-block;
					text-align: center;
					line-height: 70upx;
					border-radius: 50%;
					color: white;
					background: rgba(74, 134, 236, 1);
				}

				&-right {
					flex: 1;
					position: relative;
					padding: 22upx 22upx;
					border: 2upx solid #E3E7EB;
					border-radius: 12upx;
					margin-left: 20upx;
					&-arrow {
						position: absolute;
						width: 18upx;
						height: 39upx;
						left: -18upx;
						top: 60upx;
						z-index: 111;
						background-size: 100% 100%;
						
					}
					&-content {
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(34, 34, 34, 1);
						line-height: 42upx;
						display: flex;
						text-align: center;
						padding: 20upx 10upx;
						&-item{
							flex:1;
						}
					}

					&-btns {
						display: flex;
						position: relative;
						margin-top: 20upx;
						font-size: 32upx;
						font-weight: 400;
						color: rgba(34, 34, 34, 1);
						line-height: 45upx;
						padding-top: 15upx;
						padding-left: 20upx;
						padding-right: 20upx;
						&:after {
							@include hairline();
							border-top-width: 1px;
						}

						&-divider {
							width: 1upx;
							background: #E3E7EB;
							height: 48upx;
						}

						&-reject {
							flex: 1;
							color: #222222;
							display: inline-block;
							text-align: center;
						}

						&-agree {
							flex: 1;
							color: #222222;
							display: inline-block;
							text-align: center;
						}
					}

					&-info {
						font-size: 28upx;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 40upx;

						&-time {
							display: inline-block;
							font-size: 28upx;
							font-weight: 400;
							color: rgba(34, 34, 34, 1);
						}
					}

					&-title {
						display: flex;

						// justify-content: space-between;
						align-items: center;

						&-left {
							font-size: 40upx;
							font-weight: 400;
							color: #222222;
							flex: 1;

							span {
								color: #4A86EC;
							}
						}

						&-right {
							font-size: 32upx;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
						}
					}
				}
			}
		}

	}
</style>
