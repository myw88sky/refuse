<template>
	<view class="content">
		<view class="hspl">
			<view class="hspl-title">回收品类</view>
			<view class="hspl-content">
				<view class="hspl-content-item" v-for="(item,index) in typeList" :key="index" :class="[type==item.sort?'select':'']" @click="changeType(item.sort,item.num)">
					<image :src="item.img"></image>
				</view>
				<!-- <view class="hspl-content-item" :class="[type=='2'?'select':'']" @click="changeType('2')">
					<image src="/static/images/order2.png"></image>
				</view>
				<view class="hspl-content-item" :class="[type=='3'?'select':'']" @click="changeType('3')">
					<image src="/static/images/order3.png"></image>
				</view>
				<view class="hspl-content-item" :class="[type=='4'?'select':'']" @click="changeType('4')">
					<image src="/static/images/order4.png"></image>
				</view> -->
			</view>
		</view>
	    <view class="jrzdj">
			<view class="jrzdj-title">今日指导价</view>
			<view class="jrzdj-content">
				<view class="jrzdj-content-item" v-for="(item,index) in goodsList" :key="index">
					<view>
						<view class="jrzdj-content-item-name">{{item.typeName}}</view>
						<!-- <view class="jrzdj-content-item-mark">其他可回收的纸品</view> -->
					</view>
					<view class="jrzdj-content-item-price">
						{{item.directPrice}}元/公斤
					</view>
				</view>
				<!-- <view class="jrzdj-content-item">
					<view>
						<view class="jrzdj-content-item-name">花纸</view>
						<view class="jrzdj-content-item-mark">印刷纸箱，如矿泉水纸箱</view>
					</view>
					<view class="jrzdj-content-item-price">
						0.8元/公斤
					</view>
				</view>
				<view class="jrzdj-content-item">
					<view>
						<view class="jrzdj-content-item-name">统纸</view>
						<view class="jrzdj-content-item-mark">黄纸和花纸混合</view>
					</view>
					<view class="jrzdj-content-item-price">
						0.1元/公斤
					</view>
				</view>
				<view class="jrzdj-content-item">
					<view>
						<view class="jrzdj-content-item-name">黄纸</view>
						<view class="jrzdj-content-item-mark">纯色纸箱，如家电包装箱</view>
					</view>
					<view class="jrzdj-content-item-price">
						1.2元/公斤
					</view>
				</view> -->
			</view>
		</view>
	    <view class="hsyq">
			<view class="hsyq-title">回收要求</view>
			<view class="hsyq-content">
				<view class="hsyq-content-item">
					<image src="/static/images/jjcs.png"></image>
					<view class="hsyq-content-item-remark">拒绝掺水</view>
				</view>
				<view class="hsyq-content-item">
					<image src="/static/images/jjcj.png"></image>
					<view class="hsyq-content-item-remark">拒绝掺假</view>
				</view>
				<view class="hsyq-content-item">
					<image src="/static/images/dc10k.png"></image>
					<view class="hsyq-content-item-remark">单次10kg起</view>
				</view>
			</view>
		</view>
	    <view class="ygzl">
			<view class="ygzl-title">预估重量</view>
			<view class="ygzl-content">
				<view class="ygzl-content-item" :class="[weight=='1'?'select':'']" @click="changeWeight('1')">10-50公斤</view>
				<view class="ygzl-content-item" :class="[weight=='2'?'select':'']" @click="changeWeight('2')">50-100公斤</view>
				<view class="ygzl-content-item" :class="[weight=='3'?'select':'']" @click="changeWeight('3')">100公斤以上</view>
			</view>
			<view class="ygzl-mark" v-if="weight!='3'"> 
				<view>未满100公斤，不需要添加照片</view>
				<view class="ygzl-mark-btn"  @click="addGoods()">+添加品类</view>
			</view>
			<view class="ygzl-mark" v-if="weight=='3'">
			    <view>超过100公斤，请添加回收物照片</view>	
				<view class="ygzl-mark-btn" @click="addGoods()">+添加品类</view>
			</view>
			<view class="ygzl-file"  v-if="weight=='3'">
				<file-upload
					 :imageLength="imageLength"
					 v-on:sendAtts="getAtts"
					 mode="create"
					 :canUploadFile="true"
					 :uploadFileUrl="uploadFileUrl"
					 :showProcess="true"
					 :attachmentList.sync="attachmentList"
					 :attId="attId"
					 @uploadSuccess="uploadSuccess"
					>
				</file-upload>
			</view>
		</view>
		<view style="border-bottom: solid 1upx #F5F5F5;"></view>
		<view class="explain">
			<view class="explain-title">注意事项</view>
			<view class="explain-content">1、因回收成本原因，社区、写字楼单元楼价格面议</view>
			<view class="explain-content">2、小于10公斤暂不保证上门回收</view>
			<view class="explain-content">3、重量超过100公斤，需提供照片供回收员参考</view>
		</view>
	    <view class="subscribe">
			<view class="subscribe-view" style="margin-top: 20upx">
			  <view class="subscribe-view-left"> 预约日期 </view>
			  <view class="subscribe-view-right isselect">
			    <picker
			      mode="date"
			      :value="model.useDate"
			      :start="startDate"
			      :end="endDate"
			      @change="bindDateChange"
			    >
			      <view class="uni-input" style="line-height: 100upx">{{
			        model.useDate === "" ? "请选择" : model.useDate
			      }}</view>
			    </picker>
			  </view>
			</view>
			<view class="subscribe-view">
			  <view class="subscribe-view-left"> 预约时间 </view>
			  <view class="subscribe-view-right isselect">
			    <picker
			     mode="time" 
			     :value="model.userTime" 
			     start="07:00" 
			     end="21:00"
			      @change="bindTimeChange"
			    >
			      <view class="uni-input" style="line-height: 100upx">{{
			        model.userTime === "" ? "请选择" : model.userTime
			      }}</view>
			    </picker>
			  </view>
			</view>
			<view class="subscribe-view" style="height: 200upx;">
			  <view class="subscribe-view-left" style="height: 200upx;width: 200upx; line-height: 200upx;"> 预约地址 </view>
			  <view class="subscribe-view-right  isselect" style="height: 200upx;">
			   
			      <view class="uni-input" style="height: 200upx;line-height: initial;
    display: flex;
    align-items: center;
    vertical-align: center;" @click="selectAddress()">{{
			        model.userAddress === "" ? "请选择" : model.userAddress
			      }}</view>
			    </picker>
			  </view>
			</view>
		</view>
		<view class="order-goods"  @click.stop="openModal()">
			<view class="order-goods-number" v-if="orderGoods.length>0">{{orderGoods.length}}</view>
			<image  src="/static/images/order_type.png"></image>
		</view>
	    <view class="submit">
			<view class="submit-explain" @click="openExplain()">
				确认下单将自动默认<span style="color: #31b977;">《小牛换吧上门回收免费条款》</span>
			</view>
			<view class="submit-btn">
				<button type="primary" style="width: 40%;" @click="addHsOrder('1')">公益赠送</button>
				<button type="warn" style="width: 40%;" @click="addHsOrder('0')" >立即下单</button>
			</view>
		</view>
		<neil-modal :show="showModal"
		 title="已添加项目"
		 confirm-color="#E64043"
		 confirm-text="立即下单"
		  cancel-color="#007FAA"
		 cancel-text="关闭"
		 auto-close="false"
		 @cancel="bindBtn('cancel')" 
		 @confirm="bindBtn('confirm')">
		  <view>
			  <view class="order-modal" v-for="(item,index) in orderGoods" :key="index" >
			  	<view class="order-modal-item">{{item.typeName}}</view>
			  	<view class="order-modal-item" style="color:#19BE6B;flex:2;">{{item.estimateWeight}}</view>
			  	<view class="order-modal-item" style="color: #E64043;" @click="delGoods(index)">删除</view>
			  </view> 
		  </view>
		</neil-modal>
	</view>
