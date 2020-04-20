import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import {
	df
} from './common/request/request-downFiles.js';

import rup from '@/common/request/request-upFiles.js';

df.baseuUrl = 'http://127.0.0.1:8081/'
df.defaultReq.type = "POST";


let timeout = function() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 3000)
	})
}

df.defaultReq.beforeSend = res => {
	// await timeout();
	// delete res.data
	return res;
}
df.defaultReq.beforeFinish = (res, status) => {
	if (!res.data.success) { //退出登录
		uni.reLaunch({
			url: 'login?userOut=true'
		});
	}
	return null
}

df.defaultReq.errorHandler = (err, reject) => {
	console.log(err)
	reject(err);
}


df.defaultReq.baseData = { //设置公共参数，默认为空，设置此参数后每次发送请求都会带上此参数
	// token: ''
}
//上传测试工程
rup.defaultUp.url = 'https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'
rup.defaultUp.baseData = { //设置公共参数，默认为空，设置此参数后每次发送请求都会带上此参数
	token: '000-000-000-000-defaultUp'
}

//聊天测试
// import './common/chat/useSocket.js';
import store from "./common/chat/store.js";
Vue.prototype.$store = store;
//聊天测试结束

//自定义事件引入
import event from './common/uni-app-customEvent/custom-event.js'
const Event = new event();
Vue.prototype.$event = Event;

Vue.prototype.$req = df;
Vue.prototype.$rup = rup;
Vue.config.productionTip = false;

// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.checkLogin = function(backpage, backtype){
	var UID  = uni.getStorageSync('UID');
	var TOKEN = uni.getStorageSync('Token');
	if(UID == '' || TOKEN == ''){
		uni.redirectTo({url:'./pages/login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [UID,TOKEN];
}




App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
