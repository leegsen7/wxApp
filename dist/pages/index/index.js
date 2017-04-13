var app = getApp()

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		htmlStr:'<div style="color:red">abcd</div>'
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function () {

	}
})



