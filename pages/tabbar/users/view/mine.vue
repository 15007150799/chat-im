<template>
	<view>
		<uni-list>
			<uni-list-item :show-arrow="false">
				<!-- <text class="pg_list_cell_left">头像</text> -->
				<view class="headImage">
					<avatar
						selWidth="200px"
						selHeight="200px"
						@upload="updateAvatar"
						:avatarSrc="userInfo.avatar"
						avatarStyle="width: 50px;height: 50px;border-radius: 5px;"
					></avatar>
				</view>
			</uni-list-item>
			<uni-list-item title="" :show-arrow="true">
				<text class="pg_list_cell_left">ID:{{ userInfo.id }}</text>
			</uni-list-item>
			<uni-list-item title="" :show-arrow="true">
				<text class="pg_list_cell_left">昵称:{{ userInfo.nickname }}</text>
			</uni-list-item>
			<!-- <uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left">用户名:{{userInfo.username}}</text></uni-list-item> -->
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="addfriend">添加好友</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="addGroup">加入群组</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="createGroup">创建群组</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="systemSettings">系统设置</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="userOut">退出登录</text></uni-list-item>
			<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="jumpToMyQrcodeCard">
			 	  <view class="uni-list-cell-navigate uni-navigate-right">
			 		  <text class="pg_list_cell_left">二维码名片</text>
					  <view class="pg_list_cell_right">
						  <image class="qrcode" src="/static/pg_def_qrcode.png"></image>
					  </view>
			 	  </view>
			  </view> -->
		</uni-list>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';

export default {
	components: {
		uniList,
		uniListItem,
		avatar
	},
	data() {
		return {
			userInfo: {
				id: 0,
				username: '',
				nickname: '',
				avatar: ''
			},
			reload: false
		};
	},
	onLoad() {
		this.userInfo.id = uni.getStorageSync('UID');
		this.userInfo.username = uni.getStorageSync('mobile');
		this.userInfo.nickname = uni.getStorageSync('nickname');
		this.userInfo.avatar = uni.getStorageSync('avatar');
	},
	onShow() {},
	methods: {
		updateAvatar(res) {
			// 头像
			let self = this;
			this.userInfo.avatar = res.path;
			uni.uploadFile({
				url: uni.getStorageSync('URL') + '/attach/upload',
				filePath: res.path,
				name: 'file',
				count: 1,
				sizeType: ['compressed'],
				success: r => {
					let ret = JSON.parse(r.data);
					if (ret.code == 0) {
						self.updateUser(ret.data);
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		jumpToMyQrcodeCard() {
			UserJumpHelper.jumpToMyQrcodeCard();
		},
		addfriend() {
			uni.navigateTo({
				url: './addfriend/addfriend'
			});
		},
		createGroup() {
			// 创建群组
			uni.navigateTo({
				url: '../../group/CreateGroup/CreateGroup'
			});
		},
		addGroup() {
			uni.navigateTo({
				url: '../../group/AddGroup/AddGroup'
			});
		},
		userOut() {
			let msg = {
				userid: uni.getStorageSync('UID'),
				cmd: 1
			};
			this.$store.commit('webSocketSend', msg);
			uni.removeStorageSync('UID');
			// 账号退出
			uni.reLaunch({
				url: '../../../login/login'
			});
		},
		updateUser(url) {
			this.$http
				.post('/user/updateUser', { userid: uni.getStorageSync('UID'), avatar: url })
				.then(res => {
					if (res.code == 0) {
						if (url.substring(0, 4) == 'http') {
							uni.setStorageSync('avatar', url);
						} else {
							uni.setStorageSync('avatar', uni.getStorageSync('URL') + url);
						}
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					}
				})
				.catch(err => {});
		},
		systemSettings() {
			// 系统设置
			let that = this;
			uni.navigateTo({
				url: '../../../setting/setting'
			});
		}
	}
};
</script>

<style>
.avatar {
	width: 130upx;
	height: 130upx;
	border-radius: 10upx;
}
.qrcode {
	width: 50upx;
	height: 50upx;
}

.headImage {
	width: 100rpx;
	height: 100rpx;
	border: 1px solid #e8e8f8;
	background-color: #f8f8f8;
	border-radius: 50%;
	/*border-radius: 100%;*/
}
uni-image > img {
	width: 100rpx;
	height: 100rpx;
	border: 1px solid red;
	background-color: #f8f8f8;
	border-radius: 50%;
}
.pg_list_cell_left {
	font-size: 30rpx;
}
</style>
