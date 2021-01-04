import Vue from 'vue'
/**
 * 全局弹框
 * */
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(typeof(title)=="number"){
		title=title+"";
	}
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
/**
 * 全局成功弹框  
 * */
const msgSuccess = (title,duration=1500,mask=false,icon='success')=>{
	//统一提示方便全局修改
	if(typeof(title)=="number"){
		title=title+"";
	}
	if(Boolean(title) === false){
		return;
	}

	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$api = {msg,msgSuccess};