</template>

<script>
	import { BASEURL } from '@/common/utils.js'
	import FileUpload from "@/components/file-upload/file-upload.vue"
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {getHsTypeZtree,getHsTypeList,addHsOrder,uploadOrderImg,myUserAddress} from"@/api/index.js"
	export default {
		components:{
			FileUpload,
			neilModal
		},
		data() {
			return {
				imageLength: 5, //限制图片张数
				model:{
					useDate: this.formatDate(new Date()), // 预约日期
					userTime:"",//预约时间
					userAddress:"",//预约地址
					addressId:"",
					districtCode:"",
				},
				attachmentList: [],
				uploadFileUrl: BASEURL+'/hsOrderInf/uploadOrderImg', //替换成你的后端接收文件地址
				//uploadFileUrl: BASEURL+'/goodsInfo/uploadResource', //替换成你的后端接收文件地址
			    type:"1", 
				weight:"1",
				ztreeList:[],
				typeList:[],
				goodsList:[],
				listAddress:[],
				showModal:false,
				atts:[],
				orderGoods:[]
			}
		},
		
		onLoad(e){
			let userInfo=getApp().globalData.userInfo
			if(JSON.stringify(userInfo)=='{}'){
			   uni.navigateTo({
			   	url:"../me/login"
			   })
			}
			this.type=e.type
			this.getHsTypeList()
			this.myUserAddress()
		},
		onShow(){
			let userInfo=getApp().globalData.userInfo
			if(JSON.stringify(userInfo)=='{}'){
			   uni.navigateTo({
			   	url:"../me/login"
			   })
			}
		
		},
		methods: {
			addGoods(){
				let self=this;
				for(let i=0;i<self.orderGoods.length;i++){
					if(self.orderGoods[i].typeId===self.typeList[self.type-1].id){
						self.$api.msg("同一品类只能添加一个");
						return false;
					}
				}
				this.orderGoods.push({
					typeName:this.typeList[this.type-1].typeName,
					typeId:this.typeList[this.type-1].id,
					estimateWeight:this.getWeightContent(this.weight),
					hasPhoto:this.atts.length>0?1:0,//0：无图片上传 1：有图片上传
					detailPhotoUrls:this.atts
				})
				this.weight="1"
			},
			delGoods(index){
				this.orderGoods.splice(index,1);
			},
			bindBtn(type) {
				/* uni.showToast({
					title: `点击了${type==='cancel'?'取消':'确定'}按钮`,
					icon: 'none'
				}) */
				this.showModal=false;
				if(type=='confirm'){
					if(this.orderGoods.length==0){
						this.$api.msg("请添加回收物品")
						return false;
					}else{
						addHsOrder('0')
					}
				}
			},
			openModal(item){
				this.showModal=true;
			},
			getHsTypeList(){
				getHsTypeList().then(res=>{
					this.ztreeList=res.rows
					this.ztreeList.forEach(item=>{
						if(item.parentNum==0){
							this.typeList.push(item)
						}
					})
					for(let i=0;i<this.typeList.length;i++){
						this.typeList[i].img="/static/images/order"+(i+1)+".png"
					}
					this.getHsGoodsList(this.typeList[this.type-1].num)
					
				})
			},
			getHsGoodsList(type){
				this.goodsList=[]
				this.ztreeList.forEach(item=>{
					if(item.parentNumsPath=="0_"+type+"_"){
						this.goodsList.push(item)
					}
				})
			},
			changeType(e,d){
			   this.type=e;
			   this.getHsGoodsList(d)
			},
			changeWeight(e){
				this.weight=e;
			},
			getWeightContent(weight){
				switch(weight){
					case "1": return "10-50公斤"
					break;
					case "2" : return "50-100公斤"
					break;
					case "3" : return "100公斤以上"
					break;
				}
			},
			addHsOrder(type){
				if(this.model.userTime==""){
					this.$api.msg("请选择预约时间");
					return false;
				}
				if(this.model.addressId==""){
					this.$api.msg("请选择地址");
					return false;
				}
				let data={
					 districtCode:this.model.districtCode,
					 details:this.orderGoods.length>0?this.orderGoods:[{
						typeId:this.typeList[this.type-1].id,
						estimateWeight:this.getWeightContent(this.weight),
						hasPhoto:this.atts.length>0?1:0,//0：无图片上传 1：有图片上传
						detailPhotoUrls:this.atts
					 }],
					 appointDate:this.model.useDate+" "+"00:00:00",
					 appointTime:this.model.useDate+" "+this.model.userTime+":00",
					 addressId:this.model.addressId,
					 publicGive:type	
				}
				addHsOrder(JSON.stringify(data)).then(res=>{
					if(res.returnCode=="0"){
						uni.switchTab({
							url:"./order"
						})
					}
				})
			},
			getSelectAddress(item){
				this.model.userAddress=item.locationAddress+"("+item.addressDetail+")"
			    this.model.addressId=item.id;
				this.model.districtCode=item.districtCode;
			},
			getAtts(value){
			    console.log("atts",value);
				this.atts = value;
			},
			
			uploadSuccess(result) {
				if(result.statusCode == 200) {
					//上传成功的回调处理
					uni.showToast({
						title: '上传成功',
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: '上传失败',
						icon: 'none'
					});
				}
			},
			formatDate(date) {
			  var year = date.getFullYear();
			  var month = date.getMonth() + 1;
			  var day = date.getDate();
			
			  if (month < 10) {
			    month = "0" + month;
			  }
			  if (day < 10) {
			    day = "0" + day;
			  }
			  return year + "-" + month + "-" + day;
			},
			startDate() {
			  return this.getDate("start");
			},
			endDate() {
			  return this.getDate("end");
			},
			getDate(type) {
			  const date = new Date();
			  let year = date.getFullYear();
			  let month = date.getMonth() + 1;
			  let day = date.getDate();
			
			  if (type === "start") {
			    year = year;
			  } else if (type === "end") {
			    year = year + 2;
			  }
			  month = month > 9 ? month : "0" + month;
			  day = day > 9 ? day : "0" + day;
			  return `${year}-${month}-${day}`;
			},
			//预约日期
			bindDateChange(e) {
			  this.model.useDate = e.target.value;
			  this.beginTime = this.formatTime1(
			    new Date(this.model.useDate.replace(/\-/g, "/")),
			    "start"
			  );
			  this.beginTime1 = this.formatTime1(
			    new Date(this.model.useDate.replace(/\-/g, "/")),
			    "start"
			  );
			},
			bindTimeChange(e){
			  this.model.userTime=e.target.value
			},
			formatTime1(date, type) {
			  if (this.model) {
			    if (type === "start") {
			      return "06:00";
			    }
			    if (type === "end") {
			      return "19:00";
			    }
			  }
			  var hours = date.getHours();
			  if (hours < 10) {
			    hours = "0" + hours;
			  }
			  var minutes = date.getMinutes();
			  if (minutes < 10) {
			    minutes = "0" + minutes;
			  }
			  var seconds = date.getSeconds();
			
			  return hours + ":" + minutes + ":" + seconds;
			},
			openExplain(){
				uni.showModal({
					title: '用户协议',
					    content: '这是一个模态弹窗这是一个模态弹窗这是一个模态弹窗这是一个模态弹窗这是一个模态弹窗这是一个模态弹窗这是一个模态弹窗',
						showCancel:false,
					    success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				})
			},
			selectAddress(){
				uni.navigateTo({
					url:"./address"
				})
			},
			myUserAddress(){
				myUserAddress().then(res=>{
					if(res.returnCode=="0"){
						this.listAddress=res.result
						if(this.listAddress&&this.listAddress.length>0){
							if(this.listAddress[0].defaultFlag=="1"){
								this.model.userAddress=this.listAddress[0].locationAddress+"("+this.listAddress[0].addressDetail+")",//预约地址
								this.model.addressId=this.listAddress[0].id,
								this.model.districtCode=this.listAddress[0].districtCode
							}
							
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/components/iview/mixin.scss";
 .content{
	 background-color: #f5f5f5;
	 height: auto;
 }
 .hspl{
	background-color: #FFFFFF;
	padding: 30upx 30upx;
	width: calc(100% -60upx);
 }
 .hspl-title{
	 font-size: 28upx;
	 font-weight: 500;
	 color: #222222;
 }
 .hspl-content{
	 margin-top: 30upx;
	 display: flex;
	 align-items: center;
	 justify-content: center;
 }
 .hspl-content-item{
	flex:1;
	height: 240upx;
 }
 .select{
 	border: solid 3px #31b977;
	border-radius: 10upx;
 }
 .hspl-content-item image{
	 height: 240upx;
	 width: 100%;
	 border-radius: 10upx;
 }
 .jrzdj{
	margin-top: 30upx; 
	padding: 50upx 30upx;
	background-color: #FFFFFF;
 }
 .jrzdj-title{
	 font-size: 28upx;
	 font-weight: 500;
	 color: #222222;
 }
 .jrzdj-content{
	 margin-top: 40upx;
	 background: #FFFFFF;
	 -webkit-box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
	 box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
	 -webkit-border-radius: 20upx;
	 border-radius: 20upx;
	 
 }
 .jrzdj-content-item{
	 padding: 30upx 40upx;
	 display: flex;
	 align-items: center;
	 justify-content:space-between;
 }
 .jrzdj-content-item-name{
	 font-size: 28upx;
	 font-weight: 500;
	 color: #222222;
 }
 .jrzdj-content-item-mark{
	 margin-top: 20upx;
 	 font-size: 28upx;
 	 font-weight: 500;
 	 color: #A5A5A5;
 }
 .jrzdj-content-item-price{
	 font-size: 28upx;
	 font-weight: 550;
	 color: #31b977;
 }
 .hsyq{
	 margin-top: 30upx;
	 padding: 50upx 30upx;
	 background-color: #FFFFFF;
 }
 .hsyq-title{
 	 font-size: 28upx;
 	 font-weight: 500;
 	 color: #222222;
 }
 .hsyq-content{
	 margin-top: 30upx;
	 display: flex;
	 align-items: center;
	 justify-content:space-between;
 }
 .hsyq-content-item{
	 flex:1;
	 text-align: center;
 }
 .hsyq-content-item image{
	 width: 130upx;
	 height: 130upx;
 }
 .hsyq-content-item-remark{
	 font-size: 28upx;
	 font-weight: 500;
	 color: #5c5c5c;
 }
 .ygzl{
	 margin-top: 30upx;
	 padding: 50upx 30upx;
	 background-color: #FFFFFF;
	 
 }
 .ygzl-content{
	 margin-top: 30upx;
	 display: flex;
	 align-items: center;
	 justify-content:space-between;
 }
 .ygzl-content-item{
	 height: 96upx;
	 width: 30%;
	 background: #f6f6f6;
	 line-height: 96upx;
	 font-size: 28upx;
	 font-weight: 550;
	 color: #31b977;
	 text-align: center;
 }
 .ygzl-mark{
	 margin-top: 30upx;
	 display: flex;
	 color: #222222;
	 font-size: 28upx;
	 height: 80upx;
	 line-height: 80upx;
	 justify-content: space-between;
 }
 .ygzl-mark-btn{
	 border-radius: 10upx;
	 background:#31b977 ;
	 color: #FFFFFF;
	 padding-left: 10upx;
	 width: 180upx;
 }
 .ygzl-file{
	 margin-top: 30upx;
 }
 .explain{
	 padding: 40upx 30upx;
	 background-color: #FFFFFF;
 }
 .explain-title{
	 text-align: center;
	 color: #31b977;
	 font-size: 38upx;
 }
 .explain-content{
	 margin-top: 10upx;
	 color: #B4B4B4;
	 font-size: 30upx;
 }

.subscribe{
	background-color: #FFFFFF;
	margin-top: 30upx;
	&-view {
	  height: 100upx;
	  line-height: 100upx;
	  padding-left: 30rpx;
	  padding-right: 30rpx;
	  display: flex;
	  justify-content: space-between;
	  position: relative;
	  &::after {
	    @include hairline();
	    border-bottom-width: 1px;
	    border-bottom-color: #d8d8d8;
	    top: 0upx;
	    left: 30rpx;
	  }
	  &-left {
	    line-height: 100rpx;
	    font-size: 28upx;
	    font-weight: 400;
	    color: #BABABA;
	
	    &.isrequired {
	      position: relative;
	      padding-right: 16rpx;
	
	      &::before {
	        content: "*";
	        display: inline-block;
	        line-height: 100rpx;
	        position: absolute;
	        right: 0px;
	        color: #d0021b;
	      }
	    }
	  }
	
	  &-right {
	    line-height: 100rpx;
	    position: relative;
	    padding-right: 20rpx;
	    font-size: 28upx;
	
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
	        right: 0rpx;
	        border-width: 2px 2px 0 0;
	        border-color: #b0b0b0;
	        border-style: solid;
	        transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	      }
	    }
	  }
	}
} 

.submit{
	margin-top: 30upx;
	padding: 20upx 30upx 30upx;
	background-color: #FFFFFF;
}
.submit-explain{
	font-size: 28upx;
	color: #222222;
}
.submit-btn{
	margin-top: 20upx;
	display: flex;
	align-items: center;
	justify-content:space-between;
}

.order-goods{
	position:fixed;
	bottom:60upx;
	left:30upx;
	width:100upx;
	height:100upx;
	z-index: 99;
}
.order-goods image{
	width: 100%;
	height: 100%;
}

.order-goods-number{
	border-radius: 50%;
	width: 42upx;
	height: 42upx;
	line-height: 42upx;
	 background: #E64043;
	 color: #FFFFFF;
	 position:fixed;
	 bottom:115upx;
	 left:100upx;
	 text-align: center;
}
.order-modal{
	display: flex;
}
.order-modal-item{
	flex:1;
	font-size: 28upx;
	padding: 10upx 6upx;
	text-align: center;
}

 
</style>
