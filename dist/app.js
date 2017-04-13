import request from "./utils/promise"

//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据1
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        // 哈哈
        request({
            url:'http://leegsen7.cn:8080/api/infinity'
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    },
})
