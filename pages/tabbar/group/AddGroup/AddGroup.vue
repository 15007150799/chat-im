<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">群ID:</text>
				<m-input type="number" focus clearable v-model="dstid" placeholder="请输入群ID"></m-input>
			</view>
		</view>
		<view class="btn-row"><button type="primary" @tap="addcommunity">添加</button></view>
	</view>
</template>

<script>
import mInput from '@/components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			userid: 0,
			dstid: ''
		};
	},
	onLoad(option) {
		this.userid = uni.getStorageSync('UID');
	},
	methods: {
		addcommunity() {
			if (!this.dstid) {
				return;
			}
			// 加入群聊
			this.$http
				.post('/contact/joincommunity', {
					dstid: this.dstid, // 群ID
					userid: this.userid
				})
				.then(res => {
					if (res.code == 0) {
						// 添加监听器，通知群组页面
						uni.$emit('updateGroupList', { data: '' });
						uni.showToast({
							title: '加入成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style>
page {
	min-height: 100%;
	display: flex;
	font-size: 16px;
}
/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	/* min-height: 100%; */
	display: flex;
	flex: 1;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 10px;
}

.input-group {
	background-color: #ffffff;
	margin-top: 20px;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 18px;
	line-height: 40px;
}

.input-row .title {
	width: 72px;
	padding-left: 15px;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 8px;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 25px;
	padding: 10px;
}

button.primary {
	background-color: #0faeff;
}

.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.action-row navigator {
	color: #007aff;
	padding: 0 10px;
}
</style>
